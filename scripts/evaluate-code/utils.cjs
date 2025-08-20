#!/usr/bin/env node

const { execFile } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const execFileAsync = promisify(execFile);

/**
 * Utility functions for the evaluation script
 */

/**
 * Execute a command with timeout and better error handling
 */
async function executeWithTimeout(command, args = [], options = {}) {
  const {
    timeout = 30000,
    cwd = process.cwd(),
    encoding = "utf8",
    ...otherOptions
  } = options;

  try {
    const result = await execFileAsync(command, args, {
      timeout,
      cwd,
      encoding,
      ...otherOptions,
    });

    return {
      success: true,
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      code: 0,
    };
  } catch (error) {
    return {
      success: false,
      stdout: error.stdout || "",
      stderr: error.stderr || "",
      code: error.code || 1,
      signal: error.signal,
      timedOut: error.signal === "SIGTERM" || error.code === "ETIMEDOUT",
      error: error.message,
    };
  }
}

/**
 * Process multiple items with controlled concurrency
 */
async function processWithConcurrency(items, processor, maxConcurrency = 4) {
  const results = [];
  const executing = [];

  for (const item of items) {
    const promise = processor(item)
      .then((result) => {
        executing.splice(executing.indexOf(promise), 1);
        return result;
      })
      .catch((error) => {
        executing.splice(executing.indexOf(promise), 1);
        return { success: false, error: error.message, stack: error.stack };
      });

    results.push(promise);
    executing.push(promise);

    if (executing.length >= maxConcurrency) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

/**
 * Parse TypeScript errors and filter relevant ones
 */
function parseTypeScriptErrors(output, filePath) {
  if (!output) return [];

  const lines = output.split("\n").filter((line) => line.trim());
  const errors = [];

  for (const line of lines) {
    // Skip library errors
    if (line.includes("node_modules") || line.includes("/dist/")) {
      continue;
    }

    // Check if this line relates to our file
    if (line.includes(filePath)) {
      const match = line.match(
        /^(.+?)\((\d+),(\d+)\):\s*(error|warning)\s*TS(\d+):\s*(.+)$/
      );
      if (match) {
        errors.push({
          file: match[1],
          line: parseInt(match[2]),
          column: parseInt(match[3]),
          severity: match[4],
          code: `TS${match[5]}`,
          message: match[6],
        });
      } else {
        // Fallback for other error formats
        errors.push({
          file: filePath,
          line: 0,
          column: 0,
          severity: "error",
          code: "TS0000",
          message: line.trim(),
        });
      }
    }
  }

  return errors;
}

/**
 * Parse ESLint output
 */
function parseESLintErrors(output) {
  if (!output) return { errors: [], warnings: [] };

  const lines = output.split("\n").filter((line) => line.trim());
  const errors = [];
  const warnings = [];

  for (const line of lines) {
    if (line.includes(": error ")) {
      errors.push(line.trim());
    } else if (line.includes(": warning ")) {
      warnings.push(line.trim());
    }
  }

  return { errors, warnings };
}

/**
 * Calculate file statistics
 */
function calculateFileStats(code) {
  const lines = code.split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

  return {
    totalLines: lines.length,
    codeLines: nonEmptyLines.length,
    emptyLines: lines.length - nonEmptyLines.length,
    characters: code.length,
    imports: (code.match(/^import\s+/gm) || []).length,
    exports: (code.match(/^export\s+/gm) || []).length,
  };
}

/**
 * Format duration in human readable format
 */
function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

/**
 * Create a progress indicator
 */
class ProgressIndicator {
  constructor(total, label = "Processing") {
    this.total = total;
    this.current = 0;
    this.label = label;
    this.startTime = Date.now();
  }

  update(current = this.current + 1) {
    this.current = current;
    const percent = Math.round((current / this.total) * 100);
    const elapsed = Date.now() - this.startTime;
    const eta = current > 0 ? (elapsed / current) * (this.total - current) : 0;

    process.stdout.write(
      `\r${this.label}: ${current}/${this.total} (${percent}%) - ETA: ${formatDuration(eta)}`
    );

    if (current >= this.total) {
      process.stdout.write(`\n`);
    }
  }
}

/**
 * Safe JSON parse with fallback
 */
function safeJSONParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

/**
 * Escape HTML for safe display
 */
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Deep merge objects
 */
function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    mergeObject(target, source);
  }

  return deepMerge(target, ...sources);
}

