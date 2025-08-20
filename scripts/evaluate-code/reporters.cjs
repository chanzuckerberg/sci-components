#!/usr/bin/env node

const { writeFileSync } = require("fs");
const path = require("path");
const chalk = require("chalk");
const {
  formatDuration,
  escapeHtml,
  ensureDirectoryExists,
} = require("./utils.cjs");
const { EVALUATION_CONFIG } = require("./config.cjs");

/**
 * Shared utility for calculating summary statistics
 */
function calculateResultsSummary(results) {
  const totalFiles = results.length;
  const passedFiles = results.filter((r) => r.summary.readyForReview).length;
  const totalScore = results.reduce((sum, r) => sum + r.summary.score, 0);

  return {
    totalFiles,
    passedFiles,
    passRate: totalFiles > 0 ? passedFiles / totalFiles : 0,
    averageScore: totalFiles > 0 ? totalScore / totalFiles : 0,
    gradeDistribution: results.reduce((acc, r) => {
      acc[r.summary.grade] = (acc[r.summary.grade] || 0) + 1;
      return acc;
    }, {}),
  };
}

/**
 * Enhanced output formatters and reporters
 */

/**
 * Console reporter with colored output
 */
class ConsoleReporter {
  constructor(options = {}) {
    this.enableColors = options.enableColors !== false && process.stdout.isTTY;
    this.verbose = options.verbose || false;

    // Configure chalk based on color settings
    if (!this.enableColors) {
      chalk.level = 0; // Disable colors
    }
  }

  color(text, colorName) {
    if (!this.enableColors) return text;

    // Map old color names to chalk methods
    const colorMap = {
      red: chalk.red,
      green: chalk.green,
      yellow: chalk.yellow,
      blue: chalk.blue,
      magenta: chalk.magenta,
      cyan: chalk.cyan,
      gray: chalk.gray,
      bright: chalk.bold,
    };

    const colorFunc = colorMap[colorName];
    return colorFunc ? colorFunc(text) : text;
  }

  reportSingleFile(result) {
    const { filePath, pluginResults, summary } = result;

    this.printHeader(filePath);
    this.printPluginResults(pluginResults);
    this.printSummary(summary);
  }

  printHeader(filePath) {
    console.log(`\n${this.color("🔍 Evaluating:", "cyan")} ${filePath}`);
    console.log(
      this.color("=".repeat(Math.min(60, filePath.length + 15)), "gray")
    );
  }

  printPluginResults(pluginResults) {
    Object.entries(pluginResults).forEach(([name, pluginResult]) => {
      this.printPluginResult(name, pluginResult);
    });
  }

  printPluginResult(name, pluginResult) {
    const icon = pluginResult.passed ? "✅" : "❌";
    const status = pluginResult.passed
      ? this.color("PASS", "green")
      : this.color("FAIL", "red");
    const duration = this.color(
      `(${formatDuration(pluginResult.duration)})`,
      "gray"
    );

    console.log(`   ${icon} ${name}: ${status} ${duration}`);

    // Always show TypeScript and ESLint errors, even in non-verbose mode
    if (this.shouldShowTypeScriptErrors(name, pluginResult)) {
      this.printTypeScriptErrors(pluginResult);
    } else if (this.shouldShowESLintErrors(name, pluginResult)) {
      this.printESLintErrors(pluginResult);
    } else if (this.verbose && pluginResult.details) {
      this.reportPluginDetails(name, pluginResult);
    }
  }

  shouldShowTypeScriptErrors(name, pluginResult) {
    return (
      name === "typescript" &&
      !pluginResult.passed &&
      pluginResult.details &&
      pluginResult.details.errors
    );
  }

  shouldShowESLintErrors(name, pluginResult) {
    return (
      name === "eslint" &&
      !pluginResult.passed &&
      pluginResult.details &&
      pluginResult.details.errors &&
      pluginResult.details.errors.length > 0
    );
  }

