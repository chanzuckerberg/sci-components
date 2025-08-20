# Code Evaluation Script

This script evaluates LLM-generated UI components to ensure they properly use the SDS (Science Design System) components and follow best practices.

## Key Features ✨

- **Plugin Architecture**: Extensible evaluation system with modular checks
- **Parallel Processing**: Faster batch evaluation with controlled concurrency
- **Auto-Discovery**: Automatically detects available SDS components from package exports
- **Enhanced Reporting**: Multiple output formats (Console, JSON, CSV, HTML)
- **TypeScript API**: Direct TypeScript compiler integration for better error detection
- **Comprehensive Testing**: Jest test suite with extensive coverage
- **Improved Error Handling**: Better timeout management and error recovery

## Evaluation Criteria

The evaluation script checks for:

- ⚠️ **TypeScript compilation** (MANDATORY) - Code must compile without errors or automatic FAIL
- ✅ **SDS component usage** (40%) - Verifies proper use of design system components
- ✅ **ESLint compliance** (30%) - Checks code quality and style
- ✅ **Design tokens** (20%) - Checks for design token usage when custom styling is present
- ✅ **Accessibility** (10%) - Verifies accessibility attributes and patterns

## Usage

### Basic Usage

```bash
# Single file evaluation
yarn evaluate:code path/to/component.tsx

# Batch evaluation
yarn evaluate:batch path/to/directory

# Direct node execution with options
node scripts/evaluate-code/index.cjs --batch ./src --format json,csv,html --verbose
```

### Advanced Usage Examples

```bash
# Generate comprehensive reports
yarn evaluate:batch ./generated-components --format console,json,csv,html --verbose

# Fast parallel processing
node scripts/evaluate-code/index.cjs --batch ./src --concurrency 8 --format json

# Custom timeout for slow systems
node scripts/evaluate-code/index.cjs --batch ./large-codebase --timeout 60000 --format console,csv

# Disable colors for CI environments
node scripts/evaluate-code/index.cjs --batch ./src --no-colors --format json
```

## Output Formats

### Console Output (Default)
- **Real-time feedback** during evaluation with colored indicators
- **Overall score** (0-100%) with letter grade (A-F)
- **Detailed breakdown** of each evaluation criteria
- **Plugin-specific details** in verbose mode
- **Batch summary** with statistics and grade distribution

### JSON Output
- **Machine-readable** format for programmatic consumption
- **Complete evaluation data** including all plugin results
- **Batch statistics** and metadata
- **Structured error information**

### CSV Output
- **Spreadsheet-compatible** format for data analysis
- **Google Sheets ready** import format
- **Sortable columns** for filtering and analysis
- **Quick copy-paste** format for manual tracking

### HTML Report
- **Rich visual reports** with interactive elements
- **Expandable details** for failed evaluations
- **Grade distribution charts** and summary statistics
- **Professional presentation** for stakeholders

## Scoring System

- **A (90-100%)** - Excellent, ready for production
- **B (80-89%)** - Good, minor improvements needed
- **C (70-79%)** - Acceptable, review recommended
- **D (60-69%)** - Needs work, significant improvements required
- **F (0-59%)** - Poor, major refactoring needed

## Scoring System

### Mandatory Requirements
- **⚠️ TypeScript Compilation** - **AUTOMATIC FAIL** if code doesn't compile (0% score regardless of other checks)

### Weighted Scoring (for code that compiles)
- **SDS Component Usage (40%)** - Must use design system components
- **ESLint Compliance (30%)** - Code quality and style standards
- **Design Tokens (20%)** - Design tokens required only when custom styling is detected
- **Accessibility (10%)** - Accessibility attributes and patterns

### Design Token Evaluation Logic

The design token check is **contextual and intelligent**:

- **✅ PASS**: Components using only SDS components without custom styling (design tokens not required)
- **✅ PASS**: Components with custom styling that properly use design tokens (`getColors()`, `getSpaces()`, etc.)
- **❌ FAIL**: Components with custom styling (inline styles, CSS-in-JS) that don't use design tokens

**Custom styling patterns detected:**
- `style={{ ... }}` - Inline styles
- `styled()` or `styled.div` - styled-components
- Direct color/spacing values - `color: '#fff'`, `padding: '16px'`
- CSS-in-JS libraries - `makeStyles`, `css` template literals