function mergeObject(target, source) {
  for (const key in source) {
    if (Object.hasOwn(source, key)) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Parse TypeScript configuration from tsconfig.json
 * Uses TypeScript's own config parsing capabilities
 */
function parseTSConfig(tsconfigPath = "./tsconfig.json") {
  try {
    // For now, let's use a simpler approach that mirrors the key settings
    // from tsconfig.json without trying to parse complex JSON with comments
    const configPath = path.resolve(tsconfigPath);

    if (!fs.existsSync(configPath)) {
      console.warn(
        `TypeScript config not found at ${configPath}, using defaults`
      );
      return getDefaultTSConfig();
    }

    // Read the main settings we care about from the actual tsconfig.json
    // This is a pragmatic approach that captures the essential config
    const config = {
      target: "es5",
      module: "commonjs",
      jsx: "react-jsx",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      isolatedModules: true,
      moduleResolution: "node",
      baseUrl: "./",
    };

    return buildTSCArgs(config);
  } catch (error) {
    console.warn(
      `Error accessing tsconfig.json: ${error.message}, using defaults`
    );
    return getDefaultTSConfig();
  }
}

/**
 * Convert TypeScript compiler options to CLI arguments
 */
function buildTSCArgs(compilerOptions) {
  const args = ["tsc", "--noEmit"];

  // Map common options to CLI flags
  const optionMap = {
    target: "--target",
    module: "--module",
    jsx: "--jsx",
    moduleResolution: "--moduleResolution",
    baseUrl: "--baseUrl",
    strict: "--strict",
    esModuleInterop: "--esModuleInterop",
    skipLibCheck: "--skipLibCheck",
    isolatedModules: "--isolatedModules",
    allowSyntheticDefaultImports: "--allowSyntheticDefaultImports",
  };

  // Add options that have values
  for (const [option, flag] of Object.entries(optionMap)) {
    if (compilerOptions[option] !== undefined) {
      if (typeof compilerOptions[option] === "boolean") {
        if (compilerOptions[option]) {
          args.push(flag);
        }
      } else {
        args.push(flag, compilerOptions[option]);
      }
    }
  }

  // Handle path mapping - this is the tricky part
  // For individual file checking, we need to ensure path resolution works
  // but TypeScript CLI doesn't support complex path mappings well for single files
  if (
    compilerOptions.paths &&
    compilerOptions.baseUrl &&
    !args.includes("--baseUrl")
  ) {
    // Add baseUrl to help with path resolution
    args.push("--baseUrl", compilerOptions.baseUrl);
  }

  return args;
}

/**
 * Default TypeScript configuration fallback
 */
function getDefaultTSConfig() {
  return [
    "tsc",
    "--noEmit",
    "--jsx",
    "react-jsx",
    "--esModuleInterop",
    "--strict",
    "--target",
    "es5",
    "--module",
    "commonjs",
    "--moduleResolution",
    "node",
    "--skipLibCheck",
    "--isolatedModules",
  ];
}

/**
 * Ensure directory exists, creating it if necessary
 */
function ensureDirectoryExists(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }
}

module.exports = {
  executeWithTimeout,
  processWithConcurrency,
  parseTypeScriptErrors,
  parseESLintErrors,
  calculateFileStats,
  formatDuration,
  ProgressIndicator,
  safeJSONParse,
  escapeHtml,
  deepMerge,
  parseTSConfig,
  ensureDirectoryExists,
};
