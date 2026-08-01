# SDS Documentation Adherence Rules

These rules guide AI assistants in using the SDS documentation to ensure accurate implementation of the CZI Science Design System (SDS).

## Documentation as Source of Truth

The documentation served by `get_component_docs` is generated from the component
documentation that ships with the SDS repository and renders in Storybook. It is
the same content the design system team maintains, so it describes the library as
it actually is rather than as it once was.

### Component Usage Guidelines

- **Always call `get_component_docs`** before implementing a component
- Follow documented usage patterns and restrictions
- Respect component do's and don'ts specified in documentation
- Use documented prop combinations and avoid deprecated patterns

### API Documentation Priority

- **Component documentation overrides assumptions**
- Check documented prop options with `get_component_props` before implementing
- Follow documented accessibility requirements
- Use the code examples in the documentation as implementation templates

## Component Implementation Rules

### Props and Configuration

- **Use only documented prop values** and combinations
- Follow documented prop hierarchies (e.g., `sdsStyle` + `sdsType` combinations)
- Respect documented prop requirements (required vs optional)
- Note where a component departs from the MUI component it wraps; each page has
  an "SDS vs MUI" section covering exactly this

### Usage Patterns

- **Follow documented composition patterns**:
  - How components should be combined (e.g., Button + Icon)
  - Proper nesting relationships (e.g., AccordionHeader in Accordion)
  - Layout recommendations for component groups

### Accessibility Requirements

- **Implement documented accessibility patterns**
- Use documented ARIA patterns and labels
- Follow documented keyboard navigation requirements
- Implement documented focus management patterns

## Content and Copy Guidelines

### Terminology

- **Use SDS-approved terminology** from the documentation
- Follow documented naming conventions for UI elements
- Use consistent language patterns across components
- Respect documented content guidelines (e.g., button text patterns)

### Microcopy Standards

- **Follow documented content standards** for:
  - Error messages and validation text
  - Placeholder text patterns
  - Help text and tooltips
  - Loading and empty states

## Visual Implementation

### Design Specifications

- **Use design tokens rather than literal values.** `get_tailwind_tokens`
  returns the full set, covering:
  - Spacing measurements and relationships
  - Typography specifications
  - Color usage in different contexts
  - Corners, borders, and drop shadows
- Never hard-code a value that a token already expresses

### Responsive Behavior

- **Implement documented responsive patterns**
- Follow documented breakpoint behavior
- Use documented mobile adaptations
- Implement documented touch interaction patterns

## Integration Guidelines

### Framework Integration

- **Follow documented framework-specific guidance**
- Use documented integration patterns for React/Next.js
- Implement documented data binding patterns
- Follow documented performance recommendations

### State Management

- **Implement documented state patterns**:
  - Form state management recommendations
  - Loading and error state handling
  - User interaction state patterns
  - Data validation approaches

## Quality Assurance

### Implementation Validation

- **Cross-reference implementation with the documented code examples.** Every
  documented variation of a component ships with the source of a working
  example; prefer adapting one over writing from scratch
- Verify component behavior matches those examples
- Test edge cases mentioned in documentation
- Validate accessibility implementation against documented requirements

### Documentation Gaps

- **When documentation is unclear or missing**:
  - Use the component's Storybook stories as a secondary reference
  - Follow established SDS patterns from similar components
  - Document any assumptions made for future clarification
  - Prefer conservative/minimal implementations

## Best Practices

### Documentation Workflow

1. **Always call `get_component_docs` first** before implementing any SDS component
2. **Read the full component documentation** including usage guidelines
3. **Review the code examples** provided in the documentation
4. **Check for any usage restrictions** or warnings
5. **Validate implementation** against the documented examples

### Staying Current

- **Documentation updates**: the docs are generated from the installed version of
  the library, so they describe the components you are actually building against
- **Version compatibility**: check documented version compatibility
- **Deprecation notices**: follow documented migration paths for deprecated patterns
- **New features**: use documented new features rather than workarounds

### Implementation Priority Order

1. **Component documentation** via `get_component_docs` (primary source of truth)
2. **Prop definitions** via `get_component_props` (authoritative types and defaults)
3. **Design tokens** via `get_tailwind_tokens` (spacing, color, typography)
4. **Existing codebase patterns** (established usage in project)

## Common Documentation Patterns

### Component Pages Structure

- **Source Code**: a link to the component's implementation
- **SDS vs MUI**: how the SDS component differs from the MUI one it wraps
- **MUI Documentation**: a link to the underlying component's own docs
- **Props**: the SDS and MUI props required for implementation
- **Code examples**: one runnable example per supported variation

### Information Hierarchy

- **Design Guidelines** → Visual specifications and usage
- **Development Guidelines** → Implementation requirements
- **Accessibility Guidelines** → WCAG compliance patterns
- **Content Guidelines** → Copy and terminology standards

## Troubleshooting with Documentation

### When Implementation Doesn't Match Design

1. **Check the documentation for variant coverage**
2. **Look for conditional usage patterns**
3. **Verify responsive behavior specifications**
4. **Check for theme-specific implementations**

### When Behavior Seems Unexpected

1. **Review documented component lifecycle**
2. **Check for documented state management patterns**
3. **Verify prop combination compatibility**
4. **Look for documented browser-specific considerations**

## Documentation-Driven Development

### Implementation Process

1. **Read documentation thoroughly** before writing code
2. **Plan implementation** based on documented patterns
3. **Code with documentation open** for reference
4. **Test against documented examples**
5. **Document any deviations** with rationale

This ensures all SDS implementations are consistent with the official design system documentation and reduces implementation errors.
