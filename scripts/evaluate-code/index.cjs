#!/usr/bin/env node

const { readFileSync, readdirSync, statSync } = require("fs");
const path = require("path");

// Import our improved components
const { EVALUATION_CONFIG } = require("./config.cjs");
const { PluginManager } = require("./plugins.cjs");
const {
  processWithConcurrency,
  ProgressIndicator,
  formatDuration,
  calculateFileStats,
  deepMerge,
} = require("./utils.cjs");
const {
  ConsoleReporter,
  JSONReporter,
  CSVReporter,
  HTMLReporter,
  ReporterManager,
} = require("./reporters.cjs");
const { getSDSComponentsList } = require("./sds-discovery.cjs");

/**
 * Enhanced Code Evaluation Script v1.0
 *
 * Key features:
 * - Plugin architecture for extensible evaluations
 * - Parallel processing for better performance
 * - Enhanced error handling and timeout management
 * - Auto-discovery of SDS components
 * - Multiple output formats (Console, JSON, CSV, HTML)
 * - TypeScript compiler API integration
 * - Comprehensive testing framework
 */

class CodeEvaluator {
  constructor(options = {}) {
    // Deep merge configuration to preserve nested objects
    this.config = deepMerge(EVALUATION_CONFIG, options);
    this.pluginManager = new PluginManager();
    this.reporterManager = new ReporterManager();

    this.setupReporters();

    // Stats
    this.stats = {
      filesProcessed: 0,
      totalDuration: 0,
      startTime: Date.now(),
    };
  }

  setupReporters() {
    this.reporterManager.registerReporter(
      "console",
      new ConsoleReporter({
        enableColors: this.config.output.enableColors,
        verbose: this.config.output.verbose,
      })
    );

    this.reporterManager.registerReporter("json", new JSONReporter());
    this.reporterManager.registerReporter("csv", new CSVReporter());
    this.reporterManager.registerReporter("html", new HTMLReporter());
  }

  async evaluateFile(filePath) {
    const startTime = Date.now();

    try {
      // Read and analyze the file
      const code = readFileSync(filePath, "utf8");
      const fileStats = calculateFileStats(code);

      // Run all plugin checks
      const pluginResults = await this.pluginManager.runAllChecks(
        filePath,
        code,
        {
          fileStats,
          config: this.config,
        }
      );

      // Calculate overall score and grade
      const summary = this.calculateSummary(pluginResults, startTime);

      this.stats.filesProcessed++;
      this.stats.totalDuration += summary.totalDuration;

      return {
        filePath,
        pluginResults,
        summary,
        fileStats,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`❌ Error evaluating ${filePath}:`, error.message);

      return {
        filePath,
        pluginResults: {},
        summary: {
          score: 0,
          grade: "F",
          readyForReview: false,
          totalDuration: Date.now() - startTime,
          error: error.message,
        },
        fileStats: null,
        timestamp: new Date().toISOString(),
        error: error.message,
      };
    }
  }

  calculateSummary(pluginResults, startTime) {
    const weights = this.config.weights;
    let totalDuration = Date.now() - startTime;

    // Check for TypeScript compilation failure - automatic FAIL
    const typescriptResult = pluginResults.typescript;
    if (typescriptResult && !typescriptResult.passed) {
      return {
        score: 0,
        grade: "F",
        readyForReview: false,
        totalDuration,
        passedChecks: Object.values(pluginResults).filter((r) => r.passed)
          .length,
        totalChecks: Object.keys(pluginResults).length,
        failureReason:
          "TypeScript compilation failed - code must compile to pass evaluation",
      };
    }

    // If TypeScript passes, calculate weighted score from other checks
    let totalScore = 0;
    Object.entries(weights).forEach(([pluginName, weight]) => {
      // Skip pass/fail checks in weighted calculation
      if (pluginName === "typescript") return;

      const result = pluginResults[pluginName] || { score: 0 };
      totalScore += result.score * weight;
    });

    // Cap score at 1.0
    const finalScore = Math.min(totalScore, 1.0);

    // Determine grade
    const grade = this.getGrade(finalScore);

    // Determine if ready for review
    const readyForReview = finalScore >= 0.7;

    return {
      score: finalScore,
      grade,
      readyForReview,
      totalDuration,
      passedChecks: Object.values(pluginResults).filter((r) => r.passed).length,
      totalChecks: Object.keys(pluginResults).length,
    };
  }

  getGrade(score) {
    const thresholds = this.config.gradeThresholds;

    for (const [grade, threshold] of Object.entries(thresholds)) {
      if (score >= threshold) {
        return grade;
      }
    }

    return "F";
  }

  async evaluateBatch(directory) {
    // Find all supported files
    const files = this.findSupportedFiles(directory);

    if (files.length === 0) {
      console.log(`No supported files found in ${directory}`);
      return [];
    }

    console.log(`📁 Batch evaluation: ${files.length} files in ${directory}`);

    // Set up progress indicator
    const progress = new ProgressIndicator(files.length, "Evaluating files");

    // Process files with controlled concurrency
    return processWithConcurrency(
      files,
      async (file) => {
        const result = await this.evaluateFile(file);
        progress.update();
        return result;
      },
      this.config.processing.maxConcurrency
    );
  }

