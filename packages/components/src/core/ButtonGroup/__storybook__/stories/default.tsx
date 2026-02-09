import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButtonGroup from "src/core/ButtonGroup";
import Button from "src/core/Button";
import Icon from "src/core/Icon";
import { StyledBackgroundAppearanceWrapper } from "src/core/Button/style";
import Callout from "src/core/Callout";

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
          icon={<Icon sdsIcon="InfoCircle" sdsSize="s" />}
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
          <Icon sdsIcon="Download" sdsSize="s" />
        </Button>
        <Button startIcon={<Icon sdsIcon="Download" sdsSize="s" />}>
          Label
        </Button>
        <Button>Label</Button>
      </RawButtonGroup>
    </StyledBackgroundAppearanceWrapper>
  );
};
