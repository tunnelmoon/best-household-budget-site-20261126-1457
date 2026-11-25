// Hearth and Ledger: the pages. One job: turn the household's state
// into the HTML of each section. The router in main.js picks which
// one to show; the events in main.js make the controls work.

import { CATEGORIES, INCOME, MONTHS, OCTOBER_ACTUALS, TREND } from './data.js';
import { money, moneyShort, percent, shortDate, fullDate, escapeHtml } from './format.js';
import { donutChart, donutLegend, comparisonBars, trendBars, progressBar } from './charts.js';

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id) || { id, name: id, color: '#9a938a' };
}

export function actualsByCategory(state) {
  const totals = {};
  for (const c of CATEGORIES) totals[c.id] = 0;
  for (const t of state.transactions) {
    if (totals[t.category] !== undefined) totals[t.category] += Number(t.amount) || 0;
  }
  return totals;
}

export function totalIncome() {
  return INCOME.reduce((sum, item) => sum + item.amount, 0);
}

export function totalOut(state) {
  return state.transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
}

function overBudget(state) {
  const actuals = actualsByCategory(state);
  return CATEGORIES
    .filter((c) => c.id !== 'savings' && actuals[c.id] > state.budgets[c.id])
    .map((c) => ({ category: c, over: actuals[c.id] - state.budgets[c.id], actual: actuals[c.id] }));
}

function unpaidBills(state) {
  return state.bills.filter((b) => !b.paid).sort((a, b) => a.due.localeCompare(b.due));
}

export function renderDashboard(state) {
  const actuals = actualsByCategory(state);
  const income = totalIncome();
  const out = totalOut(state);
  const saved = actuals.savings || 0;
  const spent = out - saved;
  const left = income - out;
  const over = overBudget(state);
  const unpaid = unpaidBills(state);
  const slices = CATEGORIES
    .filter((c) => c.id !== 'savings' && actuals[c.id] > 0)
    .map((c) => ({ name: c.name, value: actuals[c.id], color: c.color }))
    .sort((a, b) => b.value - a.value);
  const recent = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date) || b.merchant.localeCompare(a.merchant))
    .slice(0, 5);

  const alerts = over.length
    ? '<div class="alerts">' + over.map((o) =>
        '<p><strong>' + escapeHtml(o.category.name) + ' is ' + money(o.over) + ' over budget.</strong> ' +
        'Spent ' + money(o.actual) + ' of ' + money(state.budgets[o.category.id]) + ' planned.</p>').join('') + '</div>'
    : '<div class="alerts calm"><p>Every category is inside its budget this month.</p></div>';

  return '' +
    '<section class="hero">' +
    '<div><p class="kicker">November 2026 · Maya and Jordan Rivera</p>' +
    '<h1>Left to spend: <span class="hero-number">' + money(left) + '</span></h1>' +
    '<p class="lede">Income ' + money(income) + ', out ' + money(out) + ' so far, and ' + money(saved) + ' moved to savings. The month is on track.</p></div>' +
    '<div class="hero-side"><div class="stat"><span class="stat-value">' + money(income) + '</span><span class="stat-label">income</span></div>' +
    '<div class="stat"><span class="stat-value">' + money(spent) + '</span><span class="stat-label">spent</span></div>' +
    '<div class="stat"><span class="stat-value">' + money(saved) + '</span><span class="stat-label">saved</span></div></div>' +
    '</section>' +
    alerts +
    '<section class="grid-two">' +
    '<div class="panel"><h2>Where the money went</h2>' +
    '<div class="donut-wrap">' + donutChart(slices, spent, 260) +
    '<ul class="legend">' + donutLegend(slices.slice(0, 8), spent) + '</ul></div>' +
    '<p class="panel-note"><a href="#/budget">See the full budget</a></p></div>' +
    '<div class="panel"><h2>Coming up</h2><ul class="bill-list">' +
    unpaid.map((b) => '<li><span><strong>' + escapeHtml(b.name) + '</strong><br><span class="muted">Due ' + fullDate(b.due) + '</span></span><span class="amount">' + money(b.amount) + '</span></li>').join('') +
    '</ul><p class="panel-note"><a href="#/bills">All bills for November</a></p>' +
    '<h2 class="subhead">Savings goals</h2>' +
    state.goals.map((g) =>
      '<div class="goal-mini"><div class="goal-mini-head"><strong>' + escapeHtml(g.name) + '</strong><span>' + money(g.saved) + ' of ' + money(g.target) + '</span></div>' +
      progressBar(g.saved, g.target, 'good') + '</div>').join('') +
    '<p class="panel-note"><a href="#/goals">Open goals</a></p></div>' +
    '</section>' +
    '<section class="panel"><h2>Latest spending</h2>' +
    '<table class="tx-table"><thead><tr><th>Date</th><th>What</th><th>Category</th><th class="num">Amount</th></tr></thead><tbody>' +
    recent.map((t) => '<tr><td>' + shortDate(t.date) + '</td><td>' + escapeHtml(t.merchant) + '</td><td>' + escapeHtml(categoryById(t.category).name) + '</td><td class="num">' + money(t.amount) + '</td></tr>').join('') +
    '</tbody></table><p class="panel-note"><a href="#/transactions">All ' + state.transactions.length + ' transactions</a></p></section>';
}

