#!/usr/bin/env node

const path = require("path");
const { readFileSync } = require("fs");

/**
 * Auto-discovery of SDS components from the actual package exports
 * This provides a more accurate and up-to-date list of available components
 */

/**
 * Extract component names from TypeScript export statements
 */
function extractComponentsFromExports(code) {
  const components = new Set();

  // Match named exports: export { Button, InputText, ... } from './components';
  const namedExportRegex =
    /export\s*\{\s*([^}]+)\s*\}(?:\s*from\s*['"'][^'"]*['"])?/g;
  let match;
  while ((match = namedExportRegex.exec(code)) !== null) {
    const names = match[1].split(",").map((name) =>
      name
        .trim()
        .split(/\s+as\s+/)[0]
        .trim()
    );
    names.forEach((name) => {
      if (name && isComponentName(name)) {
        components.add(name);
      }
    });
  }

  // Match individual exports: export const Button = ...
  const individualExportRegex = /export\s+(?:const|function|class)\s+(\w+)/g;
  while ((match = individualExportRegex.exec(code)) !== null) {
    const name = match[1];
    if (isComponentName(name)) {
      components.add(name);
    }
  }

  // Match re-exports: export * from './Button';
  const reExportRegex = /export\s*\*\s*from\s*['"']\.\/(\w+)['"]/g;
  while ((match = reExportRegex.exec(code)) !== null) {
    const name = match[1];
    if (isComponentName(name)) {
      components.add(name);
    }
  }

  return Array.from(components);
}

/**
 * Check if a name looks like a React component (starts with uppercase)
 */
function isComponentName(name) {
  return (
    /^[A-Z][a-zA-Z0-9]*$/.test(name) &&
    name.length > 1 &&
    !name.startsWith("_") &&
    // Exclude common non-component exports
    !["API", "URL", "CSS", "HTML", "JSON", "XML", "DOM"].includes(name)
  );
}

/**
 * Discover SDS components from the components package
 */
function discoverSDSComponents() {
  const discoveryResults = {
    components: [],
    dataVizComponents: [],
    error: null,
    sources: [],
  };

  try {
    // Try to find the components package
    const componentsPath = path.resolve(__dirname, "../../packages/components");

    // Check main export file
    const mainExportPaths = [
      path.join(componentsPath, "src/index.ts"),
      path.join(componentsPath, "src/index.tsx"),
      path.join(componentsPath, "dist/index.d.ts"),
      path.join(componentsPath, "dist/index.js"),
    ];

    for (const exportPath of mainExportPaths) {
      try {
        const exportCode = readFileSync(exportPath, "utf8");
        const components = extractComponentsFromExports(exportCode);

        if (components.length > 0) {
          discoveryResults.components.push(...components);
          discoveryResults.sources.push(exportPath);
          break;
        }
      } catch (error) {
        // Try next path
        continue;
      }
    }

    // Try to find data-viz components
    const dataVizPath = path.resolve(__dirname, "../../packages/data-viz");
    const dataVizExportPaths = [
      path.join(dataVizPath, "src/index.ts"),
      path.join(dataVizPath, "src/index.tsx"),
      path.join(dataVizPath, "dist/index.d.ts"),
      path.join(dataVizPath, "dist/index.js"),
    ];

    for (const exportPath of dataVizExportPaths) {
      try {
        const exportCode = readFileSync(exportPath, "utf8");
        const components = extractComponentsFromExports(exportCode);

        if (components.length > 0) {
          discoveryResults.dataVizComponents.push(...components);
          discoveryResults.sources.push(exportPath);
          break;
        }
      } catch (error) {
        // Try next path
        continue;
      }
    }

    // Remove duplicates and sort
    discoveryResults.components = [
      ...new Set(discoveryResults.components),
    ].sort();
    discoveryResults.dataVizComponents = [
      ...new Set(discoveryResults.dataVizComponents),
    ].sort();
  } catch (error) {
    discoveryResults.error = error.message;
  }

  return discoveryResults;
}

/**
 * Get comprehensive component list with fallback
 */
function getSDSComponentsList() {
  const discovered = discoverSDSComponents();

  // If discovery succeeded and found components, use those
  if (discovered.components.length > 0) {
    return {
      components: discovered.components,
      dataVizComponents: discovered.dataVizComponents,
      source: "discovered",
      discoveryInfo: discovered,
    };
  }

  // Fallback to comprehensive manual list
  const fallbackComponents = [
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

  const fallbackDataVizComponents = [
    "Chart",
    "LineChart",
    "BarChart",
    "ScatterPlot",
    "Histogram",
    "BoxPlot",
    "Heatmap",
  ];

  return {
    components: fallbackComponents,
    dataVizComponents: fallbackDataVizComponents,
    source: "fallback",
    discoveryInfo: discovered,
  };
}

/**
 * Analyze component usage patterns in code
 */
function analyzeComponentUsage(code, componentList) {
  const usage = {
    sdsComponents: [],
    dataVizComponents: [],
    unknownComponents: [],
    genericElements: [],
    totalJsxElements: 0,
  };

  // Find all JSX elements
  const jsxRegex = /<(\w+)(?:\s[^>]*)?\s*\/?>/g;
  let match;

  while ((match = jsxRegex.exec(code)) !== null) {
    const elementName = match[1];
    usage.totalJsxElements++;

    if (componentList.components.includes(elementName)) {
      usage.sdsComponents.push(elementName);
    } else if (componentList.dataVizComponents.includes(elementName)) {
      usage.dataVizComponents.push(elementName);
    } else if (isComponentName(elementName)) {
      usage.unknownComponents.push(elementName);
    } else {
      usage.genericElements.push(elementName);
    }
  }

  // Remove duplicates
  usage.sdsComponents = [...new Set(usage.sdsComponents)];
  usage.dataVizComponents = [...new Set(usage.dataVizComponents)];
  usage.unknownComponents = [...new Set(usage.unknownComponents)];
  usage.genericElements = [...new Set(usage.genericElements)];

  return usage;
}

/**
 * Generate component usage recommendations
 */
function generateComponentRecommendations(usage, componentList) {
  const recommendations = [];

  // Recommendations for generic elements
  const elementRecommendations = {
    button: "Consider using SDS Button component for consistent styling",
    input:
      "Consider using SDS InputText, InputSearch, or other input components",
    select: "Consider using SDS InputDropdown component",
    div: "Consider if this should use SDS layout components or containers",
    span: "Consider using SDS Typography component for text content",
    img: "Consider using SDS Icon component for icon images",
    a: 'Consider using SDS Button with variant="link" for link buttons',
    form: "Consider using SDS form components like FieldSet",
    label: "Consider using SDS FormLabel component",
    table: "Consider using SDS Table components for data display",
  };

  for (const element of usage.genericElements) {
    if (elementRecommendations[element]) {
      recommendations.push({
        type: "replacement",
        element,
        message: elementRecommendations[element],
      });
    }
  }

  // Recommendations for missing accessibility
  if (
    usage.genericElements.includes("button") ||
    usage.sdsComponents.includes("Button")
  ) {
    recommendations.push({
      type: "accessibility",
      message: "Ensure buttons have appropriate aria-label or descriptive text",
    });
  }

  // Recommendations for component combinations
  if (usage.sdsComponents.length === 0 && usage.totalJsxElements > 0) {
    recommendations.push({
      type: "design-system",
      message:
        "Consider using SDS components for consistent design and accessibility",
    });
  }

  return recommendations;
}

module.exports = {
  discoverSDSComponents,
  getSDSComponentsList,
  extractComponentsFromExports,
  analyzeComponentUsage,
  generateComponentRecommendations,
  isComponentName,
};
