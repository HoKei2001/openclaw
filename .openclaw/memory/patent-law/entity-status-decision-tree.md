---
topic: entity-status-decision-tree
source: flows/Entity Type Decision Tree.pdf
date: 2026-03-23
type: reference
---

# USPTO Entity Status Decision Tree

> Based on 37 CFR 1.16(d), 1.27, 1.29 and related USC sections

## Fee Tiers

| Status          | Fee  | Discount |
| --------------- | ---- | -------- |
| 🔴 Large Entity | $325 | None     |
| 🟡 Small Entity | $130 | 60% off  |
| 🟢 Micro Entity | $65  | 80% off  |

---

## Decision Logic

### Step 1 — Applicant Type (37 CFR 1.27(a))

- **Individual** → go to Step 2
- **Business** → check employee count
- **Nonprofit** → check 501(c)(3) status

### Step 2 — Business: Employee Count

- ≥500 employees → **Large Entity $325**
- <500 employees (13 CFR 121.801-805) → check rights transfer

### Step 3 — Rights Transferred to Others?

- Rights to non-small entity? → **Large Entity**
- Security interest to large entity?
  - Defaulted? → **Large Entity**
  - Not defaulted → **Small Entity** (security interest alone doesn't disqualify)
- No transfer → **Small Entity** ✅

### Step 4 — US Government Involvement?

- Is non-small entity the US Government?
  - Gov license exception (E.O. 10096 / Bayh-Dole / 28 USC 1498)?
    - Filed at no gov expense? → **Small Entity (gov exception)** ⚠️ No Micro
    - Otherwise → **Large Entity**

### Step 5 — Seek Micro Entity? (37 CFR 1.29)

**Path A — Income Basis:**

1. Small entity without gov exception? (37 CFR 1.29(a)(1)) → Yes
2. ≤4 prior nonprovisional applications? (37 CFR 1.29(a)(2))
   - Excludes: provisionals, foreign apps, PCT unfiled, apps from prior employment
3. No inventor income >$251,190? (37 CFR 1.29(a)(3))
4. No owner income >$251,190? (37 CFR 1.29(a)(4))
   → **Micro Entity ✅ — Form PTO/SB/15A**

**Path B — Higher Education:**

1. Small entity without gov exception? (37 CFR 1.29(d)(1))
2. Employer is higher ed institution (20 USC 1001(a))? OR assigned to higher ed?
   → **Micro Entity ✅ — Form PTO/SB/15B**

---

## GoVeda / Qi He Status Check

| Criterion                  | GoVeda                            |
| -------------------------- | --------------------------------- |
| Entity type                | Individual / Small Business       |
| Employee count             | <500 ✅                           |
| Rights to non-small entity | No ✅                             |
| Prior nonprovisional apps  | ≤4 ✅ (verify before each filing) |
| Inventor income >$251,190  | No ✅                             |
| Owner income >$251,190     | No ✅                             |
| **Result**                 | **🟢 Micro Entity — $65**         |

---

## Key Rules

- **Income limit:** $251,190 (3× US median household income, updated annually)
- **4-app exclusions:** provisionals, foreign apps, PCT where national fee unpaid, apps assigned due to prior employment
- **Re-determination required before:** continuation/divisional/CIP, reissue, issue fee, maintenance fees
- **Micro Entity forms:** PTO/SB/15A (income basis) or PTO/SB/15B (higher ed) — must file _before_ paying fees
- **Security interest** to large entity does NOT disqualify until default
