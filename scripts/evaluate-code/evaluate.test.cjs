const {
  PluginManager,
  SDSUsagePlugin,
  ImportPlugin,
  AccessibilityPlugin,
} = require("./plugins.cjs");
const { EVALUATION_CONFIG } = require("./config.cjs");
const { calculateFileStats, parseTypeScriptErrors } = require("./utils.cjs");

describe("Code Evaluation Script", () => {
  describe("Configuration", () => {
    test("should have valid configuration", () => {
      expect(EVALUATION_CONFIG).toBeDefined();
      expect(EVALUATION_CONFIG.weights).toBeDefined();

      // Check that weights sum to 1.0
      const totalWeight = Object.values(EVALUATION_CONFIG.weights).reduce(
        (sum, w) => sum + w,
        0
      );
      expect(Math.abs(totalWeight - 1.0)).toBeLessThan(0.001);
    });

    test("should have SDS components list", () => {
      expect(EVALUATION_CONFIG.sdsComponents).toBeDefined();
      expect(EVALUATION_CONFIG.sdsComponents.length).toBeGreaterThan(0);
      expect(EVALUATION_CONFIG.sdsComponents).toContain("Button");
    });

    test("should have accessibility patterns", () => {
      expect(EVALUATION_CONFIG.accessibilityPatterns).toBeDefined();
      expect(EVALUATION_CONFIG.accessibilityPatterns.length).toBeGreaterThan(0);
    });
  });

  describe("Plugin Manager", () => {
    let pluginManager;

    beforeEach(() => {
      pluginManager = new PluginManager();
    });

    test("should register default plugins", () => {
      const plugins = pluginManager.getAllPlugins();
      expect(plugins.length).toBeGreaterThan(0);

      const pluginNames = plugins.map((p) => p.name);
      expect(pluginNames).toContain("typescript");
      expect(pluginNames).toContain("eslint");
      expect(pluginNames).toContain("sdsUsage");
      expect(pluginNames).toContain("imports");
      expect(pluginNames).toContain("accessibility");
    });

    test("should get plugin by name", () => {
      const sdsPlugin = pluginManager.getPlugin("sdsUsage");
      expect(sdsPlugin).toBeDefined();
      expect(sdsPlugin.name).toBe("sdsUsage");
    });
  });

  describe("SDS Usage Plugin", () => {
    let plugin;

    beforeEach(() => {
      plugin = new SDSUsagePlugin();
    });

    test("should detect SDS components", async () => {
      const code = `
        import { Button, InputText, Icon } from '@czi-sds/components';

        export const TestComponent = () => (
          <div>
            <Button>Click me</Button>
            <InputText placeholder="Enter text" />
            <Icon name="arrow-right" />
          </div>
        );
      `;

      const result = await plugin.check("/test.tsx", code);

      expect(result.passed).toBe(true);
      expect(result.score).toBeGreaterThan(0);
      expect(result.details.sdsComponentsFound).toContain("Button");
      expect(result.details.sdsComponentsFound).toContain("InputText");
      expect(result.details.sdsComponentsFound).toContain("Icon");
    });

    test("should detect generic elements", async () => {
      const code = `
        export const TestComponent = () => (
          <div>
            <button>Click me</button>
            <input placeholder="Enter text" />
            <span>Some text</span>
          </div>
        );
      `;

      const result = await plugin.check("/test.tsx", code);

      expect(result.passed).toBe(false);
      expect(result.score).toBe(0);
      expect(result.details.genericElements).toContain("button");
      expect(result.details.genericElements).toContain("input");
      expect(result.details.genericElements).toContain("span");
    });

    test("should generate recommendations", async () => {
      const code = `
        export const TestComponent = () => (
          <div>
            <button>Click me</button>
            <input placeholder="Enter text" />
          </div>
        );
      `;

      const result = await plugin.check("/test.tsx", code);

      expect(result.details.recommendations).toBeDefined();
      expect(result.details.recommendations.length).toBeGreaterThan(0);
      expect(result.details.recommendations[0]).toContain("Button");
    });
  });

  describe("Import Plugin", () => {
    let plugin;

    beforeEach(() => {
      plugin = new ImportPlugin();
    });

    test("should detect SDS imports", async () => {
      const code = `
        import { Button, InputText } from '@czi-sds/components';
        import { Chart } from '@czi-sds/data-viz';
        import React from 'react';
      `;

      const result = await plugin.check("/test.tsx", code);

      expect(result.passed).toBe(true);
      expect(result.score).toBe(1);
      expect(result.details.hasSdsImport).toBe(true);
      expect(result.details.hasDataVizImport).toBe(true);
      expect(result.details.sdsImports).toBe(2);
    });

    test("should fail without SDS imports", async () => {
      const code = `
        import React from 'react';
        import { someFunction } from './utils';
      `;

      const result = await plugin.check("/test.tsx", code);

      expect(result.passed).toBe(false);
      expect(result.score).toBe(0);
      expect(result.details.hasSdsImport).toBe(false);
      expect(result.details.hasDataVizImport).toBe(false);
    });
  });

  describe("Accessibility Plugin", () => {
    let plugin;

    beforeEach(() => {
      plugin = new AccessibilityPlugin();
    });

    test("should detect accessibility attributes", async () => {
      const code = `
        export const TestComponent = () => (
          <div>
            <button aria-label="Submit form" aria-describedby="help-text">
              Submit
            </button>
            <div id="help-text">Click to submit the form</div>
            <img src="logo.png" alt="Company logo" />
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" />
          </div>
        );
      `;

      const result = await plugin.check("/test.tsx", code);

      expect(result.passed).toBe(true);
      expect(result.score).toBeGreaterThan(0);
      expect(result.details.hasAccessibility).toBe(true);
      expect(result.details.hasFormLabels).toBe(true);
      expect(result.details.hasAltText).toBe(true);
      expect(result.details.attributesFound.length).toBeGreaterThan(0);
    });

    test("should fail without accessibility features", async () => {
      const code = `
        export const TestComponent = () => (
          <div>
            <button>Submit</button>
            <input type="email" />
            <img src="logo.png" />
          </div>
        );
      `;

      const result = await plugin.check("/test.tsx", code);

      expect(result.passed).toBe(false);
      expect(result.score).toBe(0);
      expect(result.details.hasAccessibility).toBe(false);
    });

    test("should generate accessibility recommendations", async () => {
      const code = `
        export const TestComponent = () => (
          <div>
            <button>Submit</button>
            <input type="email" />
            <img src="logo.png" />
          </div>
        );
      `;

      const result = await plugin.check("/test.tsx", code);

      expect(result.details.recommendations).toBeDefined();
      expect(result.details.recommendations.length).toBeGreaterThan(0);
      expect(
        result.details.recommendations.some((r) => r.includes("aria-label"))
      ).toBe(true);
    });
  });

  describe("Utility Functions", () => {
    describe("calculateFileStats", () => {
      test("should calculate basic file statistics", () => {
        const code = `import React from 'react';

export const TestComponent = () => {
  return <div>Hello World</div>;
};`;

        const stats = calculateFileStats(code);

        expect(stats.totalLines).toBe(5);
        expect(stats.codeLines).toBe(4);
        expect(stats.emptyLines).toBe(1);
        expect(stats.imports).toBe(1);
        expect(stats.exports).toBe(1);
        expect(stats.characters).toBeGreaterThan(0);
      });
    });

    describe("parseTypeScriptErrors", () => {
      test("should parse TypeScript error output", () => {
        const output = `
test.tsx(10,5): error TS2322: Type 'string' is not assignable to type 'number'.
test.tsx(15,12): warning TS6133: 'unused' is declared but never used.
node_modules/@types/react/index.d.ts(100,10): error TS1234: Library error.
        `;

        const errors = parseTypeScriptErrors(output, "test.tsx");

        expect(errors.length).toBe(2); // Should exclude library errors
        expect(errors[0].severity).toBe("error");
        expect(errors[0].code).toBe("TS2322");
        expect(errors[0].line).toBe(10);
        expect(errors[0].column).toBe(5);
      });
    });
  });

  describe("Integration Tests", () => {
    let pluginManager;

    beforeEach(() => {
      pluginManager = new PluginManager();
    });

    test("should run all checks on good code", async () => {
      const goodCode = `
        import { Button, InputText, Icon } from '@czi-sds/components';
        import React from 'react';

        export const TestComponent = () => (
          <div>
            <label htmlFor="email">Email Address:</label>
            <InputText
              id="email"
              placeholder="Enter your email"
              aria-describedby="email-help"
            />
            <div id="email-help">We'll never share your email</div>
            <Button aria-label="Submit form">
              <Icon name="send" />
              Submit
            </Button>
          </div>
        );
      `;

      const results = await pluginManager.runAllChecks(
        "/good-test.tsx",
        goodCode
      );

      expect(results.sdsUsage.passed).toBe(true);
      expect(results.imports.passed).toBe(true);
      expect(results.accessibility.passed).toBe(true);

      // Should have good scores
      expect(results.sdsUsage.score).toBeGreaterThan(0.5);
      expect(results.imports.score).toBe(1);
      expect(results.accessibility.score).toBeGreaterThan(0.5);
    });

    test("should run all checks on poor code", async () => {
      const poorCode = `
        import React from 'react';

        export const TestComponent = () => (
          <div>
            <input placeholder="Enter email" />
            <button>Submit</button>
            <img src="logo.png" />
          </div>
        );
      `;

      const results = await pluginManager.runAllChecks(
        "/poor-test.tsx",
        poorCode
      );

      expect(results.sdsUsage.passed).toBe(false);
      expect(results.imports.passed).toBe(false);
      expect(results.accessibility.passed).toBe(false);

      // Should have low scores
      expect(results.sdsUsage.score).toBe(0);
      expect(results.imports.score).toBe(0);
      expect(results.accessibility.score).toBe(0);
    });
  });
});
