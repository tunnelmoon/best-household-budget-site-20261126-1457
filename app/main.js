// Hearth and Ledger: the wiring. One job: hold the household's state,
// pick a page from the address, and make its controls work.

import { CATEGORIES, MONTHS, freshState, loadState, saveState, clearState } from './data.js';
import { VIEWS, NAV } from './views.js';

const page = document.getElementById('page');
const nav = document.getElementById('nav');
const saved = loadState();
let state = saved || freshState();
let txFilter = 'all';

function currentRoute() {
  const hash = window.location.hash || '#/dashboard';
  const name = hash.replace(/^#\//, '').split('/')[0];
  return VIEWS[name] ? name : 'dashboard';
}

function renderNav(route) {
  nav.innerHTML = NAV.map((item) =>
    '<a href="' + item.href + '"' + (item.id === route ? ' aria-current="page"' : '') + '>' + item.label + '</a>'
  ).join('');
}

function render() {
  const route = currentRoute();
  renderNav(route);
  page.innerHTML = VIEWS[route](state, txFilter);
  window.scrollTo(0, 0);
}

function persist() {
  saveState(state);
  render();
}

nav.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  window.location.hash = link.getAttribute('href');
});

page.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.getAttribute('data-action');
  if (action === 'reset-budgets') {
    state.budgets = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.budget]));
    persist();
  }
  if (action === 'delete-tx') {
    const date = button.getAttribute('data-date');
    const merchant = button.getAttribute('data-merchant');
    const amount = Number(button.getAttribute('data-amount'));
    const index = state.transactions.findIndex((t) => t.date === date && t.merchant === merchant && Number(t.amount) === amount);
    if (index >= 0) {
      state.transactions.splice(index, 1);
      persist();
    }
  }
  if (action === 'goal-add') {
    const goal = state.goals.find((g) => g.id === button.getAttribute('data-goal'));
    if (goal) {
      goal.saved = Math.min(goal.target, goal.saved + 50);
      persist();
    }
  }
  if (action === 'toggle-bill') {
    const bill = state.bills.find((b) => b.id === button.getAttribute('data-bill'));
    if (bill) {
      bill.paid = !bill.paid;
      persist();
    }
  }
});

page.addEventListener('change', (event) => {
  if (event.target.id === 'tx-filter') {
    txFilter = event.target.value;
    render();
  }
});

page.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id === 'budget-form') {
    form.querySelectorAll('.budget-input').forEach((input) => {
      const value = Number(input.value);
      if (Number.isFinite(value) && value >= 0) state.budgets[input.getAttribute('data-category')] = value;
    });
    saveState(state);
    render();
    const note = document.getElementById('budget-note');
    if (note) note.textContent = 'Budgets saved.';
  }
  if (form.id === 'add-tx') {
    const data = new FormData(form);
    const amount = Number(data.get('amount'));
    if (!Number.isFinite(amount) || amount <= 0) return;
    state.transactions.push({
      date: String(data.get('date') || '2026-11-30'),
      merchant: String(data.get('merchant') || '').trim(),
      category: String(data.get('category') || 'misc'),
      amount,
      note: String(data.get('note') || '').trim(),
    });
    persist();
  }
  if (form.id === 'add-goal') {
    const data = new FormData(form);
    const target = Number(data.get('target'));
    const savedAmount = Number(data.get('saved'));
    const name = String(data.get('name') || '').trim();
    if (!name || !Number.isFinite(target) || target <= 0) return;
    state.goals.push({
      id: 'goal-' + Date.now(),
      name,
      target,
      saved: Number.isFinite(savedAmount) && savedAmount > 0 ? Math.min(savedAmount, target) : 0,
      note: 'Added by the family.',
    });
    persist();
  }
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="reset-all"]');
  if (!button) return;
  clearState();
  state = freshState();
  txFilter = 'all';
  render();
});

window.addEventListener('hashchange', render);

document.getElementById('month-label').textContent = MONTHS[0].label;
render();