export function renderBudget(state) {
  const actuals = actualsByCategory(state);
  const totalBudget = CATEGORIES.reduce((sum, c) => sum + state.budgets[c.id], 0);
  const totalActual = CATEGORIES.reduce((sum, c) => sum + actuals[c.id], 0);
  const rows = CATEGORIES.map((c) => {
    const actual = actuals[c.id];
    const budget = state.budgets[c.id];
    const remaining = budget - actual;
    const over = remaining < 0;
    return '<tr class="' + (over ? 'over' : '') + '">' +
      '<td><span class="dot" style="background:' + c.color + '"></span> ' + escapeHtml(c.name) + '</td>' +
      '<td><label class="visually-hidden" for="budget-' + c.id + '">Budget for ' + escapeHtml(c.name) + '</label>' +
      '<input id="budget-' + c.id + '" class="budget-input" type="number" min="0" step="5" value="' + budget + '" data-category="' + c.id + '"></td>' +
      '<td class="num">' + money(actual) + '</td>' +
      '<td class="num">' + (over ? '−' + money(-remaining) : money(remaining)) + '</td>' +
      '<td class="bar-cell">' + progressBar(actual, budget, over ? 'over' : 'good') + '</td>' +
      '</tr>';
  }).join('');

  return '' +
    '<section class="page-head"><h1>The budget</h1>' +
    '<p class="lede">Planned spending for November, against what the family actually spent. Change any budget and save it; the dashboard updates at once.</p></section>' +
    '<section class="panel"><form id="budget-form"><table class="budget-table">' +
    '<thead><tr><th>Category</th><th>Budget</th><th class="num">Spent</th><th class="num">Left</th><th>Used</th></tr></thead>' +
    '<tbody>' + rows + '</tbody>' +
    '<tfoot><tr><td><strong>Total</strong></td><td class="num"><strong>' + money(totalBudget) + '</strong></td><td class="num"><strong>' + money(totalActual) + '</strong></td><td class="num"><strong>' + money(totalBudget - totalActual) + '</strong></td><td></td></tr></tfoot>' +
    '</table><div class="form-actions"><button type="submit" class="btn">Save budgets</button>' +
    '<button type="button" class="btn ghost" data-action="reset-budgets">Reset to planned</button>' +
    '<span class="form-note" id="budget-note" role="status"></span></div></form></section>' +
    '<section class="panel"><h2>How the budget is built</h2>' +
    '<p>Payday money is split before the month starts: housing and bills first, then groceries and transport, then a fixed ' + money(state.budgets.savings) + ' straight to savings. Whatever is left after the plan is the month&rsquo;s breathing room, not a target to spend.</p>' +
    '<p>Two categories are over this month. Groceries ran past the plan after three big shops in one week; utilities crept over when the heating came on early. Both are flagged on the dashboard, and the plan for December already has groceries raised by $40.</p></section>';
}

