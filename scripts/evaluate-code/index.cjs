#!/usr/bin/env node

const { execFile } = require("child_process");
const { writeFileSync, readFileSync, readdirSync } = require("fs");
const path = require("path");

/**
 * Quick & Dirty Code Evaluation Script for Hackathon
 *
 * Usage:
 *   node scripts/evaluate-code.js path/to/generated-component.tsx
 *   node scripts/evaluate-code.js --batch ./test-outputs/
 */

async function evaluateCode(filePath) {
  console.log(`\n🔍 Evaluating: ${filePath}`);
  console.log("=".repeat(50));

  const results = {
    filePath,
    compiles: false,
    lintPasses: false,
    usesSDS: false,
    hasImports: false,
    usesTokens: false,
    hasAccessibility: false,
    summary: {},
  };

  try {
    // Read the file
    const code = readFileSync(filePath, "utf8");

    // 1. TypeScript compilation check
    console.log("📝 Checking TypeScript compilation...");
    results.compiles = await checkTypeScript(filePath);
    console.log(
      `   ${results.compiles ? "✅" : "❌"} Compiles: ${results.compiles}`
    );

    // 2. ESLint check
    console.log("🔍 Running ESLint...");
    results.lintPasses = await checkESLint(filePath);
    console.log(
      `   ${results.lintPasses ? "✅" : "❌"} Lint passes: ${results.lintPasses}`
    );

    // 3. SDS component usage
    console.log("🎨 Checking SDS component usage...");
    results.usesSDS = checkSDSUsage(code);
    console.log(
      `   ${results.usesSDS ? "✅" : "❌"} Uses SDS components: ${results.usesSDS}`
    );

    // 4. Import check
    console.log("📦 Checking imports...");
    results.hasImports = checkImports(code);
    console.log(
      `   ${results.hasImports ? "✅" : "❌"} Has SDS imports: ${results.hasImports}`
    );

    // 5. Design tokens check
    console.log("🎯 Checking design tokens...");
    results.usesTokens = checkDesignTokens(code);
    console.log(
      `   ${results.usesTokens ? "✅" : "❌"} Uses design tokens: ${results.usesTokens}`
    );

    // 6. Accessibility check
    console.log("♿ Checking accessibility...");
    results.hasAccessibility = checkAccessibility(code);
    console.log(
      `   ${results.hasAccessibility ? "✅" : "❌"} Has accessibility: ${results.hasAccessibility}`
    );

    // 7. Component analysis
    console.log("🔬 Analyzing components...");
    const componentAnalysis = analyzeComponents(code);
    console.log(
      `   📊 SDS components found: ${componentAnalysis.sdsComponents.join(", ") || "None"}`
    );
    console.log(
      `   ⚠️  Generic elements: ${componentAnalysis.genericElements.join(", ") || "None"}`
    );

    // Calculate overall score
    const score = calculateScore(results);
    results.summary = {
      score: score,
      grade: getGrade(score),
      readyForReview: score >= 0.7,
    };

    console.log("\n📊 SUMMARY");
    console.log(`   Overall Score: ${(score * 100).toFixed(0)}%`);
    console.log(`   Grade: ${results.summary.grade}`);
    console.log(
      `   Ready for Review: ${results.summary.readyForReview ? "✅" : "❌"}`
    );
  } catch (error) {
    console.error(`❌ Error evaluating ${filePath}:`, error.message);
    results.error = error.message;
  }

  return results;
}

