// views.js: one render function per section. Each returns plain HTML for
// the router to drop into #view. All figures come from data.js.

import {
  HOUSEHOLD, CATEGORY_ORDER, OCTOBER_ACTUALS, MONTHLY_TREND,
  totalIncome, totalSpent, totalPlanned, leftToSpend,
  spentByCategory, overBudgetRows, unpaidBills, roundCents,
} from './data.js';
import { money, moneyWhole, signedMoney, percent, shortDate, longDate, escapeHtml } from './format.js';
import { donutChart, compareBars, trendBars, progressBar } from './charts.js';

function sectionHead(title, sub) {
  return `<div class="section-head"><h2>${title}</h2><p>${sub}</p></div>`;
}

export function renderDashboard(state) {
  const income = totalIncome();
  const spent = totalSpent(state);
  const left = leftToSpend(state);
  const saved = state.budgets.Savings;
  const over = overBudgetRows(state);
  const upcoming = unpaidBills(state);
  const latest = [...state.transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  const spentMap = spentByCategory(state);
  const donutRows = CATEGORY_ORDER.filter((c) => c !== 'Savings').map((c) => ({ category: c, spent: spentMap[c] }));
  const goals = state.goals;
  return `
  ${sectionHead('Good evening, Rivera household', 'November 2026 at a glance. Every figure below comes from your real transactions.')}
  <div class="stat-grid">
    <div class="stat hero"><span>Left to spend</span><strong>${money(left)}</strong><em>${money(HOUSEHOLD.income[0].amount)} from Maya, ${money(HOUSEHOLD.income[1].amount)} from Jordan</em></div>
    <div class="stat"><span>Spent so far</span><strong>${money(spent)}</strong><em>across ${state.transactions.length} transactions</em></div>
    <div class="stat"><span>Set aside for savings</span><strong>${money(saved)}</strong><em>${percent(saved / income)} of income</em></div>
    <div class="stat"><span>Planned for the month</span><strong>${money(totalPlanned(state))}</strong><em>${money(roundCents(totalPlanned(state) - spent))} of plan unspent</em></div>
  </div>
  <div class="two-col">
    <section class="card">
      <h3>Where November went</h3>
      ${donutChart(donutRows)}
      <p class="card-note">Savings of ${money(saved)} is set aside first and shown separately, not as spending.</p>
    </section>
    <section class="card">
      <h3>Watch out</h3>
      ${over.length ? over.map((row) => `
        <div class="alert"><b>${row.category} is ${money(row.over)} over budget</b><span>Spent ${money(row.spent)} of ${money(row.planned)} planned.</span><a href="#/budget">Open the budget</a></div>`).join('') : '<p class="card-note">Nothing over budget. Every category is inside its plan.</p>'}
      <h3 class="subhead">Bills still to pay</h3>
      ${upcoming.length ? `<ul class="plain-list">${upcoming.map((b) => `<li><span>${escapeHtml(b.name)}</span><b>${money(b.amount)}</b><span>due ${shortDate(b.due)}</span></li>`).join('')}</ul><a class="text-link" href="#/bills">See all bills</a>` : '<p class="card-note">Every November bill is paid.</p>'}
    </section>
  </div>
  <div class="two-col">
    <section class="card">
      <h3>Goals snapshot</h3>
      ${goals.map((g) => `
        <div class="goal-line"><div class="goal-line-head"><span>${escapeHtml(g.name)}</span><b>${money(g.saved)} of ${money(g.target)}</b></div>${progressBar(g.saved, g.target)}</div>`).join('')}
      <a class="text-link" href="#/goals">Open goals</a>
    </section>
    <section class="card">
      <h3>Latest transactions</h3>
      <ul class="plain-list">${latest.map((t) => `<li><span>${escapeHtml(t.name)}</span><span class="muted">${t.category} &middot; ${shortDate(t.date)}</span><b>${money(t.amount)}</b></li>`).join('')}</ul>
      <a class="text-link" href="#/transactions">See all ${state.transactions.length} transactions</a>
    </section>
  </div>`;
}

export function renderBudget(state) {
  const spentMap = spentByCategory(state);
  const rows = CATEGORY_ORDER.map((category) => ({
    category,
    planned: state.budgets[category],
    spent: spentMap[category],
    left: roundCents(state.budgets[category] - spentMap[category]),
  }));
  const planned = totalPlanned(state);
  const spent = totalSpent(state);
  return `
  ${sectionHead('Budget', 'Fourteen categories, planned against what actually left the account. Edit a plan and save it.')}
  <section class="card">
    <table class="budget-table">
      <thead><tr><th>Category</th><th>Planned</th><th>Spent</th><th>Left</th><th>Used</th></tr></thead>
      <tbody>
        ${rows.map((row) => {
          const pctUsed = row.planned ? Math.round((row.spent / row.planned) * 100) : 0;
          const over = row.left < 0 ? ' class="over"' : '';
          return `<tr${over}>
            <td>${row.category}${row.left < 0 ? ' <span class="over-tag">over by ' + money(Math.abs(row.left)) + '</span>' : ''}</td>
            <td><label class="visually-hidden" for="plan-${row.category}">Planned amount for ${row.category}</label><input id="plan-${row.category}" class="plan-input" type="number" min="0" step="0.01" value="${row.planned.toFixed(2)}" data-category="${escapeHtml(row.category)}"></td>
            <td>${money(row.spent)}</td>
            <td>${row.left < 0 ? '-' + money(Math.abs(row.left)) : money(row.left)}</td>
            <td><div class="mini-track"><div class="mini-fill${row.left < 0 ? ' over-fill' : ''}" style="width:${Math.min(100, pctUsed)}%"></div></div><span class="muted">${pctUsed}%</span></td>
          </tr>`;
        }).join('')}
      </tbody>
      <tfoot><tr><td>Total</td><td>${money(planned)}</td><td>${money(spent)}</td><td>${money(roundCents(planned - spent))}</td><td></td></tr></tfoot>
    </table>
    <div class="budget-actions">
      <button type="button" class="btn primary" id="save-budget">Save budget</button>
      <span class="save-note" id="save-note" role="status"></span>
    </div>
    <p class="card-note">Spent comes straight from your transactions, so editing a plan never breaks the totals. Income is ${money(totalIncome())}; after spending ${money(spent)} you have ${money(leftToSpend(state))} left.</p>
  </section>`;
}

export function renderTransactions(state, filter) {
  const categories = ['All', ...CATEGORY_ORDER];
  const shown = state.transactions
    .filter((t) => filter === 'All' || t.category === filter)
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  const shownTotal = roundCents(shown.reduce((sum, t) => sum + t.amount, 0));
  return `
  ${sectionHead('Transactions', `${state.transactions.length} November transactions, adding up to ${money(totalSpent(state))}.`)}
  <section class="card">
    <form id="add-form" class="add-form">
      <label>Date <input type="date" name="date" value="2026-11-30" required></label>
      <label>What was it? <input type="text" name="name" placeholder="Corner Grocery" maxlength="60" required></label>
      <label>Category <select name="category">${CATEGORY_ORDER.map((c) => `<option>${c}</option>`).join('')}</select></label>
      <label>Amount <input type="number" name="amount" min="0.01" step="0.01" placeholder="0.00" required></label>
      <button type="submit" class="btn primary">Add transaction</button>
    </form>
  </section>
  <section class="card">
    <div class="filter-row" role="group" aria-label="Filter by category">
      ${categories.map((c) => `<button type="button" class="chip${c === filter ? ' active' : ''}" data-filter="${escapeHtml(c)}">${c}</button>`).join('')}
    </div>
    <p class="card-note">Showing ${shown.length} transaction${shown.length === 1 ? '' : 's'} totaling <b>${money(shownTotal)}</b>.</p>
    <ul class="tx-list">
      ${shown.map((t) => `
        <li>
          <span class="tx-name">${escapeHtml(t.name)}</span>
          <span class="muted">${t.category} &middot; ${longDate(t.date)}</span>
          <b>${money(t.amount)}</b>
          <button type="button" class="btn danger small" data-delete="${t.id}">Delete</button>
        </li>`).join('') || '<li class="muted">No transactions in this category yet.</li>'}
    </ul>
  </section>`;
}

export function renderGoals(state) {
  return `
  ${sectionHead('Goals', 'Three things the Riveras are saving for, with the next step always one tap away.')}
  <div class="goal-grid">
    ${state.goals.map((g) => {
      const pct = Math.round((g.saved / g.target) * 100);
      const remaining = roundCents(g.target - g.saved);
      return `
      <section class="card goal-card">
        <h3>${escapeHtml(g.name)}</h3>
        <p class="goal-amount"><strong>${money(g.saved)}</strong> of ${money(g.target)}</p>
        ${progressBar(g.saved, g.target)}
        <p class="goal-meta">${pct}% there &middot; ${money(remaining)} to go</p>
        <p>${escapeHtml(g.note)}</p>
        <div class="goal-actions">
          <button type="button" class="btn" data-add-goal="${g.id}">Add $50</button>
          <button type="button" class="btn" data-add-goal-100="${g.id}">Add $100</button>
        </div>
      </section>`;
    }).join('')}
  </div>
  <section class="card">
    <h3>Start a new goal</h3>
    <form id="goal-form" class="add-form">
      <label>Goal name <input type="text" name="name" placeholder="New washing machine" maxlength="60" required></label>
      <label>Target amount <input type="number" name="target" min="1" step="0.01" placeholder="0.00" required></label>
      <label>Already saved <input type="number" name="saved" min="0" step="0.01" value="0" required></label>
      <button type="submit" class="btn primary">Add goal</button>
    </form>
    <p class="card-note">Total saved across all goals: <b>${money(roundCents(state.goals.reduce((s, g) => s + g.saved, 0)))}</b>. The emergency fund alone covers ${money(state.goals[0].saved)} of its ${money(state.goals[0].target)} target.</p>
  </section>`;
}

export function renderBills(state) {
  const sorted = [...state.bills].sort((a, b) => a.due.localeCompare(b.due));
  const paidTotal = roundCents(state.bills.filter((b) => b.paid).reduce((s, b) => s + b.amount, 0));
  const unpaidTotal = roundCents(state.bills.filter((b) => !b.paid).reduce((s, b) => s + b.amount, 0));
  return `
  ${sectionHead('Bills', 'Seven bills for November. Tick one off the moment you pay it.')}
  <section class="card">
    <p class="bill-summary">Paid: <b>${money(paidTotal)}</b> &middot; Still to pay: <b>${money(unpaidTotal)}</b> &middot; Total: <b>${money(roundCents(paidTotal + unpaidTotal))}</b></p>
    <ul class="bill-list">
      ${sorted.map((b) => `
        <li class="${b.paid ? 'paid' : 'unpaid'}">
          <label class="bill-check">
            <input type="checkbox" data-bill="${b.id}" ${b.paid ? 'checked' : ''}>
            <span class="bill-name">${escapeHtml(b.name)}</span>
          </label>
          <span class="muted">due ${longDate(b.due)}</span>
          <b>${money(b.amount)}</b>
          <span class="bill-status">${b.paid ? 'Paid' : 'Due'}</span>
        </li>`).join('')}
    </ul>
    <p class="card-note">Every bill here matches a transaction, so paying one never double counts. Rent, electric, water and the music stream are already paid.</p>
  </section>`;
}

export function renderInsights(state) {
  const spentMap = spentByCategory(state);
  const topEight = [...CATEGORY_ORDER]
    .sort((a, b) => spentMap[b] - spentMap[a])
    .slice(0, 8)
    .map((category) => ({ category, nov: spentMap[category], oct: OCTOBER_ACTUALS[category] }));
  const octTotal = roundCents(Object.values(OCTOBER_ACTUALS).reduce((s, n) => s + n, 0));
  const novTotal = totalSpent(state);
  const diff = roundCents(novTotal - octTotal);
  const tips = [
    {
      title: 'Groceries ran $58.90 over plan',
      body: `You spent ${money(spentMap.Groceries)} on groceries against a ${money(state.budgets.Groceries)} plan, and October was even higher at ${money(OCTOBER_ACTUALS.Groceries)}. One planned shop a week, with a list, is the cheapest fix on this page.`,
    },
    {
      title: 'Dining out is already improving',
      body: `Dining out fell from ${money(OCTOBER_ACTUALS['Dining Out'])} in October to ${money(spentMap['Dining Out'])} in November. Keep the two takeaway nights a week and the savings stay.`,
    },
    {
      title: 'Transport dropped by almost half',
      body: `Transport is ${money(spentMap.Transport)} against ${money(OCTOBER_ACTUALS.Transport)} in October. The metro pass and fewer rideshares did the work; keep the pass.`,
    },
    {
      title: 'Utilities need a small buffer',
      body: `Utilities are ${money(roundCents(spentMap.Utilities - state.budgets.Utilities))} over the ${money(state.budgets.Utilities)} plan. Raising the plan to ${money(230)} next month stops the red row without changing a habit.`,
    },
    {
      title: 'Subscriptions are small but steady',
      body: `Three subscriptions cost ${money(spentMap.Subscriptions)} a month. That is less than one takeaway dinner, so keep them, but check once a quarter that each one still gets used.`,
    },
  ];
  return `
  ${sectionHead('Insights', `November cost ${money(novTotal)} against October's ${money(octTotal)}: ${money(Math.abs(diff))} ${diff < 0 ? 'less' : 'more'}. Here is why.`)}
  <section class="card">
    <h3>November against October</h3>
    ${compareBars(topEight)}
    <p class="card-note">October actuals for these eight categories sum to ${money(octTotal)}. November is ${money(Math.abs(diff))} cheaper overall, mostly from dining out and transport.</p>
  </section>
  <section class="card">
    <h3>Six month trend</h3>
    ${trendBars(MONTHLY_TREND)}
    <p class="card-note">Spending peaked in October at ${money(5312)} and eased to ${money(novTotal)} in November. The six month average is ${money(roundCents(MONTHLY_TREND.reduce((s, m) => s + m.spent, 0) / MONTHLY_TREND.length))}.</p>
  </section>
  <section class="card">
    <h3>Five things worth doing</h3>
    <ol class="tips">
      ${tips.map((t) => `<li><b>${t.title}</b><span>${t.body}</span></li>`).join('')}
    </ol>
  </section>`;
}
