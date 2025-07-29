# CLAUDE.md - Components Package

This file provides specific guidance for working with the `@czi-sds/components` package.

## Package-Specific Commands

Run from the components package directory (`packages/components/`) or use Lerna scope:

- `yarn build` - Build the component library (runs style-dictionary build + rollup)
- `yarn sd-build` - Build design tokens using Style Dictionary
- `yarn build-watch` - Build in watch mode for development
- `yarn lint` - Run ESLint, Stylelint, and TypeScript type checking
- `yarn type-check` - Run TypeScript type checking only
- `yarn test` - Run Jest tests
- `yarn namespace-check` - Validate TypeScript namespace exports

## Component Architecture

### Component Structure Pattern

Every component follows this consistent structure:

```
ComponentName/
├── __storybook__/
│   ├── constants.tsx          # Story constants and mock data
│   ├── index.stories.tsx      # Storybook stories
│   └── stories/               # Individual story files (optional)
├── __tests__/
│   ├── ComponentName.namespace-test.tsx  # Namespace validation
│   ├── index.test.tsx         # Component tests
│   └── __snapshots__/         # Jest snapshots
├── components/                # Sub-components (if needed)
├── index.tsx                  # Main component implementation
└── style.ts                   # Styled components
```

### Component Implementation Patterns

**SDS Props System:**

- Components use `sds` prefixed props (e.g., `sdsStyle`, `sdsType`, `sdsSize`)
- Type unions define allowed combinations (see `ButtonTypeMap` example)
- Props extend Material UI base props with SDS-specific additions

**Styled Components:**

- Use `@emotion/styled` for styling
- Components are wrappers around Material UI components
- Style files export styled components that consume theme variables
- Theme selectors like `getColors(props)` and `getSpaces(props)` access design tokens

**Example Component Pattern:**

```tsx
// index.tsx
interface ComponentProps extends MuiComponentProps {
  sdsStyle: "primary" | "secondary";
  sdsSize?: "small" | "medium" | "large";
}

const Component = forwardRef<HTMLElement, ComponentProps>((props, ref) => {
  return <StyledComponent ref={ref} {...filterProps(props)} />;
});

// style.ts
export const StyledComponent = styled(MuiComponent)`
  ${(props) => {
    const colors = getColors(props);
    return css`
      background-color: ${colors?.primary[400]};
    `;
  }}
`;
```

## Design Token System

### Style Dictionary Configuration

- **Location:** `src/common/styles-dictionary/`
- **Build Command:** `yarn sd-build` (runs automatically during `yarn build`)
- **Design Tokens:** `design-tokens/*.json` files define colors, spacing, typography, etc.

### Token Categories

- `colors.json` - Color palette and semantic colors
- `spaces.json` - Spacing scale (margins, padding, gaps)
- `font.json` - Typography scale and font families
- `corners.json` - Border radius values
- `borders.json` - Border widths and styles
- `drop-shadows.json` - Box shadow definitions
- `icon-sizes.json` - Icon size specifications

### Output Formats

Style Dictionary generates tokens in multiple formats:

- **CSS Variables:** `dist/variables.css` - For vanilla CSS usage
- **SCSS Variables:** `dist/variables.scss` - For SASS/SCSS integration
- **Tailwind Config:** `dist/tailwind.json` - For Tailwind CSS integration
- **Theme Objects:** Consumed by styled components via selectors

## Icon System

### Adding New Icons

1. **Add SVG:** Place new icon SVG in `src/common/svgs/` following naming convention `IconNameSize.svg`
2. **Update Map:** Add import and mapping in `src/core/Icon/map.ts`
3. **Size Convention:** Icons come in `Small` (16px) and `Large` (24px) variants

### Icon Usage Patterns

```tsx
// Using icon name
<Icon sdsIcon="add" sdsSize="small" />

// Using custom SVG component
<Icon sdsIcon={<CustomSvgComponent />} />

// In ButtonIcon
<ButtonIcon sdsStyle="icon" icon="close" />
```

## Theme System Details

### Theme Architecture

- **Base Theme:** `defaultAppTheme` - Customizable theme options
- **Complete Theme:** `defaultTheme` - Full Material UI theme with SDS extensions
- **Theme Builder:** `makeThemeOptions()` - Merges custom options with defaults

### Theme Selectors (Most Important)

Use these functions in styled components to access theme values:

```tsx
import {
  getColors,
  getSpaces,
  getCorners,
  getFonts,
} from "@czi-sds/components";

const StyledComponent = styled.div`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);

    return css`
      color: ${colors?.primary[400]};
      padding: ${spaces?.m}px;
    `;
  }}
`;
```

### Available Selectors

- `getColors(props)` - Access color palette
- `getSpaces(props)` - Access spacing scale
- `getCorners(props)` - Access border radius values
- `getFonts(props)` - Access typography styles
- `getBorders(props)` - Access border styles
- `getShadows(props)` - Access drop shadow definitions

## Testing Patterns

### Required Tests

1. **Component Tests:** `__tests__/index.test.tsx` with snapshot testing
2. **Namespace Tests:** `__tests__/ComponentName.namespace-test.tsx` validates exports
3. **Storybook Tests:** Stories serve as visual regression tests

### Test Utilities

- Testing Library for user interactions
- Jest snapshots for component output validation
- Custom render helpers for theme context

## Storybook Integration

### Story Requirements

- All components must have Storybook stories
- Stories demonstrate all component variants and states
- Use constants file for consistent mock data
- Include accessibility testing via addon-a11y

### Story Structure

```tsx
// __storybook__/index.stories.tsx
export default {
  component: ComponentName,
  title: "Components/ComponentName",
  parameters: {
    badges: ["stable"], // Component maturity badge
  },
};

export const Default = {
  args: {
    // Default props
  },
};
```

## Build System

### Rollup Configuration

- **Input:** `src/index.ts` - Main package entry
- **Outputs:** Both CommonJS and ESM formats
- **Banner:** `"use client";` directive for Next.js compatibility
- **External:** All peer dependencies excluded from bundle

### Key Plugins

- `rollup-plugin-ts` - TypeScript compilation
- `@svgr/rollup` - SVG to React component transformation
- `rollup-plugin-css-only` - CSS extraction
- `rollup-plugin-bundle-scss` - SCSS bundling
- `rollup-plugin-copy` - Asset copying (tailwind.json)

## Development Guidelines

### Adding New Components

1. Create component directory following the standard structure
2. Implement component extending appropriate Material UI base
3. Create styled components in `style.ts`
4. Write comprehensive Storybook stories
5. Add component tests with snapshots
6. Export component in `src/index.ts`
7. Run namespace check to validate exports

### Component Props Conventions

- Use `sds` prefix for SDS-specific props
- Extend Material UI component props as base
- Use TypeScript union types for style variants
- Forward refs for component composition
- Filter props using `filterProps` utility to prevent DOM warnings

### Style Development

- Use theme selectors instead of hardcoded values
- Follow existing patterns for responsive design
- Ensure accessibility compliance
- Test across different theme configurations