  printESLintErrors(pluginResult) {
    const errorCount = pluginResult.details.errorCount;
    console.log(`      ${this.color(`${errorCount} ESLint errors:`, "red")}`);
    pluginResult.details.errors.slice(0, 3).forEach((error) => {
      // Parse compact format: file: line #, col #, Error - message (rule)
      const match = error.match(
        /^(.+):\s*line\s*(\d+),\s*col\s*\d+,\s*Error\s*-\s*(.+?)\s*\(([^)]+)\)/
      );
      if (match) {
        const [, , line, message, rule] = match;
        console.log(
          `        Line ${line}: ${message} ${this.color(`(${rule})`, "gray")}`
        );
      } else {
        // Fallback for other formats
        console.log(`        ${error}`);
      }
    });
    if (pluginResult.details.errors.length > 3) {
      console.log(
        `        ${this.color(`... and ${pluginResult.details.errors.length - 3} more errors`, "gray")}`
      );
    }
  }

  printTypeScriptErrors(pluginResult) {
    console.log(
      `      ${this.color(`${pluginResult.details.userErrors} TypeScript errors:`, "red")}`
    );
    pluginResult.details.errors.slice(0, 3).forEach((error) => {
      console.log(
        `        ${this.color(error.file + ":" + error.line, "cyan")} - ${error.message}`
      );
    });
    if (pluginResult.details.errors.length > 3) {
      console.log(
        `        ${this.color(`... and ${pluginResult.details.errors.length - 3} more errors`, "gray")}`
      );
    }
  }

  printSummary(summary) {
    console.log(`\n${this.color("📊 SUMMARY", "bright")}`);
    console.log(
      `   Overall Score: ${this.color(`${(summary.score * 100).toFixed(0)}%`, this.getScoreColor(summary.score))}`
    );
    console.log(
      `   Grade: ${this.color(summary.grade, this.getGradeColor(summary.grade))}`
    );
    console.log(
      `   Ready for Review: ${summary.readyForReview ? this.color("✅ YES", "green") : this.color("❌ NO", "red")}`
    );
    if (summary.failureReason) {
      console.log(
        `   ${this.color("⚠️  Failure Reason:", "red")} ${summary.failureReason}`
      );
    }
    console.log(
      `   Total Duration: ${this.color(formatDuration(summary.totalDuration), "gray")}`
    );
  }

  getScoreColor(score) {
    if (score >= 0.8) return "green";
    if (score >= 0.6) return "yellow";
    return "red";
  }

  getGradeColor(grade) {
    if (grade === "A") return "green";
    if (grade === "F") return "red";
    return "yellow";
  }

  reportPluginDetails(pluginName, result) {
    const { details } = result;
    if (!details) return;

    const handlers = {
      typescript: () => this.reportTypeScriptDetails(details),
      sdsUsage: () => this.reportSdsUsageDetails(details),
      designTokens: () => this.reportDesignTokensDetails(details),
    };

    const handler = handlers[pluginName];
    if (handler) {
      handler();
    }
  }

  reportTypeScriptDetails(details) {
    if (details.userErrors > 0) {
      console.log(
        `      ${this.color(`${details.userErrors} TypeScript errors:`, "red")}`
      );
      details.errors.slice(0, 5).forEach((error) => {
        console.log(
          `        ${this.color(error.file + ":" + error.line, "cyan")} - ${error.message}`
        );
      });
      if (details.errors.length > 5) {
        console.log(
          `        ${this.color(`... and ${details.errors.length - 5} more errors`, "gray")}`
        );
      }
    }
  }

  reportSdsUsageDetails(details) {
    if (details.sdsComponentsFound.length > 0) {
      console.log(
        `      ${this.color("SDS Components:", "green")} ${details.sdsComponentsFound.join(", ")}`
      );
    }
    if (details.genericElements.length > 0) {
      console.log(
        `      ${this.color("Generic Elements:", "yellow")} ${details.genericElements.join(", ")}`
      );
    }
  }

  reportDesignTokensDetails(details) {
    if (details.message) {
      const messageColor = this.getDesignTokenMessageColor(details);
      console.log(
        `      ${this.color("Status:", messageColor)} ${details.message}`
      );
    }
    if (details.recommendations && details.recommendations.length > 0) {
      console.log(`      ${this.color("Recommendations:", "yellow")}`);
      details.recommendations.slice(0, 2).forEach((rec) => {
        console.log(`        • ${rec}`);
      });
    }
  }

  getDesignTokenMessageColor(details) {
    if (!details.isRequired) return "gray";
    return details.usesTokens ? "green" : "yellow";
  }

  reportBatchSummary(results) {
    const totalFiles = results.length;
    const passedFiles = results.filter((r) => r.summary.readyForReview).length;
    const avgScore =
      results.reduce((sum, r) => sum + r.summary.score, 0) / totalFiles;

    console.log(`\n${this.color("📈 BATCH SUMMARY", "bright")}`);
    console.log(`   Files Processed: ${this.color(totalFiles, "cyan")}`);
    console.log(
      `   Ready for Review: ${this.color(passedFiles, passedFiles === totalFiles ? "green" : "yellow")}/${totalFiles}`
    );
    console.log(
      `   Average Score: ${this.color(`${(avgScore * 100).toFixed(1)}%`, avgScore >= 0.8 ? "green" : "yellow")}`
    );

    // Grade distribution
    const grades = results.reduce((acc, r) => {
      acc[r.summary.grade] = (acc[r.summary.grade] || 0) + 1;
      return acc;
    }, {});

    console.log(
      `   Grade Distribution: ${Object.entries(grades)
        .map(([grade, count]) => `${grade}:${this.color(count, "cyan")}`)
        .join(" ")}`
    );
  }
}

