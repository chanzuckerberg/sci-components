# CLAUDE.md - Components Package

This file provides specific guidance for working with the `@czi-sds/components` package.

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

- Components use `sds` prefixed props (e.g., `sdsStyle`, `sdsType`, `sdsSize`) for sds specific props
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
- `breakpoints.json` - Responsive design breakpoints

### Output Formats

Style Dictionary generates tokens in multiple formats:

- **CSS Variables:** `dist/variables.css` - For vanilla CSS usage
- **SCSS Variables:** `dist/variables.scss` - For SASS/SCSS integration
- **Tailwind Config:** `dist/tailwind.json` - For Tailwind CSS integration

## Icon System

### Adding New Icons

1. **Add SVG:** Place new icon SVG in `src/common/svgs/` following naming convention `IconNameSize.svg`
2. **Update Map:** Add import and mapping in `src/core/Icon/map.ts`
3. **Size Convention:** Icons come in `Small` (16px) and `Large` (24px) variants

## Theme System

The codebase uses a sophisticated theme system built on Material UI with comprehensive light/dark mode support:

### Core Theme Architecture

- `SDSLightAppTheme` - Complete light theme with SDS color palette
- `SDSDarkAppTheme` - Complete dark theme with inverted SDS color palette
- `SDSChooseTheme(mode)` - Helper function to programmatically select light/dark theme
- `makeSdsSemanticAppTheme(colors, isDarkTheme)` - Factory function to create custom themes
- `createAppThemeBorders(colors, isDarkMode)` - Dynamic border system that adapts to theme colors

### Shared Theme Foundation (`sharedAppTheme`)

The theme system is built on a shared foundation object that contains all non-color-dependent properties. This object (`sharedAppTheme`) is defined in `packages/components/src/core/styles/common/SDSAppTheme.ts` and includes:

**Font Weights:**

- `light: 300`, `regular: 400`, `medium: 500`, `semibold: 600`, `bold: 700`

**Spacing Scale (in pixels):**

- `xxxs: 2`, `xxs: 4`, `xs: 6`, `s: 8`, `m: 12` (default), `l: 16`, `xl: 24`, `xxl: 40`

**Corner Radius Values:**

- `none: 0`, `s: 2`, `m: 4`, `l: 20`

**Icon Sizes (width × height in pixels):**

- `xs: 12×12`, `s: 16×16`, `l: 24×24`, `xl: 32×32`
- `input: 16×16` (specifically for radio and checkbox inputs)

**Shadow System:**

- `none: "none"`
- `s: "0 2px 4px 0 rgba(0,0,0, 0.25)"`
- `m: "0 2px 4px 0 rgba(0,0,0, 0.15), 0 2px 10px 0 rgba(0,0,0, 0.15)"`
- `l: "0 2px 12px 0 rgba(0,0,0, 0.3)"`

**Typography System:**
Built on Inter and IBM Plex Mono fonts with responsive scales:

- **Font Families:** `body/header/tabs: "Inter"`, `code: "IBM Plex Mono"`
- **Responsive Scales:** `narrowStyles` and `wideStyles` for different viewport sizes
- **Type Categories:** `body`, `header`, `caps`, `code`, `tabular`
- **Weight Variants:** `regular` and `semibold` across all categories
- **Size Scale:** From `xxxs` (11-12px) to `xxl` (22-26px) with consistent line heights and letter spacing
- **Special Features:** Tabular numbers (`tabular-nums`) for numerical data, uppercase transforms for caps

### Complete Theme Structure

Each complete theme (light/dark) combines the shared foundation with:

- **Colors:** Comprehensive 6-color palette (blue, gray, green, purple, red, yellow) with 8 shade levels each
- **Borders:** Dynamic border system with semantic naming (accent, base, info, negative, etc.) that adapts to theme colors
- **Mode:** Light or dark mode identifier

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

All selector functions accept a `CommonThemeProps` object with an optional `theme` property:

- `getSpaces(props)` - Access spacing scale (returns `Spaces | null`)
- `getSpacings(props)` - **DEPRECATED** - Use `getSpaces()` instead
- `getTypography(props)` - Access typography styles (returns `Typography | null`)
- `getMode(props)` - Get current theme mode (returns `"light" | "dark"`)
- `getPalette(props)` - Access MUI palette options (returns `PaletteOptions`)
- `getColors(props)` - Access color palette (returns `Colors | null`)
- `getSemanticColors(props)` - Access SDS semantic colors (returns `SDSPalette | null`)
- `getShadows(props)` - Access drop shadow definitions (returns `Shadows | null`)
- `getCorners(props)` - Access border radius values (returns `Corners | null`)
- `getFontWeights(props)` - Access font weight values (returns `FontWeights | null`)
- `getIconSizes(props)` - Access icon size specifications (returns `IconSizes | null`)
- `getBorders(props)` - Access border styles (returns `Borders | null`)
- `getBreakpoints(props)` - Access responsive breakpoints (returns `Breakpoints | null`)

## Font System and Typography Mixins

The codebase provides a comprehensive set of font mixins that encapsulate typography styles from the design tokens. These mixins are located in `src/core/styles/common/mixins/fonts.ts` and provide a consistent way to apply typography across components.

