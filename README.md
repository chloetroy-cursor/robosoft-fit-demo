# Robosoft Field Engineering fit demo

Demo package for **Chloe Troy** — a Prospect Scout → Cloud Agent → Design Mode loop against a fake mid-market spend product, **Northstar Ledger**.

The live GitHub target for customers is intended to be **[chloetroy-cursor/robosoft-fit-demo](https://github.com/chloetroy-cursor/robosoft-fit-demo)** once this project is published or mirrored there.

## What is in this repo

| Path | What it is |
| --- | --- |
| [`prospect-site/index.html`](prospect-site/index.html) | Static marketing page. No build. Intentional gaps for the scout. |
| [`prototype/`](prototype/) | Vite + React + TypeScript onboarding redesign: welcome → connect tools → first dashboard. |
| [Figma file](https://www.figma.com/design/IAQuUlgWS7qdViPMqbAzsD) | **Northstar Ledger — Brand + Onboarding** (Cover, Tokens, Components, Flows). |
| [`figma/`](figma/) | Token JSON, star SVG, and a spec that mirrors that file. |

## Demo flow

1. **Slack URL** — Drop the Northstar Ledger marketing URL in Slack (GitHub Pages, a Cursor preview, or a local static host).
2. **Grok Bot scout** — Prospect Scout reads the page and should surface the planted issues: buried/weak CTA, vague pricing, thin social proof, no clear first-run.
3. **Human `fit: yes`** — A person confirms the account is worth a prototype. That gate is the point; the bot does not ship work on its own.
4. **Cursor Cloud Agent prototypes** — Agent builds or iterates `prototype/` from the scout notes (this repo is that output).
5. **Design Mode** — Restyle the onboarding shell in the IDE against the running Vite app.
6. **Figma source of truth** — Open [Northstar Ledger — Brand + Onboarding](https://www.figma.com/design/IAQuUlgWS7qdViPMqbAzsD). Design Mode can pull those components; push accepted tweaks back, then drop exported tokens into [`prototype/src/design-tokens.css`](prototype/src/design-tokens.css). Components already read CSS custom properties only. See [`figma/NORTHSTAR_FIGMA_SPEC.md`](figma/NORTHSTAR_FIGMA_SPEC.md).

## Prospect site — planted pain

The marketing page is meant to look finished and still fail a buying conversation:

- Hero CTA is “Explore the platform” / “keep reading”. The only ask is a footer line: “If you want to talk, write us.”
- Pricing is a paragraph with no numbers, seats, or tiers.
- Social proof is one unnamed quote and an explicit refusal of a logo wall.

Open it as static HTML. No install.

```bash
# from repo root — any static server, or just open the file
python3 -m http.server 43170 --directory prospect-site
```

Then open `http://127.0.0.1:43170`.

Or double-click `prospect-site/index.html`.

### GitHub Pages (after the repo is public)

On **chloetroy-cursor/robosoft-fit-demo**:

1. **Settings → Pages**
2. Source: **GitHub Actions**
3. The workflow in [`.github/workflows/pages.yml`](.github/workflows/pages.yml) publishes `prospect-site/`.

Expected URL shape:

`https://chloetroy-cursor.github.io/robosoft-fit-demo/`

Until that repo exists, use the local static server or a Cursor Cloud Agent preview.

## Prototype — run it

```bash
cd prototype
npm install
npm run dev
```

Dev server binds to **http://127.0.0.1:43180**.

Flow:

1. **Welcome** — name, company, role. Empty name/company is blocked.
2. **Connect tools** — Slack, NetSuite, cards, bank, receipt inbox. Connections are mocked.
3. **First dashboard** — KPIs and a short ledger if anything is connected; empty state if not.

Visual values live in `prototype/src/design-tokens.css`. Swap that file when Figma tokens are ready. Do not scatter hex values through components.

```bash
cd prototype
npm run build   # tsc + vite build
```

## How Chloe should open this

| Goal | What to open |
| --- | --- |
| Scout the “before” site | Pages URL above, or `prospect-site/index.html` |
| Walk the “after” onboarding | `npm run dev` in `prototype/` → port 43180 |
| Brand kit + onboarding frames | [Figma — Brand + Onboarding](https://www.figma.com/design/IAQuUlgWS7qdViPMqbAzsD) |
| This Cloud Agent run | [cursor.com/agents/bc-135810ed-e8f3-5c2b-8eee-28a05fbc7160](https://cursor.com/agents/bc-135810ed-e8f3-5c2b-8eee-28a05fbc7160) |
| Customer-facing GitHub | [github.com/chloetroy-cursor/robosoft-fit-demo](https://github.com/chloetroy-cursor/robosoft-fit-demo) once published |

This workspace is a new project. Create the GitHub repo from the **Create repo** control, then mirror or push to `chloetroy-cursor/robosoft-fit-demo` when that remote is ready.

## Out of scope on purpose

No auth, no database, no real card or ERP connections. The prospect site has no bundler. The prototype is the smallest path that Design Mode and a token swap can act on.