/**
 * JSON reporter for programmatic consumption
 */
class JSONReporter {
  constructor(options = {}) {
    this.outputPath = options.outputPath;
    this.pretty = options.pretty !== false;
  }

  reportResults(results) {
    const output = {
      timestamp: new Date().toISOString(),
      evaluationConfig: {
        version: "2.0",
        weights: EVALUATION_CONFIG.weights,
        gradeThresholds: EVALUATION_CONFIG.gradeThresholds,
      },
      summary: calculateResultsSummary(results),
      results: results.map((result) => this.formatResult(result)),
    };

    const jsonString = this.pretty
      ? JSON.stringify(output, null, 2)
      : JSON.stringify(output);

    if (this.outputPath) {
      ensureDirectoryExists(path.dirname(this.outputPath));
      writeFileSync(this.outputPath, jsonString);
      return this.outputPath;
    }

    return jsonString;
  }

  formatResult(result) {
    return {
      filePath: result.filePath,
      score: result.summary.score,
      grade: result.summary.grade,
      readyForReview: result.summary.readyForReview,
      duration: result.summary.totalDuration,
      plugins: Object.entries(result.pluginResults).reduce(
        (acc, [name, pluginResult]) => {
          acc[name] = {
            passed: pluginResult.passed,
            score: pluginResult.score,
            duration: pluginResult.duration,
            details: pluginResult.details,
          };
          return acc;
        },
        {}
      ),
    };
  }
}

/**
 * CSV reporter for spreadsheet analysis
 */
class CSVReporter {
  constructor(options = {}) {
    this.outputPath = options.outputPath;
  }

  reportResults(results) {
    const headers = this.getCSVHeaders();
    const rows = results.map((result) => this.formatResultRow(result));
    const csvContent = this.formatAsCSV(headers, rows);

    return this.saveOrReturnContent(csvContent);
  }

  getCSVHeaders() {
    return [
      "File Path",
      "Score (%)",
      "Grade",
      "Ready for Review",
      "Duration (ms)",
      "TypeScript",
      "ESLint",
      "SDS Usage",
      "Imports",
      "Design Tokens",
      "SDS Components",
      "Generic Elements",
      "Errors",
    ];
  }

  formatResultRow(result) {
    return [
      result.filePath,
      (result.summary.score * 100).toFixed(1),
      result.summary.grade,
      result.summary.readyForReview ? "Yes" : "No",
      result.summary.totalDuration,
      ...this.getPluginStatusRow(result.pluginResults),
      result.pluginResults.sdsUsage?.details?.sdsComponentsFound?.join(";") ||
        "",
      result.pluginResults.sdsUsage?.details?.genericElements?.join(";") || "",
      this.extractErrors(result),
    ];
  }

