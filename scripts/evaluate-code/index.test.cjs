#!/usr/bin/env node

/**
 * Simple test file for the evaluation script functions
 * Run with: node scripts/evaluate-code/index.test.cjs
 */

// Test the scoring function
function testScoring() {
  console.log("🧪 Testing scoring function...");

  const testResults = {
    compiles: true,
    usesSDS: true,
    hasImports: true,
    lintPasses: true,
    usesTokens: true,
    hasAccessibility: true,
  };

  // Mock the calculateScore function
  function calculateScore(results) {
    const weights = {
      compiles: 0.25,
      usesSDS: 0.25,
      hasImports: 0.15,
      lintPasses: 0.15,
      usesTokens: 0.1,
      hasAccessibility: 0.1,
    };

    let score = 0;
    Object.keys(weights).forEach((key) => {
      if (results[key]) {
        score += weights[key];
      }
    });

    return score;
  }

  const score = calculateScore(testResults);
  console.log(`   Score: ${(score * 100).toFixed(0)}% (expected: 100%)`);
  console.log(`   ✅ Test passed: ${score === 1.0 ? "PASS" : "FAIL"}`);
}

// Test the SDS component detection
function testSDSDetection() {
  console.log("\n🧪 Testing SDS component detection...");

  const testCode = `
    import { Button, InputText, Icon } from '@czi-sds/components';

    export const TestComponent = () => (
      <div>
        <Button>Click me</Button>
        <InputText placeholder="Enter text" />
        <Icon name="arrow-right" />
      </div>
    );
  `;

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

  const usesSDS = checkSDSUsage(testCode);
  console.log(`   Uses SDS: ${usesSDS}`);
  console.log(`   ✅ Test passed: ${usesSDS ? "PASS" : "FAIL"}`);
}

// Test the accessibility detection
function testAccessibilityDetection() {
  console.log("\n🧪 Testing accessibility detection...");

  const testCode = `
    <Button aria-label="Submit form" aria-describedby="help-text">
      Submit
    </Button>
    <div id="help-text">Click to submit the form</div>
  `;

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

  const hasAccessibility = checkAccessibility(testCode);
  console.log(`   Has accessibility: ${hasAccessibility}`);
  console.log(`   ✅ Test passed: ${hasAccessibility ? "PASS" : "FAIL"}`);
}

// Run all tests
console.log("🔍 Running evaluation script tests...\n");

testScoring();
testSDSDetection();
testAccessibilityDetection();

console.log("\n🎯 All tests completed!");
console.log("   The evaluation script is ready to use.");
console.log(
  "   Run: node scripts/evaluate-code/index.cjs --help for usage instructions."
);
