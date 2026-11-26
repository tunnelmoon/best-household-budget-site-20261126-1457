// main.js: hash router plus every control's behaviour. The site is one
// page with six sections; the hash picks which render function runs.

import { loadState, saveState, resetState, roundCents } from './data.js';
import {
  renderDashboard, renderBudget, renderTransactions,
  renderGoals, renderBills, renderInsights,
} from './views.js';

const view = document.getElementById('view');
const navLinks = [...document.querySelectorAll('.nav-link')];
let state = loadState();
let txFilter = 'All';

const ROUTES = {
  '': () => renderDashboard(state),
  dashboard: () => renderDashboard(state),
  budget: () => renderBudget(state),
  transactions: () => renderTransactions(state, txFilter),
  goals: () => renderGoals(state),
  bills: () => renderBills(state),
  insights: () => renderInsights(state),
};

function route() {
  const name = location.hash.replace(/^#\/?/, '').split('/')[0] || 'dashboard';
  const render = ROUTES[name] || ROUTES.dashboard;
  view.innerHTML = render();
  navLinks.forEach((link) => {
    const target = link.getAttribute('href').replace(/^#\/?/, '') || 'dashboard';
    const active = target === name || (name === '' && target === 'dashboard');
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

function rerender() {
  saveState(state);
  route();
}

// One delegated listener handles every button, chip, checkbox and form
// the views render, so controls keep working after each re-render.
document.addEventListener('click', (event) => {
  const target = event.target;
  const chip = target.closest('[data-filter]');
  if (chip) {
    txFilter = chip.dataset.filter;
    route();
    return;
  }
  const del = target.closest('[data-delete]');
  if (del) {
    state.transactions = state.transactions.filter((t) => t.id !== Number(del.dataset.delete));
    rerender();
    return;
  }
  const add50 = target.closest('[data-add-goal]');
  if (add50) {
    const goal = state.goals.find((g) => g.id === Number(add50.dataset.addGoal));
    if (goal) goal.saved = roundCents(goal.saved + 50);
    rerender();
    return;
  }
  const add100 = target.closest('[data-add-goal-100]');
  if (add100) {
    const goal = state.goals.find((g) => g.id === Number(add100.dataset.addGoal100));
    if (goal) goal.saved = roundCents(goal.saved + 100);
    rerender();
    return;
  }
  if (target.closest('#save-budget')) {
    const inputs = [...document.querySelectorAll('.plan-input')];
    for (const input of inputs) {
      const amount = Number(input.value);
      if (Number.isFinite(amount) && amount >= 0) state.budgets[input.dataset.category] = roundCents(amount);
    }
    saveState(state);
    const note = document.getElementById('save-note');
    if (note) note.textContent = 'Budget saved.';
    route();
    const after = document.getElementById('save-note');
    if (after) after.textContent = 'Budget saved.';
    return;
  }
  if (target.closest('#reset-data')) {
    state = resetState();
    txFilter = 'All';
    route();
  }
});

document.addEventListener('change', (event) => {
  const billBox = event.target.closest('[data-bill]');
  if (billBox) {
    const bill = state.bills.find((b) => b.id === Number(billBox.dataset.bill));
    if (bill) bill.paid = billBox.checked;
    rerender();
  }
});

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id === 'add-form') {
    const data = new FormData(form);
    const amount = roundCents(Number(data.get('amount')));
    if (!Number.isFinite(amount) || amount <= 0) return;
    const nextId = state.transactions.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    state.transactions.push({
      id: nextId,
      date: String(data.get('date') || '2026-11-30'),
      name: String(data.get('name') || '').trim() || 'Untitled',
      category: String(data.get('category')),
      amount,
    });
    rerender();
    return;
  }
  if (form.id === 'goal-form') {
    const data = new FormData(form);
    const targetAmount = roundCents(Number(data.get('target')));
    const saved = roundCents(Number(data.get('saved') || 0));
    if (!Number.isFinite(targetAmount) || targetAmount <= 0) return;
    const nextId = state.goals.reduce((max, g) => Math.max(max, g.id), 0) + 1;
    state.goals.push({
      id: nextId,
      name: String(data.get('name') || '').trim() || 'New goal',
      saved: Number.isFinite(saved) && saved >= 0 ? saved : 0,
      target: targetAmount,
      note: 'Added by the Rivera household.',
    });
    rerender();
  }
});

window.addEventListener('hashchange', route);
route();