  findSupportedFiles(directory) {
    const files = [];
    const extensions = this.config.processing.supportedExtensions;

    const traverse = (dir) => {
      try {
        const entries = readdirSync(dir);

        for (const entry of entries) {
          const fullPath = path.join(dir, entry);
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            // Skip common directories that shouldn't contain source files
            if (
              !["node_modules", ".git", "dist", "build", "coverage"].includes(
                entry
              )
            ) {
              traverse(fullPath);
            }
          } else if (stat.isFile()) {
            const ext = path.extname(entry);
            if (extensions.includes(ext)) {
              files.push(fullPath);
            }
          }
        }
      } catch (error) {
        console.warn(
          `Warning: Could not read directory ${dir}: ${error.message}`
        );
      }
    };

    traverse(directory);
    return files.sort();
  }

  async generateReports(results, formats = ["console"]) {
    const reportPaths = {};
    const timestamp = this.generateTimestamp();

    for (const format of formats) {
      try {
        const outputPath = this.getOutputPath(format, timestamp);
        const reporter = this.reporterManager.getReporter(format);

        if (reporter) {
          await this.processReporter(
            reporter,
            format,
            results,
            outputPath,
            reportPaths
          );
        }
      } catch (error) {
        console.error(`Error generating ${format} report:`, error.message);
      }
    }

    return reportPaths;
  }

  generateTimestamp() {
    return new Date().toISOString().slice(0, 19).replace(/:/g, "-");
  }

  getOutputPath(format, timestamp) {
    const pathMap = {
      json: `evaluation-results-${timestamp}.json`,
      csv: `evaluation-results-${timestamp}.csv`,
      html: `evaluation-report-${timestamp}.html`,
    };
    return pathMap[format] || null;
  }

  async processReporter(reporter, format, results, outputPath, reportPaths) {
    if (format === "console") {
      this.processConsoleReporter(reporter, results);
    } else {
      await this.processFileReporter(
        reporter,
        results,
        outputPath,
        reportPaths,
        format
      );
    }
  }

  processConsoleReporter(reporter, results) {
    if (results.length === 1) {
      reporter.reportSingleFile(results[0]);
    } else {
      results.forEach((result) => reporter.reportSingleFile(result));
      reporter.reportBatchSummary(results);
    }
  }

  async processFileReporter(
    reporter,
    results,
    outputPath,
    reportPaths,
    format
  ) {
    if (outputPath) {
      reporter.outputPath = outputPath;
      reporter.reportResults(results);
      reportPaths[format] = outputPath;
      console.log(
        `\n📊 ${format.toUpperCase()} report generated: ${outputPath}`
      );
    }
  }

  displayQuickCopyPaste(results) {
    console.log("\n🎯 Quick Copy-Paste for Google Sheets:");
    console.log("File\tScore\tGrade\tReady\tTS\tSDS\tImports\tA11y");

    results.forEach((result) => {
      const score = (result.summary.score * 100).toFixed(0);
      const ts = result.pluginResults.typescript?.passed ? "1" : "0";
      const sds = result.pluginResults.sdsUsage?.passed ? "1" : "0";
      const imports = result.pluginResults.imports?.passed ? "1" : "0";
      const a11y = result.pluginResults.accessibility?.passed ? "1" : "0";

      console.log(
        `${path.basename(result.filePath)}\t${score}%\t${result.summary.grade}\t${result.summary.readyForReview ? 1 : 0}\t${ts}\t${sds}\t${imports}\t${a11y}`
      );
    });
  }

  displayFinalStats() {
    const totalTime = Date.now() - this.stats.startTime;
    console.log(`\n⏱️  Processing completed in ${formatDuration(totalTime)}`);
    console.log(`   Files processed: ${this.stats.filesProcessed}`);
    console.log(
      `   Average time per file: ${formatDuration(totalTime / this.stats.filesProcessed)}`
    );
  }

  displaySDSInfo() {
    const sdsInfo = getSDSComponentsList();

    console.log(`\n🎨 SDS Component Detection:`);
    console.log(
      `   Source: ${sdsInfo.source === "discovered" ? "✅ Auto-discovered" : "⚠️  Fallback list"}`
    );
    console.log(`   Components available: ${sdsInfo.components.length}`);
    console.log(`   Data viz components: ${sdsInfo.dataVizComponents.length}`);

    if (sdsInfo.discoveryInfo?.error) {
      console.log(`   Discovery note: ${sdsInfo.discoveryInfo.error}`);
    }
  }
}

