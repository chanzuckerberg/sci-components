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
      "--cache",
      "false",
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
    const customStylingPatterns = [
      /style\s*=\s*\{/, // style={{ ... }}
      /\bstyled\s*\(/, // styled(Component) - improved to avoid matching in strings/comments
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

    return customStylingPatterns.some((pattern) => pattern.test(code));
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
 * Accessibility Plugin
 */
class AccessibilityPlugin extends BasePlugin {
  constructor() {
    super("accessibility", "Checks for accessibility attributes and patterns");
  }

  async check(_filePath, code) {
    const startTime = Date.now();
    const patterns = EVALUATION_CONFIG.accessibilityPatterns;
    const foundAttributes = [];

    for (const pattern of patterns) {
      const matches = code.match(pattern);
      if (matches) {
        foundAttributes.push(...matches);
      }
    }

    const uniqueAttributes = [...new Set(foundAttributes)];
    const hasAccessibility = uniqueAttributes.length > 0;

    // Additional semantic checks
    const hasSemanticElements =
      /<(main|nav|section|article|aside|header|footer|h[1-6])/i.test(code);
    const hasFormLabels = /<label/i.test(code) || /htmlFor=/i.test(code);
    const hasAltText = /alt=/i.test(code);

    const score = hasAccessibility ? 1.0 : 0;

    return {
      name: this.name,
      passed: hasAccessibility,
      score,
      duration: Date.now() - startTime,
      details: {
        hasAccessibility,
        attributeCount: uniqueAttributes.length,
        attributesFound: uniqueAttributes,
        hasSemanticElements,
        hasFormLabels,
        hasAltText,
        recommendations: this.generateA11yRecommendations(code),
      },
    };
  }

  generateA11yRecommendations(code) {
    const recommendations = [];

    if (/<button/i.test(code) && !/aria-label/i.test(code)) {
      recommendations.push(
        "Consider adding aria-label to buttons for screen readers"
      );
    }

    if (
      /<input/i.test(code) &&
      !/<label/i.test(code) &&
      !/aria-label/i.test(code)
    ) {
      recommendations.push(
        "Consider adding labels or aria-label to input fields"
      );
    }

    if (/<img/i.test(code) && !/alt=/i.test(code)) {
      recommendations.push("Add alt text to images for accessibility");
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
    this.registerPlugin(new AccessibilityPlugin());

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
  AccessibilityPlugin,
  PluginManager,
};
