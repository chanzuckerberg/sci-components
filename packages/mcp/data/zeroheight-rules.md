# Zeroheight Documentation Adherence Rules

These rules guide Claude Code when using Zeroheight documentation to ensure accurate implementation of the CZI Science Design System (SDS).

## Documentation as Source of Truth

### Component Usage Guidelines
- **Always reference Zeroheight documentation** for component usage guidelines
- Follow documented usage patterns and restrictions
- Respect component do's and don'ts specified in documentation
- Use documented prop combinations and avoid deprecated patterns

### API Documentation Priority
- **Zeroheight component documentation overrides assumptions**
- Check documented prop options before implementing
- Follow documented accessibility requirements
- Use documented examples as implementation templates

## Component Implementation Rules

### Props and Configuration
- **Use only documented prop values** and combinations
- Follow documented prop hierarchies (e.g., `sdsStyle` + `sdsType` combinations)
- Respect documented prop requirements (required vs optional)
- Check Zeroheight for component-specific prop validation rules

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
- **Use SDS-approved terminology** from Zeroheight glossary
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
- **Extract exact specifications** from Zeroheight:
  - Spacing measurements and relationships
  - Typography specifications  
  - Color usage in different contexts
  - Component states and variations

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
- **Cross-reference implementation with Zeroheight examples**
- Verify component behavior matches documented examples
- Test edge cases mentioned in documentation
- Validate accessibility implementation against documented requirements

### Documentation Gaps
- **When documentation is unclear or missing**:
  - Use SDS Storybook as secondary reference
  - Follow established SDS patterns from similar components
  - Document any assumptions made for future clarification
  - Prefer conservative/minimal implementations

## Best Practices

### Documentation Workflow
1. **Always check Zeroheight first** before implementing any SDS component
2. **Read the full component documentation** including usage guidelines
3. **Review examples and code snippets** provided in documentation
4. **Check for any usage restrictions** or warnings
5. **Validate implementation** against documented examples

### Staying Current
- **Documentation updates**: Assume Zeroheight content is most current
- **Version compatibility**: Check documented version compatibility
- **Deprecation notices**: Follow documented migration paths for deprecated patterns
- **New features**: Use documented new features rather than workarounds

### Implementation Priority Order
1. **Zeroheight documentation** (primary source of truth)
2. **SDS Storybook** (implementation examples and edge cases)  
3. **TypeScript interfaces** (technical prop definitions)
4. **Existing codebase patterns** (established usage in project)

## Common Documentation Patterns

### Component Pages Structure
- **Overview**: Component purpose and when to use
- **Usage Guidelines**: Do's and don'ts with examples
- **Props/API**: Detailed prop documentation
- **Examples**: Code snippets and live examples
- **Accessibility**: ARIA patterns and keyboard navigation
- **Related Components**: Integration recommendations

### Information Hierarchy
- **Design Guidelines** → Visual specifications and usage
- **Development Guidelines** → Implementation requirements
- **Accessibility Guidelines** → WCAG compliance patterns
- **Content Guidelines** → Copy and terminology standards

## Troubleshooting with Documentation

### When Implementation Doesn't Match Design
1. **Check Zeroheight for variant documentation**
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
