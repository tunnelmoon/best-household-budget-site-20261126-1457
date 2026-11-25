// Hearth and Ledger: the Rivera household's budget data.
// One job: hold the seed figures and keep edits in the browser.
// Nothing here reaches the network; the site works from its own files.

export const HOUSEHOLD_NAME = 'The Rivera household';
export const HOUSEHOLD_MEMBERS = 'Maya and Jordan Rivera';

export const MONTHS = [
  { id: '2026-11', label: 'November 2026', short: 'Nov' },
  { id: '2026-10', label: 'October 2026', short: 'Oct' },
];

export const INCOME = [
  { source: 'Maya, teaching salary', amount: 3400 },
  { source: 'Jordan, nursing salary', amount: 3050 },
];

export const CATEGORIES = [
  { id: 'housing', name: 'Housing', budget: 1850, color: '#2e6b4f' },
  { id: 'groceries', name: 'Groceries', budget: 720, color: '#7a9b6d' },
  { id: 'dining', name: 'Dining out', budget: 240, color: '#e2a63b' },
  { id: 'transport', name: 'Transport', budget: 310, color: '#4f7d8c' },
  { id: 'utilities', name: 'Utilities', budget: 265, color: '#8a7ba8' },
  { id: 'health', name: 'Health and pharmacy', budget: 180, color: '#c05a2e' },
  { id: 'kids', name: 'Kids and school', budget: 350, color: '#b4763b' },
  { id: 'entertainment', name: 'Entertainment', budget: 150, color: '#5d8a66' },
  { id: 'clothing', name: 'Clothing', budget: 120, color: '#96705a' },
  { id: 'home', name: 'Home and garden', budget: 200, color: '#6d8a4f' },
  { id: 'pets', name: 'Pets', budget: 90, color: '#a89a6a' },
  { id: 'subscriptions', name: 'Subscriptions', budget: 45, color: '#7c8a99' },
  { id: 'savings', name: 'Savings', budget: 900, color: '#1e4a35' },
  { id: 'misc', name: 'Everything else', budget: 140, color: '#9a938a' },
];

// November spending so far, in dollars, as the family recorded it.
export const NOVEMBER_TRANSACTIONS = [
  { date: '2026-11-01', merchant: 'Maple Street Mortgage', category: 'housing', amount: 1850.00, note: 'Monthly payment' },
  { date: '2026-11-01', merchant: 'Green Grocer', category: 'groceries', amount: 142.60, note: 'Weekly shop' },
  { date: '2026-11-02', merchant: 'City Transit', category: 'transport', amount: 56.00, note: 'Monthly passes' },
  { date: '2026-11-03', merchant: 'Corner Bakery', category: 'dining', amount: 24.50, note: 'Breakfast with the kids' },
  { date: '2026-11-04', merchant: 'Riverside Pharmacy', category: 'health', amount: 38.20, note: 'Prescription refill' },
  { date: '2026-11-05', merchant: 'Green Grocer', category: 'groceries', amount: 118.45, note: 'Weekly shop' },
  { date: '2026-11-06', merchant: 'Fuel Stop', category: 'transport', amount: 52.30, note: 'Tank fill' },
  { date: '2026-11-07', merchant: 'Pasta House', category: 'dining', amount: 68.00, note: 'Friday dinner out' },
  { date: '2026-11-08', merchant: 'Book Nook', category: 'kids', amount: 42.90, note: 'School reading books' },
  { date: '2026-11-09', merchant: 'StreamBox', category: 'subscriptions', amount: 15.99, note: 'Monthly plan' },
  { date: '2026-11-10', merchant: 'Green Grocer', category: 'groceries', amount: 129.80, note: 'Weekly shop' },
  { date: '2026-11-11', merchant: 'City Power', category: 'utilities', amount: 132.40, note: 'Electric bill' },
  { date: '2026-11-12', merchant: 'Tailor and Thread', category: 'clothing', amount: 64.00, note: 'Winter coats, two' },
  { date: '2026-11-13', merchant: 'Fuel Stop', category: 'transport', amount: 48.75, note: 'Tank fill' },
  { date: '2026-11-14', merchant: 'Cinema on Fifth', category: 'entertainment', amount: 41.00, note: 'Family movie night' },
  { date: '2026-11-15', merchant: 'NetLink Internet', category: 'utilities', amount: 79.00, note: 'Monthly internet' },
  { date: '2026-11-16', merchant: 'Green Grocer', category: 'groceries', amount: 121.30, note: 'Weekly shop' },
  { date: '2026-11-17', merchant: 'Paws and Claws', category: 'pets', amount: 88.00, note: 'Vet check and food' },
  { date: '2026-11-18', merchant: 'School Supplies Co', category: 'kids', amount: 96.40, note: 'Art materials' },
  { date: '2026-11-19', merchant: 'Taco Corner', category: 'dining', amount: 36.75, note: 'Takeaway lunch' },
  { date: '2026-11-20', merchant: 'Garden Centre', category: 'home', amount: 87.50, note: 'Autumn bulbs and mulch' },
  { date: '2026-11-21', merchant: 'Green Grocer', category: 'groceries', amount: 104.55, note: 'Weekly shop' },
  { date: '2026-11-22', merchant: 'Fuel Stop', category: 'transport', amount: 51.20, note: 'Tank fill' },
  { date: '2026-11-23', merchant: 'MusicStream', category: 'subscriptions', amount: 10.99, note: 'Family plan' },
  { date: '2026-11-24', merchant: 'City Water', category: 'utilities', amount: 64.30, note: 'Water bill' },
  { date: '2026-11-25', merchant: 'Noodle Bar', category: 'dining', amount: 54.00, note: 'Dinner with friends' },
  { date: '2026-11-25', merchant: 'Savings Transfer', category: 'savings', amount: 900.00, note: 'Automatic transfer' },
  { date: '2026-11-26', merchant: 'Hardware Barn', category: 'home', amount: 86.50, note: 'Gutter repair parts' },
  { date: '2026-11-26', merchant: 'After-school Club', category: 'kids', amount: 120.00, note: 'November fees' },
  { date: '2026-11-27', merchant: 'Green Grocer', category: 'groceries', amount: 68.00, note: 'Top-up shop' },
  { date: '2026-11-27', merchant: 'Board Game Night', category: 'entertainment', amount: 34.50, note: 'New game for the shelf' },
  { date: '2026-11-28', merchant: 'Dentist Visit', category: 'health', amount: 75.00, note: 'Check-up copay' },
  { date: '2026-11-28', merchant: 'Coffee Cart', category: 'dining', amount: 18.90, note: 'Saturday coffee' },
  { date: '2026-11-29', merchant: 'Kids Shoes', category: 'kids', amount: 89.00, note: 'New school shoes' },
  { date: '2026-11-29', merchant: 'Magazine Sub', category: 'subscriptions', amount: 12.00, note: 'Monthly issue' },
  { date: '2026-11-06', merchant: 'Gift Wrap Shop', category: 'misc', amount: 24.00, note: 'Birthday wrapping' },
  { date: '2026-11-14', merchant: 'Post Office', category: 'misc', amount: 18.50, note: 'Parcel to grandma' },
  { date: '2026-11-23', merchant: 'Charity Collection', category: 'misc', amount: 40.00, note: 'School fundraiser' },
  { date: '2026-11-27', merchant: 'Dry Cleaner', category: 'misc', amount: 22.75, note: 'Coat cleaning' },
  { date: '2026-11-30', merchant: 'Green Grocer', category: 'groceries', amount: 94.20, note: 'Month-end shop' },
];

