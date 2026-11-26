// data.js: the Rivera household's November figures plus persistence.
// Every figure on the site derives from this one state object, so the
// dashboard, budget page and transactions page can never disagree.
// Amounts are dollars with two decimals; totals are rounded to cents.

export const HOUSEHOLD = {
  name: 'The Rivera Household',
  members: 'Maya and Jordan Rivera',
  month: 'November 2026',
  income: [
    { source: "Maya's salary", amount: 3850 },
    { source: "Jordan's salary", amount: 2600 },
  ],
};

// Planned monthly budget per category. Spent comes from the transactions
// below, so the two always reconcile.
export const DEFAULT_BUDGETS = {
  Housing: 1850,
  Groceries: 620,
  Utilities: 210,
  Transport: 320,
  'Dining Out': 240,
  Savings: 900,
  Childcare: 480,
  Health: 180,
  Insurance: 260,
  Entertainment: 120,
  Clothing: 90,
  Household: 110,
  Subscriptions: 65,
  Personal: 150,
};

export const CATEGORY_ORDER = Object.keys(DEFAULT_BUDGETS);

// 40 November transactions. Their sum is exactly $5,222.23, which is the
// month's spending shown on the dashboard and in the budget totals.
export const DEFAULT_TRANSACTIONS = [
  { id: 1, date: '2026-11-01', name: 'Rent payment', category: 'Housing', amount: 1850.00 },
  { id: 2, date: '2026-11-01', name: 'Savings transfer', category: 'Savings', amount: 900.00 },
  { id: 3, date: '2026-11-01', name: 'Music stream', category: 'Subscriptions', amount: 15.99 },
  { id: 4, date: '2026-11-02', name: 'Whole Foods Market', category: 'Groceries', amount: 142.35 },
  { id: 5, date: '2026-11-03', name: 'Gas station', category: 'Transport', amount: 52.00 },
  { id: 6, date: '2026-11-03', name: 'Childcare center', category: 'Childcare', amount: 460.00 },
  { id: 7, date: '2026-11-04', name: 'Bella Trattoria', category: 'Dining Out', amount: 48.25 },
  { id: 8, date: '2026-11-05', name: 'Pharmacy', category: 'Health', amount: 58.00 },
  { id: 9, date: '2026-11-06', name: 'Corner Grocery', category: 'Groceries', amount: 98.20 },
  { id: 10, date: '2026-11-06', name: 'Hardware store', category: 'Household', amount: 28.55 },
  { id: 11, date: '2026-11-07', name: 'Movie night', category: 'Entertainment', amount: 24.99 },
  { id: 12, date: '2026-11-08', name: 'Metro pass', category: 'Transport', amount: 48.50 },
  { id: 13, date: '2026-11-08', name: 'Cloud storage', category: 'Subscriptions', amount: 12.99 },
  { id: 14, date: '2026-11-09', name: 'Taco stand', category: 'Dining Out', amount: 32.40 },
  { id: 15, date: '2026-11-10', name: 'Farmers market', category: 'Groceries', amount: 121.40 },
  { id: 16, date: '2026-11-10', name: 'Haircut', category: 'Personal', amount: 22.50 },
  { id: 17, date: '2026-11-11', name: 'Kids shoes', category: 'Clothing', amount: 38.20 },
  { id: 18, date: '2026-11-12', name: 'City Electric', category: 'Utilities', amount: 142.30 },
  { id: 19, date: '2026-11-13', name: 'Dental checkup', category: 'Health', amount: 44.30 },
  { id: 20, date: '2026-11-14', name: 'Gas station', category: 'Transport', amount: 61.20 },
  { id: 21, date: '2026-11-15', name: 'Whole Foods Market', category: 'Groceries', amount: 86.75 },
  { id: 22, date: '2026-11-15', name: 'City Water', category: 'Utilities', amount: 68.40 },
  { id: 23, date: '2026-11-16', name: 'Sushi bar', category: 'Dining Out', amount: 41.00 },
  { id: 24, date: '2026-11-17', name: 'Concert tickets', category: 'Entertainment', amount: 32.76 },
  { id: 25, date: '2026-11-17', name: 'Bookstore', category: 'Personal', amount: 18.88 },
  { id: 26, date: '2026-11-18', name: 'Cleaning supplies', category: 'Household', amount: 31.00 },
  { id: 27, date: '2026-11-19', name: 'Rideshare', category: 'Transport', amount: 38.70 },
  { id: 28, date: '2026-11-19', name: 'Video stream', category: 'Subscriptions', amount: 19.42 },
  { id: 29, date: '2026-11-20', name: 'Trash and recycling', category: 'Utilities', amount: 10.00 },
  { id: 30, date: '2026-11-21', name: 'Corner Grocery', category: 'Groceries', amount: 134.60 },
  { id: 31, date: '2026-11-22', name: 'Coffee house', category: 'Dining Out', amount: 24.50 },
  { id: 32, date: '2026-11-23', name: 'Winter jackets', category: 'Clothing', amount: 26.00 },
  { id: 33, date: '2026-11-24', name: 'Pharmacy', category: 'Health', amount: 30.00 },
  { id: 34, date: '2026-11-25', name: 'Gas station', category: 'Transport', amount: 26.00 },
  { id: 35, date: '2026-11-25', name: 'Car insurance', category: 'Insurance', amount: 260.00 },
  { id: 36, date: '2026-11-26', name: 'Board game cafe', category: 'Entertainment', amount: 21.00 },
  { id: 37, date: '2026-11-26', name: 'Gift shop', category: 'Personal', amount: 23.50 },
  { id: 38, date: '2026-11-27', name: 'Farmers market', category: 'Groceries', amount: 95.60 },
  { id: 39, date: '2026-11-28', name: 'Pizza night', category: 'Dining Out', amount: 15.00 },
  { id: 40, date: '2026-11-29', name: 'Light bulbs', category: 'Household', amount: 17.00 },
];