### Font Categories

The font system is organized into five main categories, each serving specific use cases:

1. **Body Text (`fontBody`)** - Primary text content
2. **Headers (`fontHeader`)** - Section headings and titles
3. **Caps (`fontCaps`)** - Uppercase text (automatically applies text-transform)
4. **Code (`fontCode`)** - Monospace text for code snippets
5. **Tabular (`fontTabular`)** - Numerical data with tabular number formatting

### Available Font Mixins

#### Body Text Mixins

- `fontBodyL` - Body large (regular weight)
- `fontBodyM` - Body medium (regular weight)
- `fontBodyS` - Body small (regular weight)
- `fontBodyXs` - Body extra small (regular weight)
- `fontBodyXxs` - Body double extra small (regular weight)
- `fontBodyXxxs` - Body triple extra small (regular weight)
- `fontBodySemiboldL` - Body large (semibold weight)
- `fontBodySemiboldM` - Body medium (semibold weight)
- `fontBodySemiboldS` - Body small (semibold weight)
- `fontBodySemiboldXs` - Body extra small (semibold weight)
- `fontBodySemiboldXxs` - Body double extra small (semibold weight)
- `fontBodySemiboldXxxs` - Body triple extra small (semibold weight)

#### Header Mixins

- `fontHeaderXxl` - Header double extra large
- `fontHeaderXl` - Header extra large
- `fontHeaderL` - Header large
- `fontHeaderM` - Header medium
- `fontHeaderS` - Header small
- `fontHeaderXs` - Header extra small
- `fontHeaderXxs` - Header double extra small
- `fontHeaderXxxs` - Header triple extra small

#### Caps Mixins (Uppercase)

- `fontCapsXxs` - Caps double extra small
- `fontCapsXxxs` - Caps triple extra small
- `fontCapsXxxxs` - Caps quadruple extra small

#### Code Mixins

- `fontCodeXs` - Code extra small (regular weight)
- `fontCodeS` - Code small (regular weight)
- `fontCodeSemiboldXs` - Code extra small (semibold weight)
- `fontCodeSemiboldS` - Code small (semibold weight)

#### Tabular Mixins (For numerical data)

- `fontTabularXs` - Tabular extra small (regular weight)
- `fontTabularS` - Tabular small (regular weight)
- `fontTabularSemiboldXs` - Tabular extra small (semibold weight)
- `fontTabularSemiboldS` - Tabular small (semibold weight)

### Usage in Styled Components

Font mixins can be used in two ways:

#### 1. Direct Usage (without props)

```tsx
import { fontBodyS, fontHeaderL } from "@czi-sds/components";

const StyledComponent = styled.div`
  ${fontBodyS}

  h1 {
    ${fontHeaderL}
  }
`;
```

#### 2. With Theme Props (recommended for consistency)

```tsx
import { fontBodyS, fontHeaderL } from "@czi-sds/components";

const StyledComponent = styled.div`
  ${(props) => fontBodyS(props)}

  h1 {
    ${(props) => fontHeaderL(props)}
  }
`;
```

### Advanced Usage

#### Custom Font Sizes and Weights

You can use the base font functions directly for more control:

```tsx
import { fontBody, fontHeader } from "@czi-sds/components";

const StyledComponent = styled.div`
  ${(props) => fontBody("l", "semibold")(props)}
  ${(props) => fontHeader("xl")(props)}
`;
```

#### Responsive Typography

All font functions support an optional `isNarrow` parameter for responsive behavior:

```tsx
import { fontBody } from "@czi-sds/components";

const StyledComponent = styled.div`
  ${(props) => fontBody("l", "regular", true)(props)}
`;
```

This applies narrower typography styles on smaller viewports (below `md` breakpoint).

### Real-World Examples

#### Button Component

```tsx
// Buttons use caps mixins for all-caps variants
${isAllCaps ? fontCapsXxs(props) : fontBodySemiboldXs(props)}
```

#### Dialog Title

```tsx
// Dialog titles use large headers
export const Title = styled(Typography)`
  ${fontHeaderXl}
`;
```

#### Form Labels

```tsx
// Form labels use small body text
export const StyledLabel = styled("label")`
  ${fontBodyS}
`;
```

#### Tooltips

```tsx
// Tooltips vary between header and body styles based on type
${isSubtle ? fontBodyXs(props) : fontHeaderXs(props)}
```

### Typography System Details

The font mixins automatically apply the following properties from the design tokens:

- `font-family` - Appropriate font family (Inter for body/headers, IBM Plex Mono for code)
- `font-size` - Pixel-based sizes from the design system
- `line-height` - Optimized line heights for readability
- `letter-spacing` - Appropriate tracking for each size
- `font-weight` - Regular (400) or Semibold (600)
- `text-transform` - Uppercase for caps variants
- `font-variant-numeric` - Tabular numbers for tabular variants

## Testing Patterns

- `yarn test -- ./packages/components/src/core/ComponentName/__tests__/index.test.tsx` - Individual component testing with **jest**
- `yarn test` - Run jest tests for all the components

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
    badges: ["stable"], // Component maturity badge. Possible values: "stable", "beta", "deprecated", "needs_revision", "wip"
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
