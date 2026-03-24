---
topic: patent-attorney-feedback
source: email from Ziyin Han (patent attorney) to Yilian/Qi He, 2026-03-13
date: 2026-03-13
type: expert-feedback
---

# Patent Attorney Feedback on GoVeda Filing Feature

From Ziyin Han (patent attorney) — feedback on GoVeda OpenPatent + provisional filing feature.

---

## Prior Art Search — Critical Issues

1. **Prior art is not limited to patents.** Must include journal articles, webpages, conference abstracts, books, magazines, YouTube videos. Current version only searches patent documents — this limits novelty assessment accuracy.

2. **UK/common law two-step novelty test:**
   - Step 1: Does prior art disclose the invention?
   - Step 2: Does that disclosure _enable_ a skilled person to make it? (Synthon BV v SmithKline Beecham [2005])
   - Disclosure in a sci-fi novel is NOT novelty-destroying if it doesn't enable a PHOSITA to replicate.

3. **Patentable vs non-patentable subject matter** — verify AI can distinguish. Reference: IPOS Examination Guidelines §8.3–8.8.

4. **Selection inventions** — narrow subset of prior art compounds can still be novel if unexpected advantage exists. Reference: IPOS Guidelines §4.83–4.92.

5. **Open vs closed claim language** — AI must distinguish:
   - "comprising A, B, C" = open-ended (includes but not limited to A, B, C)
   - "containing A, B, C" = closed-ended (exactly A, B, C only)

6. **Biological/chemical sequences** — current tools lack search for peptides, nucleic acids, chemical structures. High demand in biotech/pharma filings.

---

## Provisional Filing Feature — Key Concerns

### 1. Drafting Quality

- AI drafting needs internal QC mechanism
- Patent attorney turnaround: claims 1–2 weeks, full spec 3–4 weeks
- The time includes scrutinizing data + identifying essential vs non-essential features
- **For GoVeda PPA agent: build revision loop (max 3 rounds) + human review gate**

### 2. Right to the Invention

- Need mechanism to verify who is filing (Singpass for SG users)
- Patent troll risk — dummy patent filings
- Employee/employer disputes (employee files without employer's knowledge)
- **For GoVeda: add inventor declaration step, log filing activity**

### 3. Singapore Section 34 — Security Clearance (CRITICAL for SG users)

- Singapore Patents Act §34: SG residents cannot file abroad without written authority from Registrar
- Applies to foreigners resident in Singapore at time of invention
- "Cause to be filed" may apply to GoVeda as platform
- **Action: Add disclosure/warning in UI; ask nationality + residency; show security clearance warning before filing**
- Consult lawyer on GoVeda's liability as platform

---

## Additional Features Requested

- Patent monitoring: track competitor patent applications and status changes
- Freedom-to-Operate (FTO) search: compare product features against existing patents to assess infringement risk before launch

---

## Implications for PPA Agent

| Issue                 | Impact on Agent                                                    |
| --------------------- | ------------------------------------------------------------------ |
| Non-patent prior art  | Stage 1 Research must search beyond patent databases               |
| Two-step novelty test | Prior Art Report must address enablement, not just disclosure      |
| SG Section 34         | Filing Agent must check inventor residency before USPTO submission |
| Inventor verification | Disclosure step must capture inventor nationality + residency      |
| Claim language        | Drafting Agent must use open/closed language correctly             |