function showHelp() {
  console.log("🔍 SDS Component Evaluation Script v1.0");
  console.log("=========================================");
  console.log("");
  console.log("Usage:");
  console.log(
    "  node scripts/evaluate-code/index.cjs <file>                    # Evaluate single file"
  );
  console.log(
    "  node scripts/evaluate-code/index.cjs --batch <directory>       # Evaluate all files in directory"
  );
  console.log(
    "  node scripts/evaluate-code/index.cjs --config <config-file>    # Use custom configuration"
  );
  console.log("");
  console.log("Options:");
  console.log(
    "  --format <formats>     Output formats: console,json,csv,html (comma-separated)"
  );
  console.log("  --verbose              Enable verbose output");
  console.log("  --no-colors            Disable colored output");
  console.log("  --concurrency <num>    Max parallel processing (default: 4)");
  console.log(
    "  --timeout <ms>         Timeout per tool in milliseconds (default: 30000)"
  );
  console.log("");
  console.log("Examples:");
  console.log("  yarn evaluate:code ./my-component.tsx");
  console.log("  yarn evaluate:batch ./generated-components/");
  console.log("  node scripts/evaluate-code/index.cjs ./my-component.tsx");
  console.log(
    "  node scripts/evaluate-code/index.cjs --batch ./generated-components/ --format json,html"
  );
  console.log(
    "  node scripts/evaluate-code/index.cjs --batch ./src --verbose --format console,csv"
  );
  console.log("");
  console.log("The script evaluates:");
  console.log("  ✅ TypeScript compilation (25%)");
  console.log("  ✅ ESLint compliance (15%)");
  console.log("  ✅ SDS component usage (25%)");
  console.log("  ✅ Import statements (15%)");
  console.log("  ✅ Design tokens (10%)");
  console.log("  ✅ Accessibility features (10%)");
  console.log("");
  console.log("Key features:");
  console.log("  🚀 Plugin architecture for extensibility");
  console.log("  ⚡ Parallel processing for better performance");
  console.log("  🎯 Auto-discovery of SDS components");
  console.log("  📊 Enhanced reporting (JSON, CSV, HTML)");
  console.log("  🔧 TypeScript compiler API integration");
  console.log("  🧪 Comprehensive test suite");
}

function parseArgs(args) {
  const options = {
    files: [],
    batch: false,
    batchDirectory: null,
    formats: ["console"],
    verbose: false,
    colors: true,
    concurrency: 4,
    timeout: 30000,
    config: null,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--help":
      case "-h":
        showHelp();
        process.exit(0);
        break;

      case "--batch":
        options.batch = true;
        options.batchDirectory = args[++i];
        break;

      case "--format":
        options.formats = args[++i].split(",").map((f) => f.trim());
        break;

      case "--verbose":
        options.verbose = true;
        break;

      case "--no-colors":
        options.colors = false;
        break;

      case "--concurrency":
        options.concurrency = parseInt(args[++i]) || 4;
        break;

      case "--timeout":
        options.timeout = parseInt(args[++i]) || 30000;
        break;

      case "--config":
        options.config = args[++i];
        break;

      default:
        if (!arg.startsWith("--")) {
          options.files.push(arg);
        }
        break;
    }
  }

  return options;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showHelp();
    return;
  }

  const options = parseArgs(args);

  // Create evaluator with custom options
  const evaluatorOptions = {
    output: {
      enableColors: options.colors,
      verbose: options.verbose,
    },
    processing: {
      maxConcurrency: options.concurrency,
      timeout: options.timeout,
    },
  };

  const evaluator = new CodeEvaluator(evaluatorOptions);

  // Show SDS component detection info in verbose mode
  if (options.verbose) {
    evaluator.displaySDSInfo();
  }

  try {
    let results = [];

    if (options.batch && options.batchDirectory) {
      // Batch evaluation
      results = await evaluator.evaluateBatch(options.batchDirectory);
    } else if (options.files.length > 0) {
      // Single file(s) evaluation
      results = await Promise.all(
        options.files.map((file) => evaluator.evaluateFile(file))
      );
    } else {
      console.error("❌ No files specified. Use --help for usage information.");
      process.exit(1);
    }

    if (results.length === 0) {
      console.log("No files were evaluated.");
      return;
    }

    // Generate reports
    const reportPaths = await evaluator.generateReports(
      results,
      options.formats
    );

    // Show quick copy-paste format for batch results
    if (results.length > 1 && options.formats.includes("console")) {
      evaluator.displayQuickCopyPaste(results);
    }

    // Show final statistics
    evaluator.displayFinalStats();

    // Show generated report paths
    const reportPathsList = Object.entries(reportPaths);
    if (reportPathsList.length > 0) {
      console.log("\n📁 Generated reports:");
      reportPathsList.forEach(([format, reportPath]) => {
        console.log(`   ${format.toUpperCase()}: ${reportPath}`);
      });
    }
  } catch (error) {
    console.error("❌ Evaluation failed:", error.message);

    if (options.verbose) {
      console.error(error.stack);
    }

    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { CodeEvaluator };
