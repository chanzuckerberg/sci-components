import { Args } from "@storybook/react-vite";
import React from "react";
import { DownloadSimpleIcon, InfoIcon } from "@phosphor-icons/react";
import RawButtonGroup from "@components/src/core/ButtonGroup";
import Button from "@components/src/core/Button";
import { StyledBackgroundAppearanceWrapper } from "@components/src/core/Button/style";
import Callout from "@components/src/core/Callout";

export const ButtonGroup = (props: Args): JSX.Element => {
  const { size, orientation, ...rest } = props;

  return (
    <StyledBackgroundAppearanceWrapper
      backgroundAppearance={props.backgroundAppearance}
    >
      {orientation === "vertical" && (
        <Callout
          intent="notice"
          title="Notice!"
          sdsStyle="persistent"
          icon={<InfoIcon weight="bold" />}
          body={
            <>
              The <strong>Vertical</strong> orientation is only available when
              all buttons are icon-only!
              <br />
              Please use the <strong>Horizontal</strong> orientation instead.
            </>
          }
        />
      )}
      <RawButtonGroup {...rest} size={size}>
        <Button aria-label="Download">
          <DownloadSimpleIcon weight="bold" />
        </Button>
        <Button startIcon={<DownloadSimpleIcon weight="bold" />}>Label</Button>
        <Button>Label</Button>
      </RawButtonGroup>
    </StyledBackgroundAppearanceWrapper>
  );
};
