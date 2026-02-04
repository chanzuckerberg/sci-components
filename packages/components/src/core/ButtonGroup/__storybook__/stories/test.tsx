import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButtonGroup from "src/core/ButtonGroup";
import Button from "src/core/Button";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawButtonGroup {...props} data-testid="button-group">
      <Button data-testid="button-group-button-1">One</Button>
      <Button data-testid="button-group-button-2">Two</Button>
      <Button data-testid="button-group-button-3">Three</Button>
    </RawButtonGroup>
  );
};
