import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButtonGroupV2 from "src/core/ButtonGroupV2";
import { Button } from "@mui/material";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawButtonGroupV2 {...props} data-testid="button-group">
      <Button data-testid="button-group-button-1">One</Button>
      <Button data-testid="button-group-button-2">Two</Button>
      <Button data-testid="button-group-button-3">Three</Button>
    </RawButtonGroupV2>
  );
};
