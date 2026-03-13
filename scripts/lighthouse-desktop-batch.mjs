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

function score100(report) {
  return (report.categories?.performance?.score ?? 0) * 100;
}

function metricValue(report, id) {
  return Number(report.audits?.[id]?.numericValue ?? 0);
}

function mean(values) {
  if (!values.length) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function runSingle(url, outputFile) {
  const summaryOutputFile = outputFile;
  const rawOutputFile = outputFile.replace(/\.json$/, "-full.json");
  const cmd = [
    "npx lighthouse",
    url,
    "--only-categories=performance",
    "--preset=desktop",
    "--throttling-method=simulate",
    "--output=json",
    `--output-path=\"${rawOutputFile}\"`,
    "--chrome-flags=\"--headless=new --disable-gpu --no-sandbox\"",
  ].join(" ");

  let failed = false;
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch {
    failed = true;
  }

  if (!fs.existsSync(rawOutputFile)) {
    return { ok: false, failed, report: null };
  }

  const report = readJson(rawOutputFile);
  const finalUrl = String(report.finalUrl || "");
  if (finalUrl.startsWith("chrome-error://")) {
    return { ok: false, failed, report: null };
  }

  const performanceOnly = toPerformanceOnlyReport(report);
  fs.writeFileSync(summaryOutputFile, JSON.stringify(performanceOnly, null, 2));

  return { ok: true, failed, report: performanceOnly, rawOutputFile };
}

const url = process.argv[2] || "http://localhost:3100";
const arg2 = process.argv[3] || null;
const arg3 = process.argv[4] || null;

const arg2Num = Number(arg2);
const arg3Num = Number(arg3);
const arg2IsRuns = arg2 !== null && Number.isFinite(arg2Num) && arg2Num > 0;
const arg3IsRuns = arg3 !== null && Number.isFinite(arg3Num) && arg3Num > 0;

const baselinePath = arg2IsRuns ? null : arg2;
const runsSource = arg2IsRuns ? arg2Num : arg3IsRuns ? arg3Num : 3;
const runs = Math.floor(runsSource);

const reportsDir = path.resolve("reports");
fs.mkdirSync(reportsDir, { recursive: true });

const baseline = baselinePath && fs.existsSync(path.resolve(baselinePath))
  ? readJson(path.resolve(baselinePath))
  : null;

const metrics = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "speed-index",
  "interactive",
  "total-blocking-time",
  "max-potential-fid",
  "cumulative-layout-shift",
];

console.log(`Running Lighthouse desktop batch: ${runs} runs on ${url}`);

const results = [];
for (let i = 1; i <= runs; i += 1) {
  const outputFile = path.join(
    reportsDir,
    `lighthouse-desktop-batch-${formatTimestamp(new Date())}-run${i}.json`
  );

  console.log(`\nRun ${i}/${runs}`);
  const result = runSingle(url, outputFile);

  if (!result.ok) {
    console.warn(`Run ${i} failed or produced invalid report.`);
    continue;
  }

  results.push({
    file: outputFile,
    rawFile: result.rawOutputFile,
    failed: result.failed,
    report: result.report,
  });

  console.log(`Saved: ${outputFile}`);
  console.log(`Saved full report: ${result.rawOutputFile}`);
  console.log(`Score: ${Math.round(score100(result.report))}`);
}

if (!results.length) {
  console.error("No valid Lighthouse reports were generated.");
  console.error("Check that the server is running and URL is correct:", url);
  process.exit(1);
}

const scoreAvg = mean(results.map((r) => score100(r.report)));
console.log(`\nValid runs: ${results.length}/${runs}`);
console.log(`Average performance score: ${scoreAvg.toFixed(2)}`);

for (const id of metrics) {
  const avg = mean(results.map((r) => metricValue(r.report, id)));
  if (!baseline) {
    console.log(`${id}: avg ${avg.toFixed(2)}`);
    continue;
  }

  const base = metricValue(baseline, id);
  const delta = avg - base;
  const sign = delta > 0 ? "+" : "";
  console.log(`${id}: baseline ${base.toFixed(2)} -> avg ${avg.toFixed(2)} (delta ${sign}${delta.toFixed(2)})`);
}

if (baseline) {
  const baseScore = score100(baseline);
  const delta = scoreAvg - baseScore;
  const sign = delta > 0 ? "+" : "";
  console.log(`Score delta vs baseline: ${sign}${delta.toFixed(2)}`);
}

const hadWarnings = results.some((r) => r.failed);
if (hadWarnings) {
  console.warn("Some runs exited with warnings, but valid reports were parsed.");
}
