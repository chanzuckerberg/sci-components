import css from "@emotion/css";
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Checkbox from ".";

const base = css`
  color: hotpink;
`;
console.log(base);

export const actions = {
  onClick: action("onClick"),
};

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

const StyledCheckbox = styled(Checkbox)`
  &:hover {
    background-color: transparent;

    &.Mui-checked {
      // last resort!
      // background-color: transparent;
    }
  }
`;

// const classes = useStyles();

storiesOf("Checkbox", module).add("primary", () => (
  <StyledCheckbox color="primary" {...actions} />
));
