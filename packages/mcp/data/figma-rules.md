# Figma to Code Translation Rules

These rules guide Claude Code when translating Figma designs to code using the CZI Science Design System (SDS).

## Design Token Priority

### Spacing Values
- **ALWAYS use SDS spacing tokens** instead of hardcoded pixel values
- Map Figma spacing to SDS Tailwind classes: `p-sds-{size}`, `m-sds-{size}`, `gap-sds-{size}`
- SDS spacing scale: `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`
- Examples: `mb-sds-xs`, `px-sds-l`, `gap-sds-xl`

### Color Values
- **Prefer SDS color tokens** over hardcoded hex values from Figma
- Use SDS semantic color classes: `text-light-sds-color-semantic-base-text-primary`
- Include dark mode variants: `dark:text-dark-sds-color-semantic-base-text-primary`
- Only use Figma hex values when no appropriate SDS token exists

### Typography
- **Map Figma text styles to SDS typography classes**
- Format: `prose-sds-{type}-{size}-{weight}-{variant}`
- Examples: `prose-sds-header-xl-600-wide`, `prose-sds-body-s-400-wide`
- Use SDS font families: `font-sds-body`, `font-sds-header`, `font-sds-code`
- Use SDS font weights: `font-sds-regular`, `font-sds-semibold`

## Component Mapping Rules

### SDS Component Priority
- **Always prefer SDS components** over custom implementations
- Import from `@czi-sds/components`: `import { Button, Icon, Link } from "@czi-sds/components"`
- Use SDS-specific props: `sdsStyle`, `sdsType`, `sdsSize`, `sdsIcon`

### Common Figma → SDS Mappings
- **Figma Buttons** → `<Button sdsStyle="square|rounded|minimal" sdsType="primary|secondary">`
- **Figma Icons** → `<Icon sdsIcon="IconName" sdsSize="xs|s|m|l|xl">`
- **Figma Input Fields** → `<InputText>`, `<InputSlider>`, `<Autocomplete>`
- **Figma Cards/Containers** → Use SDS spacing classes with `<div>` elements

### Layout Translation
- **Figma Auto Layout** → Tailwind Flexbox: `flex`, `flex-col`, `items-center`, `justify-between`
- **Figma Grid** → Tailwind Grid: `grid`, `grid-cols-{n}`, `gap-sds-{size}`
- **Figma Constraints** → Tailwind responsive utilities: `w-full`, `max-w-{size}`, `mx-auto`

## Implementation Guidelines

### Code Structure
- Follow fractal file structure with colocated components
- Use TypeScript interfaces for props
- Implement responsive design with SDS breakpoints: `xs`, `sm`, `md`, `lg`, `xl`

### Accessibility
- Include ARIA labels and semantic HTML
- Use SDS color tokens that meet contrast requirements
- Follow SDS accessibility patterns for interactive elements

### Best Practices
- Extract repeated spacing patterns into reusable components
- Use SDS design tokens consistently across related components
- Document any deviations from SDS patterns with comments explaining why
- Test components in both light and dark modes

## Examples

### Good - Using SDS Values
```tsx
import { Button, Icon } from "@czi-sds/components";

<div className="flex items-center gap-sds-m p-sds-l">
  <Button sdsStyle="square" sdsType="primary" className="font-sds-semibold">
    Save Changes
  </Button>
  <Icon sdsIcon="Save" sdsSize="s" />
</div>
```

### Avoid - Hardcoded Values
```tsx
// Don't do this
<div className="flex items-center gap-4 p-6">
  <button className="bg-blue-500 px-4 py-2 font-bold">
    Save Changes
  </button>
  <svg className="w-4 h-4">...</svg>
</div>
```

## Design System Integration

- Always check Zeroheight documentation for component usage guidelines
- Verify SDS component APIs before implementing
- Use SDS Storybook for component examples and prop references
- When in doubt, prefer SDS patterns over custom solutions
