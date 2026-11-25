// Hearth and Ledger: small formatting helpers. One job: turn numbers
// and dates into the words the pages show.

export function money(amount) {
  const value = Number(amount) || 0;
  return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function moneyShort(amount) {
  const value = Number(amount) || 0;
  if (value >= 1000) return '$' + (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return '$' + Math.round(value);
}

export function percent(part, whole) {
  if (!whole) return 0;
  return Math.round((part / whole) * 100);
}

export function shortDate(iso) {
  const parts = String(iso).split('-');
  if (parts.length !== 3) return String(iso);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[Number(parts[1]) - 1] || '';
  return month + ' ' + Number(parts[2]);
}

export function fullDate(iso) {
  const parts = String(iso).split('-');
  if (parts.length !== 3) return String(iso);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[Number(parts[1]) - 1] || '';
  return month + ' ' + Number(parts[2]) + ', ' + parts[0];
}

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