  getPluginStatusRow(pluginResults) {
    const plugins = [
      "typescript",
      "eslint",
      "sdsUsage",
      "imports",
      "designTokens",
    ];
    return plugins.map((plugin) =>
      pluginResults[plugin]?.passed ? "✅" : "❌"
    );
  }

  formatAsCSV(headers, rows) {
    return [headers, ...rows]
      .map((row) =>
        row.map((cell) => CSVReporter.formatCSVCell(cell)).join(",")
      )
      .join("\n");
  }

  /**
   * Formats a single cell for CSV output, escaping quotes and replacing newlines.
   * @param {any} cell
   * @returns {string}
   */
  static formatCSVCell(cell) {
    return (
      '"' +
      String(cell).replace(/"/g, '""').replace(/\r/g, " ").replace(/\n/g, " ") +
      '"'
    );
  }

  saveOrReturnContent(csvContent) {
    if (this.outputPath) {
      ensureDirectoryExists(path.dirname(this.outputPath));
      writeFileSync(this.outputPath, csvContent);
      return this.outputPath;
    }
    return csvContent;
  }

  extractErrors(result) {
    const errors = [];
    this.addErrorsFromPlugins(result.pluginResults, errors);
    return errors.join("; ");
  }

  addErrorsFromPlugins(pluginResults, errors) {
    Object.entries(pluginResults).forEach(([name, pluginResult]) => {
      if (this.hasPluginErrors(pluginResult)) {
        this.addPluginErrorsToList(name, pluginResult, errors);
      }
    });
  }

  hasPluginErrors(pluginResult) {
    return !pluginResult.passed && pluginResult.details?.errors;
  }

  addPluginErrorsToList(name, pluginResult, errors) {
    const pluginErrors = pluginResult.details.errors.slice(0, 2);
    pluginErrors.forEach((error) => {
      errors.push(`${name}: ${error.message || error}`);
    });
  }
}

/**
 * HTML reporter for rich visual reports
 */
class HTMLReporter {
  constructor(options = {}) {
    this.outputPath = options.outputPath;
    this.includeCode = options.includeCode !== false;
  }

  reportResults(results) {
    const html = this.generateHTML(results);

    if (this.outputPath) {
      ensureDirectoryExists(path.dirname(this.outputPath));
      writeFileSync(this.outputPath, html);
      return this.outputPath;
    }

    return html;
  }

