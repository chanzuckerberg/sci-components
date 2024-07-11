export function focusVisibleA11yStyle() {
  return `
      &.Mui-focusVisible, &:focus-visible {
        outline: 2px solid black;
        outline-offset: 1px;
      }
  `;
}
