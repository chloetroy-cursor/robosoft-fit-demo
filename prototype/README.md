# Northstar Ledger onboarding prototype

Thin Vite + React + TypeScript first-run for Design Mode:

**Welcome → Connect tools → First dashboard**

Matches the Figma brand kit (cream/gold, Newsreader + IBM Plex):
[Northstar Ledger — Brand + Onboarding](https://www.figma.com/design/IAQuUlgWS7qdViPMqbAzsD)

```bash
npm install
npm run dev
```

Opens at http://127.0.0.1:43180.

## Screens

1. **Welcome** — workspace owner (name, company, role). Empty name/company is blocked.
2. **Connect tools** — Slack, NetSuite, corporate cards, bank feed, receipt inbox. Connections are mocked. Cards and bank start connected so the dashboard has a feed.
3. **First dashboard** — month-to-date spend, the marketing “this week” spend card, and the exception queue (missing receipts / over-policy / duplicates).

Tokens: [`src/design-tokens.css`](src/design-tokens.css) — CSS custom properties only, mapped from [`../figma/tokens.json`](../figma/tokens.json). Kit primitives in [`src/kit.tsx`](src/kit.tsx) match Figma component names (`Logo lockup`, `Button`, `Input`, `Badge`, `Spend row`, `Card / Spend summary`).

No auth, no database, no real integrations.
