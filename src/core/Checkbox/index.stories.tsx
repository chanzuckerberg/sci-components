import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Checkbox from ".";

export const actions = {
  onClick: action("onClick"),
};

const StyledCheckbox = styled(Checkbox)`
  // padding: 32px;
  // background-color: blue;
  // font-size: 24px;
  // border-radius: 10px;
  // color: black;
  // font-weight: bold;
  &:hover {
    background-color: transparent;

    &.Mui-checked {
      background-color: transparent;
    }
  }
`;

storiesOf("Checkbox", module).add("primary", () => (
  <StyledCheckbox color="primary" {...actions} />
));
