# Code Evaluation Script

This script evaluates LLM-generated UI components to ensure they properly use the SDS (Science Design System) components and follow best practices.

## Features

The evaluation script checks for:

- ✅ **TypeScript compilation** - Ensures the code compiles without errors
- ✅ **ESLint compliance** - Checks code quality and style
- ✅ **SDS component usage** - Verifies proper use of design system components
- ✅ **Import statements** - Ensures SDS components are properly imported
- ✅ **Design tokens** - Checks for consistent design token usage
- ✅ **Accessibility** - Verifies accessibility attributes and patterns
- ✅ **Component analysis** - Identifies SDS vs generic HTML elements used

## Usage

### Single File Evaluation

```bash
# Using yarn script
yarn evaluate:code path/to/component.tsx

# Direct node execution
node scripts/evaluate-code/index.cjs path/to/component.tsx
```

### Batch Evaluation

```bash
# Using yarn script
yarn evaluate:batch path/to/directory

# Direct node execution
node scripts/evaluate-code/index.cjs --batch path/to/directory
```

## Output

The script provides:

1. **Real-time feedback** during evaluation
2. **Overall score** (0-100%) with letter grade (A-F)
3. **Detailed breakdown** of each evaluation criteria
4. **CSV export** for batch results (Google Sheets compatible)
5. **Quick copy-paste** format for manual tracking

## Scoring System

- **A (90-100%)** - Excellent, ready for production
- **B (80-89%)** - Good, minor improvements needed
- **C (70-79%)** - Acceptable, review recommended
- **D (60-69%)** - Needs work, significant improvements required
- **F (0-59%)** - Poor, major refactoring needed

## Weighting

- **Compiles (25%)** - Must work
- **Uses SDS (30%)** - Must use design system
- **Has Imports (20%)** - Proper setup
- **Lint Passes (15%)** - Code quality
- **Uses Tokens (5%)** - Design consistency (optional)
- **Has Accessibility (10%)** - User experience

## Example Output

```
🔍 Evaluating: ./generated-component.tsx
==================================================
📝 Checking TypeScript compilation...
   ✅ Compiles: true
🔍 Running ESLint...
   ✅ Lint passes: true
🎨 Checking SDS component usage...
   ✅ Uses SDS components: true
📦 Checking imports...
   ✅ Has SDS imports: true
🎯 Checking design tokens...
   ✅ Uses design tokens: true
♿ Checking accessibility...
   ✅ Has accessibility: true
🔬 Analyzing components...
   📊 SDS components found: Button, InputText, Icon
   ⚠️  Generic elements: None

📊 SUMMARY
   Overall Score: 100%
   Grade: A
   Ready for Review: ✅
```

## Requirements

- Node.js 18+ (ES modules support)
- TypeScript compiler (`tsc`)
- ESLint (`eslint`)
- SDS components package (`@czi-sds/components`)

## Integration

The script is integrated into the monorepo with yarn scripts:

- `yarn evaluate:code <file>` - Evaluate a single file
- `yarn evaluate:batch <directory>` - Evaluate all .tsx/.ts files in a directory

## CSV Export

Batch evaluations automatically export results to a CSV file named:
`evaluation-results-YYYY-MM-DD.csv`

This can be imported directly into Google Sheets for tracking and analysis.
