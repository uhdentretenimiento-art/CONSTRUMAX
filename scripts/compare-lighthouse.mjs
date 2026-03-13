import fs from "node:fs";
import path from "node:path";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function score(report) {
  return Math.round((report.categories?.performance?.score ?? 0) * 100);
}

function metric(report, id) {
  const audit = report.audits?.[id];
  return {
    display: audit?.displayValue ?? "n/a",
    numeric: Number(audit?.numericValue ?? 0),
  };
}

const basePath = process.argv[2];
const currentPath = process.argv[3];

if (!basePath || !currentPath) {
  console.error("Usage: node scripts/compare-lighthouse.mjs <baseline.json> <current.json>");
  process.exit(1);
}

const base = readJson(path.resolve(basePath));
const current = readJson(path.resolve(currentPath));

const metricIds = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "speed-index",
  "interactive",
  "total-blocking-time",
  "max-potential-fid",
  "cumulative-layout-shift",
  "unused-javascript",
];

console.log(`Performance: ${score(base)} -> ${score(current)} (delta ${score(current) - score(base)})`);

for (const id of metricIds) {
  const b = metric(base, id);
  const c = metric(current, id);
  const delta = c.numeric - b.numeric;
  const sign = delta > 0 ? "+" : "";
  console.log(`${id}: ${b.display} -> ${c.display} (delta ${sign}${delta.toFixed(2)})`);
}
