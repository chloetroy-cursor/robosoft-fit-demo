# Northstar Ledger — Figma brand kit

**File:** [Northstar Ledger — Brand + Onboarding](https://www.figma.com/design/IAQuUlgWS7qdViPMqbAzsD)

Client product kit for the Robosoft Field Engineering demo. Cream + gold + serif. Not Robosoft corporate. Not Cursor orange.

Live look to match: [prospect-site](https://chloetroy-cursor.github.io/robosoft-fit-demo/prospect-site/)

## Pages

| Page | What’s on it |
| --- | --- |
| **Cover** | Title, product pitch, “Demo brand kit for Robosoft FE” |
| **Tokens** | Color swatches, type ramp, space scale, radii — sampled from the live site |
| **Components** | Publishable components (list below) |
| **Flows** | Welcome → Connect tools → First dashboard |

## Components

| Name | Role |
| --- | --- |
| `Star mark` | Gold star from the marketing SVG path |
| `Star mark / Logo lockup` | Star + “Northstar Ledger” |
| `Button / Primary` | Navy pill. Default: Continue |
| `Button / Secondary` | Hairline pill. Default: Back |
| `Input / Text` | Label + field. Default: Your name / Jordan Hale |
| `Badge / Status` | Pill. Default: 12 waiting |
| `Spend row` | Label + amount. Default: Field travel · Midwest / $18,440 |
| `Nav / Top` | Lockup + Platform / Month-end / Customers / Pricing / Company notes |
| `Card / Spend summary` | THIS WEEK / Operating spend + rows + uncoded badge |

All use Auto Layout. Colors, radii, and gaps bind to `Northstar / Primitives` and `Northstar / Semantic` variables. Text uses local text styles (`Display / *`, `Body / *`, `UI / *`). Card shadow is `Shadow / Card`.

## Onboarding copy (Flows)

### 1 Welcome

- Steps: **1 Welcome** · 2 Connect tools · 3 First dashboard
- Eyebrow: Onboarding redesign · 3 minutes
- H1: Set up a workspace your close team will actually open.
- Lede: This path replaces the marketing site’s buried write-us loop with a first-run that names an owner, connects the systems ops already uses, and lands on a real spend view.
- Fields: Your name → Jordan Hale; Company → Harborline Goods; Role → Head of Operations
- CTA: Continue

### 2 Connect tools

- H1: Connect the tools Harborline Goods already lives in.
- Lede: Nothing syncs for real in this demo. Cards and bank are on so the first dashboard has a feed.
- Slack — Approval nudges and exception threads — Not connected
- NetSuite — Entities, vendors, and GL coding — Not connected
- Corporate cards — Live card feed and merchant data — Connected
- Bank feed — ACH, wires, and vendor payouts — Connected
- Receipt inbox — Forwarded receipts and invoice mail — Not connected
- CTAs: Back · Open dashboard

### 3 First dashboard

- Owner: Jordan Hale · Head of Operations · Harborline Goods
- H1: Here is what close looks like when spend is in one place.
- KPIs: Month-to-date spend $214,680 · Waiting on approval 9 · Sources connected 2
- Hero: `Card / Spend summary` — THIS WEEK / Operating spend (same numbers as the live site card)
- Exception queue (marketing story, also in the Vite prototype): Missing receipt · AMEX *4412 / 4 days; Over-policy lodging · Denver / Needs VP; Vendor duplicate · Northwind / Review
- CTAs: Adjust connections · Restart setup

Fake mid-market spend only. No PHI, no real customers.

## Token source of truth

| Layer | Where |
| --- | --- |
| Figma variables + styles | This file |
| CSS for the Vite prototype | [`prototype/src/design-tokens.css`](../prototype/src/design-tokens.css) |
| JSON export / import | [`tokens.json`](./tokens.json) |
| Star SVG | [`assets/star-mark.svg`](./assets/star-mark.svg) |

Site `--ink-soft` is `#4a453c`. Prototype `--color-fg-muted` now matches that value.

## If MCP drops again

1. Reconnect Figma MCP in Cursor.
2. Re-run against file key `IAQuUlgWS7qdViPMqbAzsD`, or create a new file named **Northstar Ledger — Brand + Onboarding**.
3. Or paste from this spec + `tokens.json` into a blank Design file (~20 min): four pages, variables from the JSON, components named exactly as above, three 1280-wide flow frames.