**Recommended design tokens:**
- Colors: `getColors()` instead of hardcoded hex values
- Spacing: `getSpaces()` instead of hardcoded px/rem values
- Typography: `fontBodyS`, `fontHeaderM` mixins instead of direct font properties

## Example Output

```
🔍 Evaluating: ./generated-component.tsx
============================================================
   ✅ typescript: PASS (1.4s)
   ✅ eslint: PASS (427ms)
   ✅ sds-usage: PASS (1ms)
   ✅ designTokens: PASS (0ms)
   ✅ accessibility: PASS (0ms)

📊 SUMMARY
   Overall Score: 100%
   Grade: A
   Ready for Review: ✅ YES
   Total Duration: 1.4s
```

## Testing

### Run Test Suite

```bash
# Run Jest test suite
yarn evaluate:test
```

### Test Coverage

The test suite includes:
- **Configuration validation** - Ensures proper setup
- **Plugin functionality** - Tests each evaluation plugin
- **Integration tests** - End-to-end evaluation scenarios
- **Utility functions** - Error handling and parsing
- **Edge cases** - Malformed code and error conditions

## Configuration

### Custom Configuration

Create a custom configuration file:

```javascript
// evaluation-config.js
module.exports = {
  weights: {
    typescript: 0,        // Pass/fail requirement (not weighted)
    sdsUsage: 0.5,     // Emphasize SDS usage
    eslint: 0.3,          // Code quality
    designTokens: 0.15, // Design consistency
    accessibility: 0.05   // A11y
  },
  processing: {
    timeout: 45000,       // 45 second timeout
    maxConcurrency: 6     // Higher parallelism
  }
};
```

Use with: `node scripts/evaluate-code/index.cjs --config ./evaluation-config.js`

### Environment Variables

```bash
# Disable colors in CI
NO_COLOR=1 yarn evaluate:batch ./src

# Increase memory limit for large batches
NODE_OPTIONS="--max-old-space-size=4096" yarn evaluate:batch ./large-codebase
```

## Architecture

### Plugin System

Create custom plugins by extending `BasePlugin`:

```javascript
const { BasePlugin } = require('./plugins.cjs');

class CustomPlugin extends BasePlugin {
  constructor() {
    super('custom-check', 'Custom evaluation logic');
  }

  async check(filePath, code) {
    // Your custom evaluation logic
    return {
      name: this.name,
      passed: true,
      score: 1.0,
      duration: Date.now() - startTime,
      details: { /* custom data */ }
    };
  }
}
```

### File Structure

```
scripts/evaluate-code/
├── index.cjs             # Main evaluation script
├── config.cjs            # Configuration system
├── plugins.cjs           # Plugin architecture
├── utils.cjs             # Utility functions
├── reporters.cjs         # Output formatters
├── sds-discovery.cjs     # Component auto-discovery
├── evaluate.test.js      # Jest test suite
├── index.test.cjs        # Legacy manual tests (deprecated)
└── README.md            # This file
```

## Requirements

- **Node.js 18+** - Modern JavaScript features and ES modules
- **TypeScript** - Compiler API integration (`typescript` package)
- **ESLint** - Code quality checking
- **SDS Packages** - `@czi-sds/components` and `@czi-sds/data-viz`
- **Jest** - Testing framework (for development)

## Architecture Highlights

### Key Improvements

- **Plugin-based Architecture**: Modular evaluation system vs monolithic approach
- **Parallel Processing**: Concurrent file evaluation vs sequential processing
- **Enhanced Output**: Multiple report formats (Console, JSON, CSV, HTML)
- **TypeScript Integration**: Direct compiler API vs shell command execution
- **Auto-Discovery**: Dynamic SDS component detection from package exports
- **Comprehensive Testing**: Jest test suite with extensive coverage
- **Configurable**: Flexible weights, timeouts, and processing options

## Exports

### Generated Files

Batch evaluations automatically generate timestamped files:
- `evaluation-results-YYYY-MM-DDTHH-MM-SS.json` - Complete data
- `evaluation-results-YYYY-MM-DDTHH-MM-SS.csv` - Spreadsheet format
- `evaluation-report-YYYY-MM-DDTHH-MM-SS.html` - Visual report

### Google Sheets Integration

1. Run batch evaluation with CSV output
2. Import the generated CSV file into Google Sheets
3. Use built-in charts and filters for analysis
4. Share reports with stakeholders
