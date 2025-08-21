#!/usr/bin/env node

const {
  executeWithTimeout,
  parseTypeScriptErrors,
  parseESLintErrors,
  parseTSConfig,
} = require("./utils.cjs");
const { EVALUATION_CONFIG } = require("./config.cjs");

/**
 * Plugin architecture for extensible code evaluation
 * Each plugin implements a check method that returns evaluation results
 */

class BasePlugin {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  async check(_filePath, _code, _context = {}) {
    throw new Error(`Plugin ${this.name} must implement check() method`);
  }
}

/**
 * TypeScript Compilation Plugin
 */
class TypeScriptPlugin extends BasePlugin {
  constructor() {
    super("typescript", "Checks TypeScript compilation without errors");
    // Parse tsconfig.json once during initialization for better performance
    this.tscArgs = parseTSConfig("./tsconfig.json");
  }

  async check(filePath, _code) {
    const startTime = Date.now();

    // Use dynamically parsed tsconfig.json settings
    const tscArgs = [...this.tscArgs, filePath];

    const result = await executeWithTimeout("npx", tscArgs, {
      timeout: EVALUATION_CONFIG.processing.timeout,
    });

    const errors = result.success
      ? []
      : parseTypeScriptErrors(result.stdout + result.stderr, filePath);
    const userErrors = errors.filter(
      (err) => !err.message.includes("node_modules")
    );

    return {
      name: this.name,
      passed: userErrors.length === 0,
      score: userErrors.length === 0 ? 1 : 0,
      duration: Date.now() - startTime,
      details: {
        totalErrors: errors.length,
        userErrors: userErrors.length,
        libraryErrors: errors.length - userErrors.length,
        errors: userErrors.slice(0, 5), // Limit for output
        timedOut: result.timedOut,
      },
    };
  }
}

/**
 * ESLint Plugin
 */
class ESLintPlugin extends BasePlugin {
  constructor() {
    super("eslint", "Checks ESLint compliance");
  }

  async check(filePath, _code) {
    const startTime = Date.now();

    const eslintArgs = [
      "eslint",
      filePath,
      "--format",
      EVALUATION_CONFIG.eslintOptions.format,
      "--no-cache",
    ];

    const result = await executeWithTimeout("npx", eslintArgs, {
      timeout: EVALUATION_CONFIG.processing.timeout,
    });

    const parsed = parseESLintErrors(result.stdout + result.stderr);

    return {
      name: this.name,
      passed: parsed.errors.length === 0,
      score:
        parsed.errors.length === 0
          ? 1
          : Math.max(0, 1 - parsed.errors.length * 0.2),
      duration: Date.now() - startTime,
      details: {
        errorCount: parsed.errors.length,
        warningCount: parsed.warnings.length,
        errors: parsed.errors.slice(0, 5),
        warnings: parsed.warnings.slice(0, 3),
        timedOut: result.timedOut,
      },
    };
  }
}

/**
 * SDS Component Usage Plugin
 */
class SDSUsagePlugin extends BasePlugin {
  constructor() {
    super("sdsUsage", "Checks for proper SDS component usage");
  }

  async check(_filePath, code) {
    const startTime = Date.now();
    const sdsComponents = EVALUATION_CONFIG.sdsComponents;
    const foundComponents = [];
    const genericElements = [];

    // Find SDS components used
    for (const component of sdsComponents) {
      const regex = new RegExp(`<${component}[\\s>]`, "g");
      if (regex.test(code)) {
        foundComponents.push(component);
      }
    }

    // Find generic elements that could be replaced
    const genericPattern = /<(div|span|input|button|form|img|a)[^>]*>/gi;
    let match;
    while ((match = genericPattern.exec(code)) !== null) {
      const element = match[1].toLowerCase();
      if (!genericElements.includes(element)) {
        genericElements.push(element);
      }
    }

    const hasSDS = foundComponents.length > 0;
    const score = hasSDS ? 1.0 : 0;

    return {
      name: this.name,
      passed: hasSDS,
      score,
      duration: Date.now() - startTime,
      details: {
        sdsComponentsFound: foundComponents,
        sdsComponentCount: foundComponents.length,
        genericElements,
        genericElementCount: genericElements.length,
        recommendations: this.generateRecommendations(genericElements),
      },
    };
  }