export function renderTransactions(state, filter) {
  const actuals = actualsByCategory(state);
  const out = totalOut(state);
  const shown = [...state.transactions]
    .filter((t) => !filter || filter === 'all' || t.category === filter)
    .sort((a, b) => b.date.localeCompare(a.date) || b.merchant.localeCompare(a.merchant));
  const options = ['<option value="all">All categories</option>'].concat(
    CATEGORIES.map((c) => '<option value="' + c.id + '"' + (filter === c.id ? ' selected' : '') + '>' + escapeHtml(c.name) + '</option>'),
  ).join('');
  const rows = shown.map((t, index) =>
    '<tr><td>' + shortDate(t.date) + '</td><td>' + escapeHtml(t.merchant) +
    (t.note ? '<br><span class="muted">' + escapeHtml(t.note) + '</span>' : '') + '</td>' +
    '<td>' + escapeHtml(categoryById(t.category).name) + '</td>' +
    '<td class="num">' + money(t.amount) + '</td>' +
    '<td><button type="button" class="btn small danger" data-action="delete-tx" data-date="' + t.date + '" data-merchant="' + escapeHtml(t.merchant) + '" data-amount="' + t.amount + '">Delete</button></td></tr>'
  ).join('');

  return '' +
    '<section class="page-head"><h1>Transactions</h1>' +
    '<p class="lede">' + state.transactions.length + ' transactions in November, ' + money(out) + ' out in total. Add what you spend as it happens and the budget keeps itself honest.</p></section>' +
    '<section class="panel"><form id="add-tx" class="tx-form">' +
    '<div class="field"><label for="tx-date">Date</label><input id="tx-date" name="date" type="date" value="2026-11-30" required></div>' +
    '<div class="field"><label for="tx-merchant">Where</label><input id="tx-merchant" name="merchant" type="text" placeholder="Shop or biller" required maxlength="80"></div>' +
    '<div class="field"><label for="tx-category">Category</label><select id="tx-category" name="category">' +
    CATEGORIES.map((c) => '<option value="' + c.id + '">' + escapeHtml(c.name) + '</option>').join('') + '</select></div>' +
    '<div class="field"><label for="tx-amount">Amount ($)</label><input id="tx-amount" name="amount" type="number" min="0.01" step="0.01" placeholder="0.00" required></div>' +
    '<div class="field"><label for="tx-note">Note</label><input id="tx-note" name="note" type="text" placeholder="Optional" maxlength="120"></div>' +
    '<button type="submit" class="btn">Add transaction</button></form></section>' +
    '<section class="panel"><div class="filter-row"><label for="tx-filter">Show</label>' +
    '<select id="tx-filter">' + options + '</select>' +
    '<span class="muted">' + shown.length + ' shown</span></div>' +
    '<table class="tx-table"><thead><tr><th>Date</th><th>What</th><th>Category</th><th class="num">Amount</th><th></th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></section>';
}

export function renderGoals(state) {
  const cards = state.goals.map((g) => {
    const pct = percent(g.saved, g.target);
    return '<article class="goal-card"><h2>' + escapeHtml(g.name) + '</h2>' +
      '<p>' + escapeHtml(g.note) + '</p>' +
      '<div class="goal-figures"><span class="goal-saved">' + money(g.saved) + '</span><span class="muted">saved of ' + money(g.target) + ' · ' + pct + '%</span></div>' +
      progressBar(g.saved, g.target, 'good') +
      '<div class="form-actions"><button type="button" class="btn" data-action="goal-add" data-goal="' + g.id + '">Add $50</button>' +
      '<span class="muted">' + money(g.target - g.saved) + ' to go</span></div></article>';
  }).join('');

  return '' +
    '<section class="page-head"><h1>Savings goals</h1>' +
    '<p class="lede">Three things the family is saving for, each with its own jar. Money only moves here on purpose, never by accident.</p></section>' +
    '<section class="goals-grid">' + cards + '</section>' +
    '<section class="panel"><h2>Start a new goal</h2>' +
    '<form id="add-goal" class="tx-form">' +
    '<div class="field"><label for="goal-name">Goal name</label><input id="goal-name" name="name" type="text" placeholder="What are you saving for?" required maxlength="60"></div>' +
    '<div class="field"><label for="goal-target">Target ($)</label><input id="goal-target" name="target" type="number" min="1" step="10" placeholder="1000" required></div>' +
    '<div class="field"><label for="goal-saved">Already saved ($)</label><input id="goal-saved" name="saved" type="number" min="0" step="10" value="0" required></div>' +
    '<button type="submit" class="btn">Add goal</button></form></section>';
}

