# Inventions Workspace

Each invention gets its own folder: `{slug}/`

## Folder Structure per Invention

```
{slug}/
├── disclosure.md          ← Invention Disclosure (from Qi He)
├── prior-art-report.md    ← Output from Agent 4
├── ppa-draft-v1.md        ← Output from Agent 5 (round 1)
├── ppa-draft-v2.md        ← Revision round 2 (if needed)
├── ppa-final.pdf          ← Approved final draft
└── filing/
    ├── ads.pdf            ← Application Data Sheet
    ├── receipt.pdf        ← USPTO Filing Receipt
    └── application-number.txt  ← e.g. 63/123,456
```

## Portfolio Tracker

`patent-filings/portfolio.json` tracks all filed applications:

```json
[
  {
    "slug": "invention-name",
    "title": "Full Title",
    "applicationNumber": "63/XXX,XXX",
    "filingDate": "2026-03-18",
    "deadlineNonProvisional": "2027-03-18",
    "status": "pending",
    "reminderSent11Month": false
  }
]
```