  generateRecommendations(genericElements) {
    const recommendations = [];
    const elementMap = {
      button: "Consider using SDS Button component",
      input: "Consider using SDS InputText, InputSearch, or InputDropdown",
      div: "Consider if this should be a layout component or use SDS containers",
      span: "Consider using SDS Typography component",
    };

    for (const element of genericElements) {
      if (elementMap[element]) {
        recommendations.push(elementMap[element]);
      }
    }

    return recommendations;
  }
}

/**
 * Design Tokens Plugin
 */
class DesignTokensPlugin extends BasePlugin {
  constructor() {
    super(
      "designTokens",
      "Checks for design token usage when custom styling is present"
    );
  }

  async check(_filePath, code) {
    const startTime = Date.now();
    const patterns = EVALUATION_CONFIG.designTokenPatterns;
    const foundTokens = [];

    for (const pattern of patterns) {
      const matches = code.match(pattern);
      if (matches) {
        foundTokens.push(...matches);
      }
    }

    const uniqueTokens = [...new Set(foundTokens)];
    const usesTokens = uniqueTokens.length > 0;

    // Check if custom styling is present
    const hasCustomStyling = this.hasCustomStyling(code);

    // If no custom styling is detected, design tokens are not required
    const isRequired = hasCustomStyling;
    const passed = usesTokens || !isRequired;

    // Score: full points if not required, or if tokens are used when required
    let score = 1;
    if (isRequired && !usesTokens) {
      score = 0;
    }

    return {
      name: this.name,
      passed,
      score,
      duration: Date.now() - startTime,
      details: {
        usesTokens,
        isRequired,
        hasCustomStyling,
        tokenCount: uniqueTokens.length,
        tokensFound: uniqueTokens.slice(0, 10),
        message: isRequired
          ? usesTokens
            ? "Uses design tokens for custom styling"
            : "Custom styling detected but no design tokens used"
          : "No custom styling detected - design tokens not required",
        recommendations: this.generateTokenRecommendations(
          code,
          hasCustomStyling,
          usesTokens
        ),
      },
    };
  }

