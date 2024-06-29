export function focusVisibleA11yStyle() {
  return `
      &.Mui-focusVisible, &:focus-visible {
        outline: 2px solid black;
        outline-offset: 1px;
      }
  `;
}

export function focusA11yStyle() {
  return `
    &.Mui-focused, &:focus {
      outline: 2px solid black !important;
      outline-offset: 1px !important;
    }  
  `;
}
