import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Checkbox from "./index";

const actions = {
  onClick: action("onClick"),
};

const StyledCheckbox = styled(Checkbox)`
  &:hover {
    background-color: transparent;

    &.Mui-checked {
      background-color: transparent;
    }
  }
`;

storiesOf("Checkbox", module).add("primary", () => (
  <StyledCheckbox color="primary" onClick={actions.onClick} />
));