  hasCustomStyling(code) {
    // Remove comments and string literals to avoid false positives
    const sanitizedCode = this.stripCommentsAndStrings(code);

    const customStylingPatterns = [
      /style\s*=\s*\{/, // style={{ ... }}
      /\bstyled\s*\(/, // styled(Component)
      /styled\.\w+/, // styled.div
      /css`/, // css template literals
      /makeStyles/, // Material-UI makeStyles
      /useStyles/, // Material-UI useStyles
      /createStyles/, // Material-UI createStyles
      /backgroundColor\s*:/, // Direct color usage
      /color\s*:\s*["'#]/, // Direct color usage
      /padding\s*:\s*["'\d]/, // Direct spacing usage
      /margin\s*:\s*["'\d]/, // Direct spacing usage
      /fontSize\s*:\s*["'\d]/, // Direct font size usage
      /fontWeight\s*:\s*["'\d]/, // Direct font weight usage
    ];

    return customStylingPatterns.some((pattern) => pattern.test(sanitizedCode));
  }

  /**
   * Strip comments and string literals from code to avoid false positives in regex matching
   * @param {string} code - The source code to sanitize
   * @returns {string} - Code with comments and strings removed
   */
  stripCommentsAndStrings(code) {
    let result = "";
    let i = 0;
    const state = {
      inString: false,
      stringChar: "",
      inComment: false,
      inBlockComment: false,
      inTemplateLiteral: false,
    };

    while (i < code.length) {
      const char = code[i];
      const nextChar = code[i + 1] || "";

      const charToAdd = this.processCharacter(char, nextChar, state, i);
      if (charToAdd !== null) {
        result += charToAdd;
      }
      i++;
    }

    return result;
  }

  processCharacter(char, nextChar, state, _index) {
    // Handle template literals
    if (this.isTemplateLiteralStart(char, state)) {
      state.inTemplateLiteral = !state.inTemplateLiteral;
      return null;
    }

    // Handle quotes
    if (this.isQuote(char, state)) {
      this.handleQuote(char, state);
      return null;
    }

    // Handle comments
    if (this.isCommentStart(char, nextChar, state)) {
      this.handleCommentStart(char, nextChar, state);
      return null;
    }

    // Handle comment endings
    if (this.isCommentEnd(char, nextChar, state)) {
      this.handleCommentEnd(char, nextChar, state);
      return null;
    }

    // End line comments at newline
    if (char === "\n" && state.inComment) {
      state.inComment = false;
    }

    // Only add characters that are not in strings, comments, or template literals
    return this.shouldSkipCharacter(state) ? null : char;
  }

  isTemplateLiteralStart(char, state) {
    return (
      char === "`" &&
      !state.inString &&
      !state.inComment &&
      !state.inBlockComment
    );
  }

  isQuote(char, state) {
    return (
      (char === '"' || char === "'") &&
      !state.inTemplateLiteral &&
      !state.inComment &&
      !state.inBlockComment
    );
  }

  handleQuote(char, state) {
    if (!state.inString) {
      state.inString = true;
      state.stringChar = char;
    } else if (state.stringChar === char) {
      state.inString = false;
      state.stringChar = "";
    }
  }

  isCommentStart(char, nextChar, state) {
    return (
      char === "/" &&
      nextChar === "/" &&
      !state.inString &&
      !state.inTemplateLiteral &&
      !state.inBlockComment
    );
  }

  handleCommentStart(char, nextChar, state) {
    if (char === "/" && nextChar === "/") {
      state.inComment = true;
    } else if (char === "/" && nextChar === "*") {
      state.inBlockComment = true;
    }
  }

  isCommentEnd(char, nextChar, state) {
    return char === "*" && nextChar === "/" && state.inBlockComment;
  }

  handleCommentEnd(char, nextChar, state) {
    if (char === "*" && nextChar === "/") {
      state.inBlockComment = false;
    }
  }

  shouldSkipCharacter(state) {
    return (
      state.inString ||
      state.inComment ||
      state.inBlockComment ||
      state.inTemplateLiteral
    );
  }

  generateTokenRecommendations(code, hasCustomStyling, usesTokens) {
    const recommendations = [];

    if (hasCustomStyling && !usesTokens) {
      recommendations.push(
        "Consider using SDS design tokens for consistent styling"
      );

      if (/backgroundColor\s*:|color\s*:\s*["'#]/.test(code)) {
        recommendations.push(
          "Use getColors() for color values instead of hardcoded colors"
        );
      }

      if (/padding\s*:|margin\s*:/.test(code)) {
        recommendations.push(
          "Use getSpaces() for spacing values instead of hardcoded measurements"
        );
      }

      if (/fontSize\s*:|fontWeight\s*:/.test(code)) {
        recommendations.push(
          "Use typography mixins (fontBodyS, fontHeaderM, etc.) for consistent text styling"
        );
      }
    }

    return recommendations;
  }
}

/**
 * Plugin Manager
 */
class PluginManager {
  constructor(plugins = []) {
    this.plugins = new Map();

    // Register default plugins
    this.registerPlugin(new TypeScriptPlugin());
    this.registerPlugin(new ESLintPlugin());
    this.registerPlugin(new SDSUsagePlugin());
    this.registerPlugin(new DesignTokensPlugin());

    // Register any additional plugins
    plugins.forEach((plugin) => this.registerPlugin(plugin));
  }

  registerPlugin(plugin) {
    if (!(plugin instanceof BasePlugin)) {
      throw new Error("Plugin must extend BasePlugin");
    }
    this.plugins.set(plugin.name, plugin);
  }

  getPlugin(name) {
    return this.plugins.get(name);
  }

  getAllPlugins() {
    return Array.from(this.plugins.values());
  }

  async runAllChecks(filePath, code, context = {}) {
    const results = await Promise.all(
      this.getAllPlugins().map((plugin) =>
        plugin.check(filePath, code, context).catch((error) => ({
          name: plugin.name,
          passed: false,
          score: 0,
          duration: 0,
          error: error.message,
          stack: error.stack,
          details: { error: error.message, stack: error.stack },
        }))
      )
    );

    return results.reduce((acc, result) => {
      acc[result.name] = result;
      return acc;
    }, {});
  }
}

module.exports = {
  BasePlugin,
  TypeScriptPlugin,
  ESLintPlugin,
  SDSUsagePlugin,
  DesignTokensPlugin,
  PluginManager,
};
