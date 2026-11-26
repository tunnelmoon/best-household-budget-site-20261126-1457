# Hearth and Ledger: Household Budget Site

[![make.fun](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/tunnelmoon/best-household-budget-site-20261126-1457/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/tunnelmoon/best-household-budget-site-20261126-1457/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)

A household budget site for the fictional Rivera family (Maya and Jordan), built for the make.fun bounty "Make the best household budget site". It runs entirely offline from static files: no libraries, no network requests, no build step.

## What it does

Six sections, reached from the top nav, all working with figures that reconcile:

- **Dashboard**: left to spend $1,227.77 (income $6,450, out $5,222.23, $900 set aside for savings), an SVG donut of spending by category, over-budget alerts, bills still to pay, a goals snapshot and the latest transactions.
- **Budget**: 14 categories with planned vs spent, editable budget inputs, a save button, over-budget rows highlighted and a totals row.
- **Transactions**: 40 November transactions that sum to exactly $5,222.23, filterable by category, with an add form and delete buttons.
- **Goals**: emergency fund $8,400 of $12,000 (70%), new roof $3,200 of $9,500, summer road trip $1,150 of $2,400, with Add $50 and Add $100 buttons and an add-goal form.
- **Bills**: 7 bills with due dates and mark-paid toggles. Every bill matches a real transaction, so paying one never double counts.
- **Insights**: November vs October comparison bars for the top 8 categories (October actuals sum to $5,312), a six month spending trend and five tips backed by the figures.

Edits persist in localStorage. A footer button resets everything to the sample month.

## Design

Pine and honey ledger identity: deep pine ink, honey accents, cream paper, serif display type, hand-drawn SVG charts. Left nav on desktop, a scrolling strip on phones, focus-visible states throughout, reduced motion respected.

## Files

- `app/index.html` - page shell, header, nav and footer
- `app/style.css` - the pine and honey ledger styling, responsive to phones
- `app/data.js` - figures, budgets, transactions, bills, goals and persistence
- `app/format.js` - money and date formatting
- `app/charts.js` - SVG donut, comparison bars, trend bars, progress bars
- `app/views.js` - one render function per section
- `app/main.js` - hash router and all control behaviour
- `main.ts` - copies `app/` and `screenshots/` to the output dir and writes `dossier.json`
- `vendor/makefun-frontend.ts` - the kit's dossier library, unchanged

## Run it

Serve `app/` with any static server, for example `python3 -m http.server` inside `app/`, then open `http://localhost:8000`. To build the entry output: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.

## License

MIT. See LICENSE.
