---
name: provisional-patent
description: >
  GoVeda Provisional Patent Application (PPA) filing pipeline. Use this skill
  when any agent needs to handle invention disclosures, prior art research,
  PPA drafting, USPTO filing prep, or portfolio monitoring. This skill defines
  the full workflow, stage responsibilities, file conventions, and guardrails
  for all three specialist agents (Research / Drafting / Filing).
---

# GoVeda Provisional Patent Filing Skill

## Pipeline Overview

```
Qi He submits Invention Disclosure
        ↓
[STAGE 1] Prior Art Research     — Agent 4
        ↓  ⚠️ Qi He approves direction
[STAGE 2] PPA Drafting           — Agent 5
        ↓  ⚠️ Qi He approves draft
[STAGE 3] USPTO Filing           — Agent 6
        ↓  ⚠️ Qi He confirms fee
[STAGE 4] Portfolio Monitoring   — Orchestrator
```

---

## Stage 1 — Prior Art Research (Agent 4)

### Goal

Identify the invention's novelty boundaries and define the claim scope.

### Steps

1. Read `memory/inventions/{slug}/disclosure.md`
2. Search GoVeda OpenPatent first (primary source, no extra cost)
3. Cross-validate with USPTO Full-Text Database, Espacenet, Google Scholar
4. Query KG Server for competitor patent graph
5. Write structured report to `memory/inventions/{slug}/prior-art-report.md`
6. Mark Todo Server task `research-{slug}` as done with one-line summary

### Prior Art Report Structure

```markdown
# Prior Art Report: {invention title}

## Novelty Assessment

[What makes this invention new]

## Closest Prior Art

| Patent/Publication | Similarity | Gap |
| ------------------ | ---------- | --- |

## Recommended Claim Scope

[Broad claim direction based on gaps found]

## Risk Areas

[Claims likely to face rejection]
```

### Handoff

Post to Todo Server → Orchestrator notifies Qi He → wait for approval before Stage 2.

---

## Stage 2 — PPA Drafting (Agent 5)

### Goal

Produce a complete, USPTO-ready Provisional Patent Application text.

### Steps

1. Read approved `prior-art-report.md`
2. Use template at `memory/templates/ppa-structure.md`
3. Draft all 9 sections (Title, Field, Background, Summary, Drawings, Detailed Description, Claims, Abstract)
4. Save as `memory/inventions/{slug}/ppa-draft-v1.md`
5. Upload to Google Drive: `Patents/{slug}/ppa-draft-v1.md`
6. Mark Todo Server task `drafting-{slug}` as done

### Revision Rules

- Max 3 rounds of revision with Qi He
- Each revision saved as `ppa-draft-v2.md`, `ppa-draft-v3.md`
- If unresolved after 3 rounds → escalate to Qi He directly

### PPA Section Checklist

- [ ] Title ≤500 characters
- [ ] Background cites at least 2 prior art references from report
- [ ] Detailed description enables PHOSITA to practice the invention
- [ ] At least 1 independent claim (informal OK for PPA)
- [ ] Abstract ≤150 words
- [ ] All figures referenced in description

### Handoff

Final approved draft → `ppa-final.pdf` → Todo Server task `filing-{slug}` created.

---

## Stage 3 — USPTO Filing (Agent 6)

### Goal

Submit the PPA to USPTO Patent Center and obtain Application Number + Receipt.

### Steps

1. Generate ADS (Application Data Sheet, Form PTO/AIA/14):
   - Inventor legal name(s), address, citizenship
   - Entity status: **Micro Entity** (fee: $80)
   - Title of invention
2. Confirm with Qi He: entity status + fee amount before any submission
3. Use browser tool to operate USPTO Patent Center:
   - Upload `ppa-final.pdf`
   - Upload ADS
   - Pay filing fee ($80 Micro Entity)
4. Download and save Filing Receipt to `memory/inventions/{slug}/filing/receipt.pdf`
5. Record Application Number in `memory/inventions/{slug}/filing/application-number.txt`
6. Update `memory/inventions/patent-filings/portfolio.json`
7. Set 11-month reminder in Todo Server

### Entity Status Verification

GoVeda qualifies as **Micro Entity** if:

- Fewer than 5 previously filed US patent applications
- Gross income ≤ 3× US median household income
- Not obligated to assign to entity that doesn't qualify

### USPTO Forms Reference

- ADS: `memory/patent-law/sb0015a.pdf` (individual inventors)
- ADS (continuation): `memory/patent-law/sb0015b.pdf`
- Transmittal form: `memory/patent-law/sb0016.pdf`

### Guardrails

- **Never submit without explicit fee confirmation from Qi He**
- Screenshot every USPTO confirmation screen
- If USPTO Patent Center session expires, restart — do not retry partial submissions

### Handoff

Application Number + Receipt → portfolio.json updated → Stage 4 monitoring begins.

---

## Stage 4 — Portfolio Monitoring (Orchestrator)

### Key Dates per Application

| Timeline          | Action                                         |
| ----------------- | ---------------------------------------------- |
| Filing date       | Record in portfolio.json                       |
| +11 months        | Remind Qi He: decide on Non-Provisional        |
| +12 months        | PPA expires — Non-Provisional must be filed    |
| Any Office Action | Notify Qi He immediately for response strategy |

### portfolio.json Format

```json
[
  {
    "slug": "invention-slug",
    "title": "Full Invention Title",
    "applicationNumber": "63/XXX,XXX",
    "filingDate": "2026-03-18",
    "deadlineNonProvisional": "2027-03-18",
    "status": "pending",
    "reminderSent11Month": false,
    "driveFolder": "Patents/invention-slug/"
  }
]
```

---

## File Conventions

```
memory/inventions/{slug}/
├── disclosure.md              ← from Qi He
├── prior-art-report.md        ← Stage 1 output
├── ppa-draft-v1.md            ← Stage 2 output
├── ppa-draft-v2.md            ← revision (if needed)
├── ppa-final.pdf              ← approved
└── filing/
    ├── ads.pdf
    ├── receipt.pdf
    └── application-number.txt

memory/inventions/patent-filings/
└── portfolio.json             ← all applications
```

---

## Knowledge Base

Domain knowledge for all stages is indexed in `memory/patent-law/`:

- `youtube-knowledge/` — 300 expert video summaries on PPA filing
- `ppa-requirements.md` — USPTO statutory requirements + fees
- `sb0015a.pdf`, `sb0015b.pdf` — ADS forms
- `sb0016.pdf` — Transmittal form

Search with: `openclaw memory search "<query>"`

---

## Critical Rules

1. GoVeda = Micro Entity → $80 filing fee (verify before each filing)
2. PPA priority date is the filing date — do not delay after Qi He approves
3. Never amend a PPA after filing — file a new one if needed
4. Disclose all variations in the PPA — scope limits future Non-Provisional
5. Never submit to USPTO without explicit Qi He confirmation
6. All files must be backed to Google Drive `Patents/{slug}/`
