# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

This is a Lerna monorepo with two packages: `@czi-sds/components` and `@czi-sds/data-viz`. Use these commands from the project root:

- `yarn start` - Start Storybook development server on port 6006
- `yarn build` - Build all packages using Lerna
- `yarn test` - Run Jest tests across all packages
- `yarn test:updateSnapshots` - Update Jest snapshots across all packages
- `yarn lint` - Run ESLint and Stylelint across all packages
- `yarn build-storybook` - Build Storybook for production
- `yarn test-storybook` - Run Storybook tests
- `yarn storybook:axe` - Build Storybook and run accessibility tests

### Package-specific commands:

- `lerna run <script> --scope=@czi-sds/components` - Run script only in components package
- `lerna run <script> --scope=@czi-sds/data-viz` - Run script only in data-viz package

### Testing:

- Individual tests: Use `yarn test` with Jest's standard options like `--testNamePattern`
- Type checking: `yarn namespace-check` runs TypeScript namespace validation

## Architecture Overview

### Monorepo Structure

- **Root**: Contains shared configuration (Lerna, ESLint, Stylelint, Jest, Storybook)
- **packages/components**: Main Science Design System (SDS) component library built on Material UI v5
- **packages/data-viz**: Data visualization components (primarily ECharts-based)

### Components Package Architecture

**Built on Material UI v5** - Components are style wrappers that pass props through to MUI components.

**Design System Foundation:**

- `src/common/styles-dictionary/` - Design tokens (colors, spacing, typography, etc.) built with Style Dictionary
- `src/core/styles/` - Theme configuration and utilities
- Design tokens are compiled to CSS variables, SCSS variables, and Tailwind config

**Component Structure:**

- Each component follows consistent structure: `__storybook__/`, `__tests__/`, main component file, `style.ts`
- Components in `src/core/` organized alphabetically
- Storybook stories in `__storybook__/index.stories.tsx`
- Tests include snapshots and namespace validation

**Key Exports:**

1. **Components** - React components with SDS styling
2. **Mixins** - Grouped styles (e.g., `fontHeaderXL`)
3. **Selectors** - Theme helper functions (e.g., `getColors`, `getSpaces`)
4. **CSS/SCSS Variables** - For non-Emotion environments
5. **Tailwind Config** - For Tailwind CSS integration

### Data Viz Package

- ECharts-based visualization components
- Smaller package focused on scientific data visualization
- Shares same build pipeline and testing approach as components package

### Build System

- **Rollup** for bundling (ESM and CJS outputs)
- **TypeScript** with strict configuration
- **Style Dictionary** for design token compilation
- **SWC** for fast compilation in Storybook

### Testing Strategy

- **Jest** with Testing Library for unit tests
- **Storybook** for component development and visual testing
- **Chromatic** for visual regression testing
- **Axe** for accessibility testing
- Snapshot testing for component output validation

## Theme System

The codebase uses a sophisticated theme system built on Material UI:

- `defaultTheme` - Complete theme object for production use
- `defaultAppTheme` - Base theme options for customization
- `makeThemeOptions()` - Function to create custom theme options
- Theme provides colors, spacing, typography, breakpoints, and component overrides

Custom themes should extend `defaultAppTheme` and use `createTheme()` to generate the full theme object.

## Development Workflow

1. **Component Development**: Create in appropriate `src/core/` directory following existing patterns
2. **Storybook**: Stories are required for all components
3. **Testing**: Unit tests and snapshots required
4. **Design Tokens**: Stored in `src/common/styles-dictionary/design-tokens/`
5. **Icons**: SVG icons in `src/common/svgs/` with corresponding entries in `src/core/Icon/map.ts`

## Important Notes

- Components are peer-dependency based to prevent version conflicts
- Material UI v5 compatibility is required
- All components should be accessible and follow SDS design principles
- The project uses Yarn workspaces with Lerna for package management
- Conventional commits are used for automated versioning and changelogs
