export function focusVisibleA11yStyle() {
  return `
      &.Mui-focusVisible, &:focus-visible {
        outline: 5px auto Highlight;
        outline: 5px auto -webkit-focus-ring-color;
      }
  `;
}
