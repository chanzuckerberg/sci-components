#!/usr/bin/env node

/**
 * Configuration for the code evaluation script
 */

let sdsComponentsCache = null;

/**
 * Auto-discover SDS components from the package exports
 */
function discoverSDSComponents() {
  if (sdsComponentsCache) {
    return sdsComponentsCache;
  }

  try {
    // For now, fall back to a comprehensive list that we'll maintain
    // In a real implementation, we could parse the export statements
    sdsComponentsCache = [
      // Core UI Components
      "Button",
      "ButtonIcon",
      "ButtonToggle",
      "ButtonDropdown",

      // Input Components
      "InputText",
      "InputSearch",
      "InputDropdown",
      "InputRadio",
      "InputCheckbox",
      "InputSlider",
      "InputToggle",
      "Autocomplete",

      // Table Components
      "Table",
      "TableHeader",
      "TableRow",
      "TableCell",

      // Display Components
      "Alert",
      "Callout",
      "Dialog",
      "DialogActions",
      "DialogContent",
      "DialogTitle",
      "Icon",
      "Tag",
      "Chip",
      "Tooltip",
      "Badge",
      "Divider",
      "Typography",

      // Layout Components
      "Accordion",
      "AccordionSummary",
      "AccordionDetails",
      "Tabs",
      "Tab",
      "TabPanel",
      "Menu",
      "MenuItem",
      "MenuDivider",

      // Form Components
      "FormControl",
      "FormLabel",
      "FormHelperText",
      "FieldSet",

      // Loading Components
      "CircularProgress",
      "LinearProgress",
      "Skeleton",
    ];

    return sdsComponentsCache;
  } catch (error) {
    console.warn("Could not auto-discover SDS components, using fallback list");
    return sdsComponentsCache || [];
  }
}

const EVALUATION_CONFIG = {
  // Scoring weights - must sum to 1.0 (TypeScript is now a pass/fail requirement, see typescriptRequired)
  // Note: Accessibility is now checked by ESLint's jsx-a11y plugin (included in eslint score)
  weights: {
    sdsUsage: 0.5, // Primary goal: proper SDS component usage (increased from 0.4)
    eslint: 0.4, // Code quality, style, and accessibility via jsx-a11y (increased from 0.3)
    designTokens: 0.1, // Design consistency when styling needed (decreased from 0.2)
  },
  // TypeScript is a pass/fail requirement (not weighted)
  typescriptRequired: true,

  // Grade thresholds
  gradeThresholds: {
    A: 0.9,
    B: 0.8,
    C: 0.7,
    D: 0.6,
    F: 0.0,
  },

  // SDS components to check for
  get sdsComponents() {
    return discoverSDSComponents();
  },

  // Design token patterns to look for
  designTokenPatterns: [
    /tokens\.\w+/g,
    /theme\.\w+/g,
    /@czi-sds.*tokens/g,
    /getColors\(/g,
    /getSpaces\(/g,
    /fontBody\w*/g,
    /fontHeader\w*/g,
  ],

  // Note: Accessibility patterns are now handled by ESLint's jsx-a11y plugin

  // TypeScript compiler options
  typescriptOptions: {
    noEmit: true,
    jsx: "react-jsx",
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    strict: false, // Be lenient for generated code
    target: "ES2020",
    lib: ["ES2020", "DOM"],
  },

  // ESLint options
  eslintOptions: {
    format: "compact",
    fix: false,
    cache: false,
  },

  // File processing options
  processing: {
    timeout: 30000, // 30 second timeout for each tool
    maxConcurrency: 4, // Max parallel file processing
    supportedExtensions: [".tsx", ".ts", ".jsx", ".js"],
  },

  // Output options
  output: {
    enableColors: true,
    verbose: false,
    exportCSV: true,
    exportJSON: true,
    generateHTMLReport: false,
  },
};

// Validation
function validateConfig() {
  const totalWeight = Object.values(EVALUATION_CONFIG.weights).reduce(
    (sum, w) => sum + w,
    0
  );

  if (Math.abs(totalWeight - 1.0) > 0.001) {
    throw new Error(
      `Evaluation weights (excluding pass/fail checks) must sum to 1.0, got ${totalWeight}`
    );
  }

  if (EVALUATION_CONFIG.sdsComponents.length === 0) {
    console.warn("Warning: No SDS components found in configuration");
  }
}

// Validate on load
validateConfig();

module.exports = {
  EVALUATION_CONFIG,
  discoverSDSComponents,
  validateConfig,
};