// TypeScript compilation check
async function checkTypeScript(filePath) {
  return new Promise((resolve) => {
    // Use a more robust TypeScript check with JSX support
    execFile(
      "npx",
      ["tsc", "--noEmit", "--jsx", "react-jsx", "--esModuleInterop", filePath],
      (error, stdout, stderr) => {
        if (error) {
          // TypeScript errors can go to either stdout or stderr, so check both
          const allOutput = stdout + stderr;
          const allLines = allOutput.split("\n").filter((line) => line.trim());

          console.log(`   🔍 Debug: Total output has ${allLines.length} lines`);

          // Filter out library-related errors and focus on user code errors
          const errorLines = allLines.filter(
            (line) =>
              line.trim() &&
              !line.includes("node_modules") &&
              !line.includes("packages/components/dist") &&
              (line.includes(filePath) ||
                line.includes(path.basename(filePath)))
          );
          const userErrorCount = errorLines.length;

          if (userErrorCount > 0) {
            console.log(
              `   💭 TS Errors: ${userErrorCount} issues in your code`
            );
            console.log(`   💭 First few user errors:`);
            errorLines
              .slice(0, 3)
              .forEach((line) => console.log(`      ${line.trim()}`));
            console.log(
              `   💭 Library errors: ${allLines.length - userErrorCount} (ignored)`
            );
          } else {
            console.log(
              `   💭 TS Errors: 0 issues in your code (library errors ignored)`
            );
          }

          resolve(userErrorCount === 0);
        } else {
          resolve(true);
        }
      }
    );
  });
}

// ESLint check
async function checkESLint(filePath) {
  return new Promise((resolve) => {
    execFile(
      "npx",
      ["eslint", filePath, "--format", "compact"],
      (error, stdout) => {
        if (error) {
          const errorCount = (stdout.match(/error/g) || []).length;
          const warningCount = (stdout.match(/warning/g) || []).length;
          console.log(
            `   💭 ESLint: ${errorCount} errors, ${warningCount} warnings`
          );
          resolve(errorCount === 0);
        } else {
          resolve(true);
        }
      }
    );
  });
}

// Check if uses SDS components
function checkSDSUsage(code) {
  const sdsComponents = [
    "Button",
    "ButtonIcon",
    "ButtonToggle",
    "InputText",
    "InputSearch",
    "InputDropdown",
    "InputRadio",
    "InputCheckbox",
    "Table",
    "TableHeader",
    "TableRow",
    "Alert",
    "Callout",
    "Dialog",
    "Icon",
    "Tag",
    "Chip",
    "Tooltip",
  ];

  return sdsComponents.some((component) => {
    const regex = new RegExp(`<${component}[\\s>]`, "g");
    return regex.test(code);
  });
}

// Check imports
function checkImports(code) {
  return code.includes("@czi-sds/components");
}

// Check design tokens usage
function checkDesignTokens(code) {
  const tokenPatterns = [/tokens\.\w+/g, /theme\.\w+/g, /@czi-sds.*tokens/g];

  return tokenPatterns.some((pattern) => pattern.test(code));
}

// Check accessibility
function checkAccessibility(code) {
  const accessibilityPatterns = [
    /aria-label/,
    /aria-describedby/,
    /aria-expanded/,
    /role=/,
    /alt=/,
    /<label/,
    /htmlFor=/,
  ];

  return accessibilityPatterns.some((pattern) => pattern.test(code));
}

// Analyze components used
function analyzeComponents(code) {
  const sdsComponents = [];
  const genericElements = [];

  // Find SDS components
  const sdsPattern =
    /<(Button|Input\w+|Table\w*|Alert|Dialog|Icon|Tag|Chip|Tooltip)[^>]*>/g;
  let match;
  while ((match = sdsPattern.exec(code)) !== null) {
    if (!sdsComponents.includes(match[1])) {
      sdsComponents.push(match[1]);
    }
  }

  // Find generic elements (potential missed opportunities)
  const genericPattern = /<(div|span|input|button)[^>]*>/g;
  while ((match = genericPattern.exec(code)) !== null) {
    if (!genericElements.includes(match[1])) {
      genericElements.push(match[1]);
    }
  }

  return { sdsComponents, genericElements };
}

// Calculate overall score
function calculateScore(results) {
  const weights = {
    compiles: 0.25, // Must work
    usesSDS: 0.25, // Must use design system
    hasImports: 0.2, // Proper setup
    lintPasses: 0.15, // Code quality
    usesTokens: 0.05, // Design consistency (optional, reduced)
    hasAccessibility: 0.1, // User experience
  };

  let score = 0;
  Object.keys(weights).forEach((key) => {
    if (results[key]) {
      score += weights[key];
    }
  });

  // Cap the score at 100%
  return Math.min(score, 1.0);
}

