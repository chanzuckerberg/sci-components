import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButtonGroup from "src/core/ButtonGroup";
import ButtonV2 from "src/core/ButtonV2";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawButtonGroup {...props} data-testid="button-group">
      <ButtonV2 data-testid="button-group-button-1">One</ButtonV2>
      <ButtonV2 data-testid="button-group-button-2">Two</ButtonV2>
      <ButtonV2 data-testid="button-group-button-3">Three</ButtonV2>
    </RawButtonGroup>
  );
};
