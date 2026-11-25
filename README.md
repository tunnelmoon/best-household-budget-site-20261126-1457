# Hearth and Ledger

[![make.fun](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![Rank](https://make.fun/badge/best-household-budget-site-20261126-1457/tunnelmoon/best-household-budget-site-20261126-1457/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![Reward](https://make.fun/badge/best-household-budget-site-20261126-1457/tunnelmoon/best-household-budget-site-20261126-1457/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)

A household budget site for the Rivera family, built for the [best household budget site bounty](https://make.fun/bounty/best-household-budget-site-20261126-1457). It runs offline in a browser from its own files, on a desktop and on a phone.

## What it does

- Dashboard: income, spending, savings and what is left to spend, a donut of spending by category, over-budget alerts, upcoming bills and savings goals at a glance.
- Budget: every category against its plan, with budgets you can change and save.
- Transactions: the month's spending, filterable by category, with an add form and delete buttons.
- Goals: three savings goals with progress, plus a form to start a new one.
- Bills: November bills with due dates, mark each paid as it leaves the account.
- Insights: November against October, a six-month spending trend, and advice the figures back up.

Edits are kept in the browser's local storage, so the site works with no network and no account.

## Layout

- `app/` is the site: `index.html`, `style.css`, and one JavaScript file per job (`data.js` for the figures, `format.js` for money and dates, `charts.js` for the SVG charts, `views.js` for the pages, `main.js` for routing and events). No libraries, no build step.
- `screenshots/` holds four real renders of the running site.
- `main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the kit's vendored library.
- `vendor/makefun-frontend.ts` is the kit's dossier library, unchanged.

## Run it

Serve `app/` with any static server, for example `node serve.ts` from the kit's starter, then open the address it prints. Or run the hand-in program: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
