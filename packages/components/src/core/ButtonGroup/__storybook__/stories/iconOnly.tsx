import { Args } from "@storybook/react-vite";
import React from "react";
import {
  CopyIcon,
  DownloadSimpleIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import RawButtonGroup from "@components/src/core/ButtonGroup";
import Button from "@components/src/core/Button";
import { StyledBackgroundAppearanceWrapper } from "@components/src/core/Button/style";

export const ButtonGroupIconOnly = (props: Args): JSX.Element => {
  const { size, ...rest } = props;

  return (
    <StyledBackgroundAppearanceWrapper
      backgroundAppearance={props.backgroundAppearance}
    >
      <RawButtonGroup {...rest} size={size}>
        <Button aria-label="Download">
          <DownloadSimpleIcon weight="bold" />
        </Button>
        <Button aria-label="Copy">
          <CopyIcon weight="bold" />
        </Button>
        <Button aria-label="Edit">
          <PencilSimpleIcon weight="bold" />
        </Button>
      </RawButtonGroup>
    </StyledBackgroundAppearanceWrapper>
  );
};