  generateHTML(results) {
    const summary = calculateResultsSummary(results);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Evaluation Report</title>
    <style>
        ${this.getCSS()}
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>🔍 Code Evaluation Report</h1>
            <div class="timestamp">Generated: ${new Date().toLocaleString()}</div>
        </header>

        ${this.generateSummarySection(summary)}
        ${this.generateResultsSection(results)}

        <footer class="footer">
            <p>Generated by SDS Evaluation Script v2.0</p>
        </footer>
    </div>

    <script>
        ${this.getJavaScript()}
    </script>
</body>
</html>`;
  }

  generateSummarySection(summary) {
    return `
        <section class="summary">
            <h2>📊 Summary</h2>
            <div class="summary-grid">
                <div class="summary-card">
                    <div class="summary-value">${summary.totalFiles}</div>
                    <div class="summary-label">Files Evaluated</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value">${(summary.averageScore * 100).toFixed(1)}%</div>
                    <div class="summary-label">Average Score</div>
                </div>
                <div class="summary-card ${summary.passRate >= 0.8 ? "success" : summary.passRate >= 0.6 ? "warning" : "error"}">
                    <div class="summary-value">${summary.passedFiles}/${summary.totalFiles}</div>
                    <div class="summary-label">Ready for Review</div>
                </div>
            </div>

            <div class="grade-distribution">
                <h3>Grade Distribution</h3>
                <div class="grade-bars">
                    ${Object.entries(summary.gradeDistribution)
                      .map(
                        ([grade, count]) => `
                        <div class="grade-bar">
                            <span class="grade-label">${grade}</span>
                            <div class="grade-bar-fill grade-${grade.toLowerCase()}" style="width: ${(count / summary.totalFiles) * 100}%"></div>
                            <span class="grade-count">${count}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </section>
    `;
  }

  generateResultsSection(results) {
    return `
        <section class="results">
            <h2>📋 Detailed Results</h2>
            <div class="results-list">
                ${results.map((result, index) => this.generateResultCard(result, index)).join("")}
            </div>
        </section>
    `;
  }

  generateResultCard(result, index) {
    const gradeClass = result.summary.grade.toLowerCase();
    const scorePercent = (result.summary.score * 100).toFixed(0);

    return `
        <div class="result-card grade-${gradeClass}">
            <div class="result-header" onclick="toggleDetails(${index})">
                <div class="result-file">
                    <span class="file-icon">📄</span>
                    ${escapeHtml(path.basename(result.filePath))}
                </div>
                <div class="result-score">
                    <span class="score-value">${scorePercent}%</span>
                    <span class="score-grade grade-${gradeClass}">${result.summary.grade}</span>
                </div>
                <div class="result-status ${result.summary.readyForReview ? "ready" : "not-ready"}">
                    ${result.summary.readyForReview ? "✅ Ready" : "❌ Needs Work"}
                </div>
                <div class="expand-icon">▼</div>
            </div>

            <div class="result-details" id="details-${index}">
                <div class="result-path">${escapeHtml(result.filePath)}</div>

                <div class="plugin-results">
                    ${Object.entries(result.pluginResults)
                      .map(
                        ([name, pluginResult]) => `
                        <div class="plugin-result ${pluginResult.passed ? "passed" : "failed"}">
                            <div class="plugin-header">
                                <span class="plugin-icon">${pluginResult.passed ? "✅" : "❌"}</span>
                                <span class="plugin-name">${name.replace("-", " ")}</span>
                                <span class="plugin-score">${(pluginResult.score * 100).toFixed(0)}%</span>
                                <span class="plugin-duration">${formatDuration(pluginResult.duration)}</span>
                            </div>
                            ${this.generatePluginDetails(name, pluginResult)}
                        </div>
                    `
                      )
                      .join("")}
                </div>

                <div class="result-meta">
                    <span>Duration: ${formatDuration(result.summary.totalDuration)}</span>
                </div>
            </div>
        </div>
    `;
  }

  generatePluginDetails(pluginName, result) {
    const { details } = result;
    if (!details || result.passed) return "";

    let detailsHTML = '<div class="plugin-details">';

    if (pluginName === "typescript" && details.errors) {
      detailsHTML += '<div class="error-list">';
      details.errors.slice(0, 3).forEach((error) => {
        detailsHTML += `<div class="error-item">Line ${error.line}: ${escapeHtml(error.message)}</div>`;
      });
      detailsHTML += "</div>";
    }

    if (pluginName === "sdsUsage" && details.recommendations) {
      detailsHTML += '<div class="recommendations">';
      details.recommendations.slice(0, 3).forEach((rec) => {
        detailsHTML += `<div class="recommendation">💡 ${escapeHtml(rec)}</div>`;
      });
      detailsHTML += "</div>";
    }

    detailsHTML += "</div>";
    return detailsHTML;
  }

  getCSS() {
    return `
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { color: #333; margin-bottom: 10px; }
        .timestamp { color: #666; font-size: 14px; }

        .summary { background: white; border-radius: 8px; padding: 30px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { text-align: center; padding: 20px; background: #f8f9fa; border-radius: 6px; }
        .summary-card.success { background: #d4edda; }
        .summary-card.warning { background: #fff3cd; }
        .summary-card.error { background: #f8d7da; }
        .summary-value { font-size: 32px; font-weight: bold; color: #333; }
        .summary-label { font-size: 14px; color: #666; margin-top: 5px; }

        .grade-distribution h3 { margin-bottom: 15px; }
        .grade-bars { display: grid; gap: 10px; }
        .grade-bar { display: flex; align-items: center; gap: 10px; }
        .grade-label { width: 20px; font-weight: bold; }
        .grade-bar-fill { height: 20px; border-radius: 10px; transition: width 0.3s; }
        .grade-a { background: #28a745; }
        .grade-b { background: #17a2b8; }
        .grade-c { background: #ffc107; }
        .grade-d { background: #fd7e14; }
        .grade-f { background: #dc3545; }
        .grade-count { font-weight: bold; }

        .results { background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .results-list { display: grid; gap: 15px; }
        .result-card { border: 1px solid #dee2e6; border-radius: 6px; overflow: hidden; }
        .result-card.grade-a { border-left: 4px solid #28a745; }
        .result-card.grade-b { border-left: 4px solid #17a2b8; }
        .result-card.grade-c { border-left: 4px solid #ffc107; }
        .result-card.grade-d { border-left: 4px solid #fd7e14; }
        .result-card.grade-f { border-left: 4px solid #dc3545; }

        .result-header { display: flex; align-items: center; padding: 15px; background: #f8f9fa; cursor: pointer; }
        .result-header:hover { background: #e9ecef; }
        .result-file { flex: 1; display: flex; align-items: center; gap: 8px; font-weight: 500; }
        .file-icon { font-size: 16px; }
        .result-score { display: flex; align-items: center; gap: 8px; margin-right: 20px; }
        .score-value { font-weight: bold; font-size: 18px; }
        .score-grade { padding: 4px 8px; border-radius: 4px; color: white; font-weight: bold; }
        .result-status.ready { color: #28a745; font-weight: 500; }
        .result-status.not-ready { color: #dc3545; font-weight: 500; }
        .expand-icon { margin-left: 15px; transition: transform 0.2s; }
        .result-card.expanded .expand-icon { transform: rotate(180deg); }

        .result-details { padding: 20px; display: none; border-top: 1px solid #dee2e6; }
        .result-card.expanded .result-details { display: block; }
        .result-path { font-family: monospace; font-size: 12px; color: #666; margin-bottom: 15px; }

        .plugin-results { display: grid; gap: 10px; }
        .plugin-result { border: 1px solid #dee2e6; border-radius: 4px; overflow: hidden; }
        .plugin-result.passed { border-color: #28a745; }
        .plugin-result.failed { border-color: #dc3545; }
        .plugin-header { display: flex; align-items: center; padding: 10px; background: #f8f9fa; }
        .plugin-icon { margin-right: 8px; }
        .plugin-name { flex: 1; font-weight: 500; text-transform: capitalize; }
        .plugin-score { margin-right: 10px; font-weight: bold; }
        .plugin-duration { font-size: 12px; color: #666; }

        .plugin-details { padding: 10px; font-size: 14px; }
        .error-list { display: grid; gap: 5px; }
        .error-item { color: #dc3545; font-family: monospace; font-size: 12px; }
        .recommendations { display: grid; gap: 5px; }
        .recommendation { color: #856404; font-size: 12px; }

        .result-meta { margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6; font-size: 12px; color: #666; }
        .footer { text-align: center; margin-top: 40px; padding: 20px; color: #666; }

        @media (max-width: 768px) {
            .result-header { flex-direction: column; align-items: stretch; gap: 10px; }
            .result-score, .result-status { justify-content: center; }
        }
    `;
  }

  getJavaScript() {
    return `
        function toggleDetails(index) {
            const card = document.querySelector('.result-card:nth-child(' + (index + 1) + ')');
            card.classList.toggle('expanded');
        }

        // Auto-expand failed results
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.result-card.grade-f, .result-card.grade-d').forEach(card => {
                card.classList.add('expanded');
            });
        });
    `;
  }
}

/**
 * Reporter factory
 */
class ReporterManager {
  constructor() {
    this.reporters = new Map();
  }

  registerReporter(name, reporter) {
    this.reporters.set(name, reporter);
  }

  getReporter(name) {
    return this.reporters.get(name);
  }

  async generateReports(results, formats = ["console"]) {
    const reportPaths = {};

    for (const format of formats) {
      const reporter = this.getReporter(format);
      if (reporter) {
        try {
          const output = await reporter.reportResults(results);
          if (typeof output === "string" && format !== "console") {
            reportPaths[format] = output;
          }
        } catch (error) {
          console.error(`Error generating ${format} report:`, error);
        }
      }
    }

    return reportPaths;
  }
}

module.exports = {
  ConsoleReporter,
  JSONReporter,
  CSVReporter,
  HTMLReporter,
  ReporterManager,
};
