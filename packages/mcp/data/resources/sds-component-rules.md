# SDS Component Usage Rules

These rules guide Claude Code when working with the CZI Science Design System (SDS) components.

## Component Library Enforcement

### Import Patterns

- **Always prefer SDS components** over custom implementations or third-party alternatives
- Use named imports: `import { Button, Icon, Link } from "@czi-sds/components"`
- Avoid importing individual component files directly

### SDS-Specific Props

- **Use SDS-specific prop patterns** for consistent styling:
  - `sdsStyle`: Controls visual style variants (`"square"`, `"rounded"`, `"minimal"`)
  - `sdsType`: Controls semantic variants (`"primary"`, `"secondary"`, `"tertiary"`)
  - `sdsSize`: Controls component sizing (`"xs"`, `"s"`, `"m"`, `"l"`, `"xl"`)
  - `sdsIcon`: Specifies icon names for Icon components

### Component Composition Patterns

- **Follow SDS recommended composition patterns**:
  - Use `Button` with `Icon` for button-icon combinations
  - Use `InputText` with proper validation states
  - Use `Tooltip` with appropriate trigger components

## Design Token Usage

### Spacing and Layout

- **Use SDS spacing tokens** via Tailwind classes:
  - Padding: `p-sds-xs`, `px-sds-m`, `py-sds-l`
  - Margin: `m-sds-xs`, `mx-sds-m`, `my-sds-l`
  - Gap: `gap-sds-xs`, `gap-x-sds-m`, `gap-y-sds-l`
- Available spacing values: `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`

### Typography

- **Use SDS typography classes** for consistent text styling:
  - Format: `prose-sds-{type}-{size}-{weight}-{variant}`
  - Examples: `prose-sds-header-xl-600-wide`, `prose-sds-body-s-400-wide`
- **Use SDS font families**: `font-sds-body`, `font-sds-header`, `font-sds-code`
- **Use SDS font weights**: `font-sds-regular`, `font-sds-semibold`

### Colors

- **Use SDS semantic color tokens** for theme consistency:
  - Text: `text-light-sds-color-semantic-base-text-primary`
  - Backgrounds: `bg-light-sds-color-semantic-base-background-primary`
  - **Always include dark mode variants**: `dark:text-dark-sds-color-semantic-base-text-primary`

## Component-Specific Guidelines

### Buttons

```tsx
// Preferred patterns
<Button sdsStyle="square" sdsType="primary" onClick={handleClick}>
  Primary Action
</Button>

<Button sdsStyle="minimal" sdsType="secondary" startIcon={<Icon sdsIcon="Add" sdsSize="xs" />}>
  Secondary Action
</Button>
```

### Icons

```tsx
// Use SDS icon names
<Icon sdsIcon="CheckCircle" sdsSize="s" />
<Icon sdsIcon="ExternalLink" sdsSize="xs" />

// With interactive elements
<Button startIcon={<Icon sdsIcon="Download" sdsSize="xs" />}>
  Download
</Button>
```

### Form Components

```tsx
// Use SDS form components
<InputText
  label="Email Address"
  placeholder="Enter your email"
  intent="default"
/>

<Autocomplete
  label="Select Option"
  options={options}
  multiple={false}
/>
```

## Accessibility Requirements

### ARIA and Semantic HTML

- **Use SDS components' built-in accessibility features**
- Add custom ARIA attributes only when SDS components don't provide them
- Use semantic HTML elements with SDS styling rather than generic divs when possible

### Color Contrast

- **SDS color tokens meet WCAG requirements** - use them instead of custom colors
- Test components in both light and dark modes
- Ensure sufficient contrast for interactive states

## Code Quality Patterns

### TypeScript Integration

- **Use SDS component TypeScript interfaces** for prop typing
- Import types when needed: `import { ButtonProps, IconName } from "@czi-sds/components"`
- Extend SDS interfaces for custom component props

### Responsive Design

- **Use SDS breakpoint system** with Tailwind responsive prefixes:
  - `xs:`, `sm:`, `md:`, `lg:`, `xl:`
- Follow mobile-first responsive design patterns
- Use SDS spacing tokens at all breakpoints

### Testing Considerations

- **SDS components are pre-tested** - focus tests on your business logic
- Test accessibility using SDS components' built-in features
- Use SDS Storybook for component API reference during development

## Anti-Patterns to Avoid

### Don't Override SDS Styles

```tsx
// ❌ Avoid overriding SDS component styles
<Button className="!bg-red-500 !p-4">Bad</Button>

// ✅ Use SDS props and tokens instead
<Button sdsType="primary" className="p-sds-m">Good</Button>
```

### Don't Mix Design Systems

```tsx
// ❌ Don't mix SDS with other component libraries
<MuiButton>Mixed</MuiButton>
<Button>SDS Button</Button>

// ✅ Use SDS consistently
<Button sdsType="primary">Primary</Button>
<Button sdsType="secondary">Secondary</Button>
```

### Don't Hardcode Design Tokens

```tsx
// ❌ Avoid hardcoded spacing/colors
<div className="p-4 text-blue-600">Bad</div>

// ✅ Use SDS tokens
<div className="p-sds-m text-light-sds-color-semantic-accent-text-primary">Good</div>
```

## Integration with Other Systems

### With Tailwind CSS

- SDS provides Tailwind configuration - use it as the foundation
- SDS classes take precedence over generic Tailwind classes
- Use SDS breakpoints for responsive design

### With React Frameworks

- SDS components work with Next.js, React Router, etc.
- Use SDS Link component for navigation when possible
- Maintain SDS patterns in framework-specific code

## Best Practices Summary

1. **Component First**: Always check if SDS has a component before building custom
2. **Tokens Always**: Use SDS design tokens (spacing, colors, typography) consistently
3. **Props Over Classes**: Use SDS-specific props rather than overriding with classes
4. **Accessibility Built-in**: Leverage SDS components' accessibility features
5. **Dark Mode Ready**: Always include dark mode color variants
6. **TypeScript Friendly**: Use SDS TypeScript interfaces and types
7. **Test Integration**: Focus tests on business logic, rely on SDS component testing
