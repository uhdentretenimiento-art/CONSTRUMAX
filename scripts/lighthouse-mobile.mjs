import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function toPerformanceOnlyReport(report) {
  const auditIds = [
    "first-contentful-paint",
    "largest-contentful-paint",
    "speed-index",
    "interactive",
    "total-blocking-time",
    "max-potential-fid",
    "cumulative-layout-shift",
    "unused-javascript",
  ];

  const audits = {};
  for (const id of auditIds) {
    if (report.audits?.[id]) {
      audits[id] = report.audits[id];
    }
  }

  return {
    lighthouseVersion: report.lighthouseVersion,
    requestedUrl: report.requestedUrl,
    finalUrl: report.finalUrl,
    fetchTime: report.fetchTime,
    categories: {
      performance: report.categories?.performance ?? null,
    },
    audits,
  };
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

function printSummary(current, baseline = null) {
  const metricIds = [
    "first-contentful-paint",
    "largest-contentful-paint",
    "speed-index",
    "interactive",
    "total-blocking-time",
    "max-potential-fid",
  ];

  console.log("\nPerformance:", score(current));

  for (const id of metricIds) {
    const curr = metric(current, id);
    if (!baseline) {
      console.log(`${id}: ${curr.display} (${curr.numeric})`);
      continue;
    }

    const base = metric(baseline, id);
    const delta = curr.numeric - base.numeric;
    const sign = delta > 0 ? "+" : "";
    console.log(`${id}: ${base.display} -> ${curr.display} (delta ${sign}${delta.toFixed(2)})`);
  }

  if (baseline) {
    const deltaScore = score(current) - score(baseline);
    const sign = deltaScore > 0 ? "+" : "";
    console.log(`Score delta: ${sign}${deltaScore}`);
  }
}

const url = process.argv[2] || "http://localhost:3100";
const baselinePath = process.argv[3] || null;

const reportsDir = path.resolve("reports");
fs.mkdirSync(reportsDir, { recursive: true });

const summaryOutputFile = path.join(
  reportsDir,
  `lighthouse-mobile-${formatTimestamp(new Date())}.json`
);
const rawOutputFile = summaryOutputFile.replace(/\.json$/, "-full.json");

const cmd = [
  "npx lighthouse",
  url,
  "--only-categories=performance",
  "--emulated-form-factor=mobile",
  "--throttling-method=simulate",
  "--output=json",
  `--output-path=\"${rawOutputFile}\"`,
  "--chrome-flags=\"--headless=new --disable-gpu --no-sandbox\"",
].join(" ");

console.log("Running:", cmd);
let lighthouseFailed = false;
try {
  execSync(cmd, { stdio: "inherit" });
} catch {
  lighthouseFailed = true;
}

if (!fs.existsSync(rawOutputFile)) {
  console.error("Lighthouse did not create a report file.");
  console.error("Check that the URL is reachable:", url);
  process.exit(1);
}

const rawCurrent = readJson(rawOutputFile);
const current = toPerformanceOnlyReport(rawCurrent);
fs.writeFileSync(summaryOutputFile, JSON.stringify(current, null, 2));
const baseline = baselinePath && fs.existsSync(path.resolve(baselinePath))
  ? readJson(path.resolve(baselinePath))
  : null;

const finalUrl = String(rawCurrent.finalUrl || "");
if (finalUrl.startsWith("chrome-error://")) {
  console.error("Lighthouse reached a Chrome interstitial page.");
  console.error("Check that the server is running and URL is correct:", url);
  process.exit(1);
}

console.log("\nSaved summary:", summaryOutputFile);
console.log("Saved full report:", rawOutputFile);
if (baselinePath && !baseline) {
  console.log("Baseline not found:", baselinePath);
}

printSummary(current, baseline);

if (lighthouseFailed) {
  console.warn("Lighthouse exited with warnings, but report was generated and parsed.");
}