// October actuals, for the month-to-month comparison on the Insights page.
export const OCTOBER_ACTUALS = {
  housing: 1850, groceries: 698, dining: 212, transport: 288, utilities: 252,
  health: 165, kids: 301, entertainment: 138, clothing: 74, home: 156,
  pets: 92, subscriptions: 85, savings: 900, misc: 101,
};

export const GOALS = [
  { id: 'emergency', name: 'Emergency fund', target: 12000, saved: 8400, note: 'Six months of essentials, for peace of mind.' },
  { id: 'roof', name: 'New roof', target: 9500, saved: 3200, note: 'The south slope leaks every spring.' },
  { id: 'trip', name: 'Summer road trip', target: 2400, saved: 1150, note: 'Two weeks down the coast in July.' },
];

export const BILLS = [
  { id: 'mortgage', name: 'Mortgage', amount: 1850.00, due: '2026-11-01', paid: true },
  { id: 'electric', name: 'Electric bill', amount: 132.40, due: '2026-11-12', paid: true },
  { id: 'internet', name: 'Internet', amount: 79.00, due: '2026-11-15', paid: true },
  { id: 'water', name: 'Water bill', amount: 64.30, due: '2026-11-24', paid: true },
  { id: 'phone', name: 'Phone plans', amount: 110.00, due: '2026-11-21', paid: false },
  { id: 'insurance', name: 'Car insurance', amount: 148.00, due: '2026-11-25', paid: false },
  { id: 'gym', name: 'Gym membership', amount: 45.00, due: '2026-11-28', paid: false },
];

// Six months of total spending, oldest first, for the trend chart.
export const TREND = [
  { month: 'Jun', spent: 5210 },
  { month: 'Jul', spent: 5480 },
  { month: 'Aug', spent: 5120 },
  { month: 'Sep', spent: 5340 },
  { month: 'Oct', spent: 5312 },
  { month: 'Nov', spent: 5222 },
];

const STORAGE_KEY = 'hearth-and-ledger-v1';

export function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.transactions)) return null;
    return parsed;
  } catch (err) {
    return null;
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    // Private mode or a full store: the site keeps working in memory.
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    // Nothing stored to clear.
  }
}

export function freshState() {
  return {
    transactions: NOVEMBER_TRANSACTIONS.map((t) => ({ ...t })),
    budgets: Object.fromEntries(CATEGORIES.map((c) => [c.id, c.budget])),
    goals: GOALS.map((g) => ({ ...g })),
    bills: BILLS.map((b) => ({ ...b })),
  };
}