// Seven bills. Each one matches a real transaction above, so a bill marked
// paid is money the transactions already show as spent.
export const DEFAULT_BILLS = [
  { id: 1, name: 'Rent', amount: 1850.00, due: '2026-11-01', paid: true },
  { id: 2, name: 'Music stream', amount: 15.99, due: '2026-11-01', paid: true },
  { id: 3, name: 'City Electric', amount: 142.30, due: '2026-11-12', paid: true },
  { id: 4, name: 'City Water', amount: 68.40, due: '2026-11-15', paid: true },
  { id: 5, name: 'Video stream', amount: 19.42, due: '2026-11-19', paid: false },
  { id: 6, name: 'Trash and recycling', amount: 10.00, due: '2026-11-20', paid: false },
  { id: 7, name: 'Car insurance', amount: 260.00, due: '2026-11-25', paid: false },
];

export const DEFAULT_GOALS = [
  { id: 1, name: 'Emergency fund', saved: 8400, target: 12000, note: 'Six months of essentials, for the month nobody plans for.' },
  { id: 2, name: 'New roof', saved: 3200, target: 9500, note: 'The roofer quoted $9,500. Saving a little every month.' },
  { id: 3, name: 'Summer road trip', saved: 1150, target: 2400, note: 'Two weeks down the coast next July.' },
];

// October actuals for the eight biggest November categories. They sum to
// exactly $5,312, the October total shown in Insights.
export const OCTOBER_ACTUALS = {
  Housing: 1850.00,
  Savings: 890.00,
  Groceries: 812.40,
  Childcare: 500.00,
  Transport: 398.60,
  Insurance: 260.00,
  'Dining Out': 348.90,
  Utilities: 252.10,
};

// Monthly spending for the six month trend, June through November.
export const MONTHLY_TREND = [
  { month: 'Jun', spent: 4980 },
  { month: 'Jul', spent: 5120 },
  { month: 'Aug', spent: 4890 },
  { month: 'Sep', spent: 5240 },
  { month: 'Oct', spent: 5312 },
  { month: 'Nov', spent: 5222 },
];

const STORAGE_KEY = 'hearth-and-ledger-v1';

function freshState() {
  return {
    budgets: { ...DEFAULT_BUDGETS },
    transactions: DEFAULT_TRANSACTIONS.map((t) => ({ ...t })),
    bills: DEFAULT_BILLS.map((b) => ({ ...b })),
    goals: DEFAULT_GOALS.map((g) => ({ ...g })),
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    const saved = JSON.parse(raw);
    const state = freshState();
    if (saved.budgets) Object.assign(state.budgets, saved.budgets);
    if (Array.isArray(saved.transactions)) state.transactions = saved.transactions;
    if (Array.isArray(saved.bills)) state.bills = saved.bills;
    if (Array.isArray(saved.goals)) state.goals = saved.goals;
    return state;
  } catch {
    return freshState();
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  return freshState();
}

export function roundCents(n) {
  return Math.round(n * 100) / 100;
}

export function totalIncome() {
  return roundCents(HOUSEHOLD.income.reduce((sum, line) => sum + line.amount, 0));
}

export function totalSpent(state) {
  return roundCents(state.transactions.reduce((sum, t) => sum + t.amount, 0));
}

export function totalPlanned(state) {
  return roundCents(Object.values(state.budgets).reduce((sum, n) => sum + n, 0));
}

export function leftToSpend(state) {
  return roundCents(totalIncome() - totalSpent(state));
}

export function spentByCategory(state) {
  const spent = {};
  for (const category of CATEGORY_ORDER) spent[category] = 0;
  for (const t of state.transactions) {
    if (spent[t.category] === undefined) spent[t.category] = 0;
    spent[t.category] = roundCents(spent[t.category] + t.amount);
  }
  return spent;
}

export function overBudgetRows(state) {
  const spent = spentByCategory(state);
  return CATEGORY_ORDER
    .map((category) => ({
      category,
      planned: state.budgets[category],
      spent: spent[category],
      over: roundCents(spent[category] - state.budgets[category]),
    }))
    .filter((row) => row.over > 0)
    .sort((a, b) => b.over - a.over);
}

export function unpaidBills(state) {
  return state.bills.filter((b) => !b.paid);
}
