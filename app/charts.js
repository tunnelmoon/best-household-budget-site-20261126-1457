// charts.js: hand-drawn SVG charts. No libraries, no images, just shapes
// computed from the same numbers the tables show.

import { money, moneyWhole, percent } from './format.js';

const PALETTE = [
  '#1d3a2f', '#c98f2d', '#7a9b6d', '#b4552d', '#4a7a8c',
  '#8c6d3f', '#5d7a4a', '#a34d5e', '#6b7fa3', '#9c8a4a',
  '#3f6b57', '#d9a441', '#7c5a7a', '#54704a',
];

export function donutChart(rows) {
  const total = rows.reduce((sum, r) => sum + r.spent, 0);
  const cx = 110;
  const cy = 110;
  const r = 84;
  const hole = 58;
  let angle = -Math.PI / 2;
  const slices = [];
  const labels = [];
  rows.forEach((row, i) => {
    const frac = total ? row.spent / total : 0;
    const sweep = frac * Math.PI * 2;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle + sweep);
    const y2 = cy + r * Math.sin(angle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    slices.push(
      `<path d="M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${PALETTE[i % PALETTE.length]}"><title>${row.category}: ${money(row.spent)}</title></path>`,
    );
    angle += sweep;
  });
  const legend = rows
    .map(
      (row, i) =>
        `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${row.category}<b>${money(row.spent)}</b><span class="pct">${percent(total ? row.spent / total : 0)}</span></li>`,
    )
    .join('');
  return `
    <div class="donut-wrap">
      <svg viewBox="0 0 220 220" role="img" aria-label="Donut chart of November spending by category">
        ${slices.join('')}
        <circle cx="${cx}" cy="${cy}" r="${hole}" fill="#faf6ee"></circle>
        <text x="${cx}" y="${cy - 6}" text-anchor="middle" class="donut-total">${moneyWhole(total)}</text>
        <text x="${cx}" y="${cy + 16}" text-anchor="middle" class="donut-label">spent in November</text>
      </svg>
      <ul class="legend">${legend}</ul>
    </div>`;
}

export function compareBars(rows) {
  const max = Math.max(...rows.map((r) => Math.max(r.nov, r.oct)), 1);
  return rows
    .map((row) => {
      const novW = Math.max(2, Math.round((row.nov / max) * 100));
      const octW = Math.max(2, Math.round((row.oct / max) * 100));
      const diff = row.nov - row.oct;
      const diffText = diff === 0 ? 'same as October' : diff < 0 ? `${money(Math.abs(diff))} less than October` : `${money(diff)} more than October`;
      const diffClass = diff === 0 ? 'flat' : diff < 0 ? 'good' : 'bad';
      return `
      <div class="compare-row">
        <div class="compare-head"><span>${row.category}</span><span class="${diffClass}">${diffText}</span></div>
        <div class="bar-row"><span class="bar-tag">Nov</span><div class="bar-track"><div class="bar nov" style="width:${novW}%"></div></div><b>${money(row.nov)}</b></div>
        <div class="bar-row"><span class="bar-tag">Oct</span><div class="bar-track"><div class="bar oct" style="width:${octW}%"></div></div><b>${money(row.oct)}</b></div>
      </div>`;
    })
    .join('');
}

export function trendBars(months) {
  const max = Math.max(...months.map((m) => m.spent), 1);
  const bars = months
    .map((m) => {
      const h = Math.max(6, Math.round((m.spent / max) * 120));
      const current = m.month === 'Nov' ? ' current' : '';
      return `<div class="trend-col"><div class="trend-bar${current}" style="height:${h}px" title="${m.month}: ${money(m.spent)}"></div><span class="trend-val">${moneyWhole(m.spent)}</span><span class="trend-month">${m.month}</span></div>`;
    })
    .join('');
  return `<div class="trend-chart" role="img" aria-label="Monthly spending trend, June to November">${bars}</div>`;
}

export function progressBar(saved, target) {
  const pct = Math.min(100, Math.round((saved / target) * 100));
  return `<div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>`;
}
