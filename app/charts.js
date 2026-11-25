// Hearth and Ledger: charts drawn as inline SVG, no libraries.
// One job: turn category figures into a donut and a set of bars.

import { money, moneyShort, escapeHtml } from './format.js';

// A donut of spending by category. slices: [{ name, value, color }].
// Returns an SVG string; the centre shows the total.
export function donutChart(slices, total, size) {
  const width = size || 260;
  const radius = width / 2 - 14;
  const inner = radius - 34;
  const cx = width / 2;
  const cy = width / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  let paths = '';
  for (const slice of slices) {
    const fraction = total > 0 ? slice.value / total : 0;
    const length = fraction * circumference;
    if (length <= 0) continue;
    // A small gap between slices so each category reads on its own.
    const gap = length > 6 ? 3 : 0;
    paths += '<circle cx="' + cx + '" cy="' + cy + '" r="' + radius + '" fill="none" stroke="' + slice.color + '" stroke-width="34" stroke-dasharray="' + (length - gap).toFixed(1) + ' ' + (circumference - length + gap).toFixed(1) + '" stroke-dashoffset="' + (-offset).toFixed(1) + '" transform="rotate(-90 ' + cx + ' ' + cy + ')" />';
    offset += length;
  }
  return '<svg class="donut" viewBox="0 0 ' + width + ' ' + width + '" role="img" aria-label="Spending by category, total ' + money(total) + '">' +
    paths +
    '<text x="' + cx + '" y="' + (cy - 6) + '" class="donut-total" text-anchor="middle">' + money(total) + '</text>' +
    '<text x="' + cx + '" y="' + (cy + 18) + '" class="donut-label" text-anchor="middle">spent in November</text>' +
    '</svg>';
}

// A legend row for the donut: a colour dot, the name, and the amount.
export function donutLegend(slices, total) {
  return slices.map((slice) => {
    const share = total > 0 ? Math.round((slice.value / total) * 100) : 0;
    return '<li><span class="dot" style="background:' + slice.color + '"></span>' +
      '<span class="legend-name">' + escapeHtml(slice.name) + '</span>' +
      '<span class="legend-value">' + money(slice.value) + ' · ' + share + '%</span></li>';
  }).join('');
}

// Horizontal bars comparing two months per category.
// rows: [{ name, thisMonth, lastMonth }]. The longer bar sets the scale.
export function comparisonBars(rows) {
  const max = Math.max(1, ...rows.flatMap((r) => [r.thisMonth, r.lastMonth]));
  return rows.map((row) => {
    const thisWidth = Math.max(2, Math.round((row.thisMonth / max) * 100));
    const lastWidth = Math.max(2, Math.round((row.lastMonth / max) * 100));
    const diff = row.thisMonth - row.lastMonth;
    const diffText = diff > 0 ? '+' + money(diff) + ' more' : diff < 0 ? money(-diff) + ' less' : 'same as October';
    return '<div class="compare-row">' +
      '<div class="compare-name">' + escapeHtml(row.name) + '</div>' +
      '<div class="compare-bars">' +
      '<div class="compare-bar"><span class="bar bar-nov" style="width:' + thisWidth + '%"></span><span class="bar-value">' + money(row.thisMonth) + '</span></div>' +
      '<div class="compare-bar"><span class="bar bar-oct" style="width:' + lastWidth + '%"></span><span class="bar-value">' + money(row.lastMonth) + '</span></div>' +
      '</div>' +
      '<div class="compare-diff">' + diffText + '</div>' +
      '</div>';
  }).join('');
}

// A simple six-month trend: vertical bars with the month under each.
export function trendBars(points) {
  const max = Math.max(1, ...points.map((p) => p.spent));
  const bars = points.map((point) => {
    const height = Math.max(4, Math.round((point.spent / max) * 100));
    return '<div class="trend-col">' +
      '<div class="trend-value">' + moneyShort(point.spent) + '</div>' +
      '<div class="trend-track"><span class="trend-fill" style="height:' + height + '%"></span></div>' +
      '<div class="trend-month">' + escapeHtml(point.month) + '</div>' +
      '</div>';
  }).join('');
  return '<div class="trend">' + bars + '</div>';
}

// A thin progress bar: used for budgets and savings goals.
export function progressBar(value, max, tone) {
  const ratio = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const cls = tone === 'over' ? 'progress-fill over' : tone === 'good' ? 'progress-fill good' : 'progress-fill';
  return '<div class="progress" role="img" aria-label="' + ratio + ' percent"><span class="' + cls + '" style="width:' + ratio + '%"></span></div>';
}
