import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButtonGroup from "src/core/ButtonGroup";
import Button from "src/core/Button";
import Icon from "src/core/Icon";
import { StyledBackgroundAppearanceWrapper } from "src/core/Button/style";

export const ButtonGroupIconOnly = (props: Args): JSX.Element => {
  const { size, ...rest } = props;

  return (
    <StyledBackgroundAppearanceWrapper
      backgroundAppearance={props.backgroundAppearance}
    >
      <RawButtonGroup {...rest} size={size}>
        <Button aria-label="Download">
          <Icon sdsIcon="Download" sdsSize="s" />
        </Button>
        <Button aria-label="Copy">
          <Icon sdsIcon="Copy" sdsSize="s" />
        </Button>
        <Button aria-label="Edit">
          <Icon sdsIcon="Edit" sdsSize="s" />
        </Button>
      </RawButtonGroup>
    </StyledBackgroundAppearanceWrapper>
  );
};