// Convert score to grade
function getGrade(score) {
  if (score >= 0.9) return "A";
  if (score >= 0.8) return "B";
  if (score >= 0.7) return "C";
  if (score >= 0.6) return "D";
  return "F";
}

// Export to CSV for Google Sheets
function exportToCSV(results) {
  const csvHeader =
    "File,Compiles,Uses SDS,Has Imports,Lint Passes,Uses Tokens,Has A11y,Score,Grade,Ready\n";

  const csvRows = results.map((r) => {
    return [
      r.filePath,
      r.compiles ? "✅" : "❌",
      r.usesSDS ? "✅" : "❌",
      r.hasImports ? "✅" : "❌",
      r.lintPasses ? "✅" : "❌",
      r.usesTokens ? "✅" : "❌",
      r.hasAccessibility ? "✅" : "❌",
      (r.summary?.score * 100).toFixed(0) + "%",
      r.summary?.grade || "F",
      r.summary?.readyForReview ? "✅" : "❌",
    ].join(",");
  });

  const csvContent = csvHeader + csvRows.join("\n");
  const fileName = `evaluation-results-${new Date().toISOString().slice(0, 10)}.csv`;
  writeFileSync(fileName, csvContent);
  console.log(`\n📊 Results exported to: ${fileName}`);
  console.log(`   Import this into Google Sheets for tracking!`);
}

// Display help information
function showHelp() {
  console.log("🔍 SDS Component Evaluation Script");
  console.log("=====================================");
  console.log("");
  console.log("Usage:");
  console.log(
    "  yarn evaluate:code <file>                    # Evaluate single file"
  );
  console.log(
    "  yarn evaluate:batch <directory>             # Evaluate all .tsx/.ts files in directory"
  );
  console.log(
    "  node scripts/evaluate-code/index.cjs <file>        # Direct execution"
  );
  console.log(
    "  node scripts/evaluate-code/index.cjs --batch <dir> # Batch execution"
  );
  console.log("");
  console.log("Examples:");
  console.log("  yarn evaluate:code ./my-component.tsx");
  console.log("  yarn evaluate:batch ./generated-components/");
  console.log("  node scripts/evaluate-code/index.cjs ./my-component.tsx");
  console.log("  node scripts/evaluate-code/index.cjs --batch ./test-outputs/");
  console.log("");
  console.log("The script evaluates:");
  console.log("  ✅ TypeScript compilation");
  console.log("  ✅ ESLint compliance");
  console.log("  ✅ SDS component usage");
  console.log("  ✅ Import statements");
  console.log("  ✅ Design tokens");
  console.log("  ✅ Accessibility features");
  console.log("");
  console.log("For more details, see: scripts/README.md");
  process.exit(0);
}

// Process batch evaluation
async function processBatch(directory) {
  const files = readdirSync(directory)
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
    .map((file) => path.join(directory, file));

  console.log(`📁 Batch evaluation: ${files.length} files`);

  const results = [];
  for (const file of files) {
    const result = await evaluateCode(file);
    results.push(result);
  }
  return results;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    showHelp();
  }

  const results =
    args[0] === "--batch" && args[1]
      ? await processBatch(args[1])
      : [await evaluateCode(args[0])];

  // Export results
  if (results.length > 1) {
    exportToCSV(results);
  }

  console.log("\n🎯 Quick Copy-Paste for Google Sheets:");
  results.forEach((r) => {
    const score = (r.summary?.score * 100 || 0).toFixed(0);
    console.log(
      `${r.filePath}\t${r.compiles ? 1 : 0}\t${r.usesSDS ? 1 : 0}\t${r.hasImports ? 1 : 0}\t${score}%\t${r.summary?.grade || "F"}`
    );
  });
}

main().catch(console.error);
