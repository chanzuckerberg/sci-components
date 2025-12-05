import { CommonThemeProps, getSemanticColors } from "../selectors/theme";

export function focusVisibleA11yStyle(props: CommonThemeProps) {
  const semanticColors = getSemanticColors(props);

  return `
      &.Mui-focusVisible, &:focus-visible {
        outline: 2px solid ${semanticColors?.base?.borderPrimaryInteraction};
        outline-offset: 1px;
      }
  `;
}