export function renderBills(state) {
  const sorted = [...state.bills].sort((a, b) => a.due.localeCompare(b.due));
  const unpaid = sorted.filter((b) => !b.paid);
  const unpaidTotal = unpaid.reduce((sum, b) => sum + b.amount, 0);
  const rows = sorted.map((b) =>
    '<li class="' + (b.paid ? 'paid' : 'due') + '"><span><strong>' + escapeHtml(b.name) + '</strong><br>' +
    '<span class="muted">Due ' + fullDate(b.due) + '</span></span>' +
    '<span class="bill-right"><span class="amount">' + money(b.amount) + '</span>' +
    '<button type="button" class="btn small" data-action="toggle-bill" data-bill="' + b.id + '">' + (b.paid ? 'Paid' : 'Mark paid') + '</button></span></li>'
  ).join('');

  return '' +
    '<section class="page-head"><h1>Bills</h1>' +
    '<p class="lede">' + unpaid.length + ' bills still to pay in November, ' + money(unpaidTotal) + ' in total. Mark each one paid as it leaves the account.</p></section>' +
    '<section class="panel"><ul class="bill-list big">' + rows + '</ul></section>' +
    '<section class="panel"><h2>How bills are handled</h2>' +
    '<p>The mortgage, internet and phone are on autopay, so they never slip. Power and water are paid by hand the week they arrive, which is when the family checks the meter against the bill. Anything marked paid here stays marked until the next month&rsquo;s bill is added.</p></section>';
}

export function renderInsights(state) {
  const actuals = actualsByCategory(state);
  const octoberTotal = Object.values(OCTOBER_ACTUALS).reduce((a, b) => a + b, 0);
  const novemberTotal = totalOut(state);
  const diff = octoberTotal - novemberTotal;
  const top = CATEGORIES
    .filter((c) => actuals[c.id] > 0)
    .sort((a, b) => actuals[b.id] - actuals[a.id])
    .slice(0, 8)
    .map((c) => ({ name: c.name, thisMonth: actuals[c.id], lastMonth: OCTOBER_ACTUALS[c.id] || 0 }));
  const tips = [
    'Groceries ran ' + money(actuals.groceries - state.budgets.groceries) + ' over the plan. Three big shops landed in one week; the December plan already raises groceries by $40.',
    'Dining out came in ' + money(state.budgets.dining - actuals.dining) + ' under budget, the third month in a row. The family cooks on Fridays now and eats out on Saturdays.',
    'November cost ' + money(diff) + ' less than October, mostly because transport and entertainment were quieter.',
    'Subscriptions cost ' + money(actuals.subscriptions) + ' this month. Two old streaming plans were cancelled in September and the savings show every month since.',
    'The emergency fund is at ' + percent(state.goals[0].saved, state.goals[0].target) + '% of its target. At ' + money(state.budgets.savings) + ' a month it reaches the goal in about four more months.',
  ];

  return '' +
    '<section class="page-head"><h1>Insights</h1>' +
    '<p class="lede">November against October, and what the numbers are actually saying. No advice here that the figures do not back up.</p></section>' +
    '<section class="panel"><h2>November against October</h2>' +
    '<p class="legend-line"><span class="swatch nov"></span> November <span class="swatch oct"></span> October</p>' +
    comparisonBars(top) + '</section>' +
    '<section class="grid-two"><div class="panel"><h2>Six months of spending</h2>' + trendBars(TREND) +
    '<p class="panel-note">Total out each month, savings included. November is the second-lowest month since June.</p></div>' +
    '<div class="panel"><h2>What to do next</h2><ul class="tips">' +
    tips.map((tip) => '<li>' + escapeHtml(tip) + '</li>').join('') +
    '</ul></div></section>';
}

export const VIEWS = {
  dashboard: renderDashboard,
  budget: renderBudget,
  transactions: renderTransactions,
  goals: renderGoals,
  bills: renderBills,
  insights: renderInsights,
};

export const NAV = [
  { id: 'dashboard', label: 'Dashboard', href: '#/dashboard' },
  { id: 'budget', label: 'Budget', href: '#/budget' },
  { id: 'transactions', label: 'Transactions', href: '#/transactions' },
  { id: 'goals', label: 'Goals', href: '#/goals' },
  { id: 'bills', label: 'Bills', href: '#/bills' },
  { id: 'insights', label: 'Insights', href: '#/insights' },
];
