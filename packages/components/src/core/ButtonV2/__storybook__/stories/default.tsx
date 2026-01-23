import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButton from "src/core/ButtonV2";
import Callout from "src/core/Callout";
import Icon, { IconNameToSizes } from "src/core/Icon";

export const InvalidIconButtonPropsError = (
  <Callout
    intent="negative"
    title="Invalid Props!"
    body={
      <>
        The button must include either a <strong>startIcon</strong> or{" "}
        <strong>endIcon</strong>, or both, or a <strong>children</strong> prop.
        Please choose one of the following options:
        <ul>
          <li>
            <strong>startIcon</strong>: The icon to display on the left of the
            button.
          </li>
          <li>
            <strong>endIcon</strong>: The icon to display on the right of the
            button.
          </li>
          <li>
            <strong>children</strong>: The content to display inside the button.
          </li>
        </ul>
      </>
    }
  />
);

// eslint-disable-next-line sonarjs/cognitive-complexity
export const Button = (props: Args): JSX.Element => {
  const { sdsStyle, startIcon, endIcon, size, children } = props;

  let startIconFinal = startIcon;
  let endIconFinal = endIcon;

  const iconSize = size === "large" ? "s" : size === "medium" ? "xs" : "xxs";

  if (startIcon) {
    if (typeof startIcon !== "string") {
      startIconFinal = React.cloneElement(startIcon, {
        sdsSize: iconSize,
      });
    } else {
      startIconFinal = (
        <Icon sdsIcon={startIcon as keyof IconNameToSizes} sdsSize={iconSize} />
      );
    }
  }

  if (endIcon) {
    if (typeof endIcon !== "string") {
      endIconFinal = React.cloneElement(endIcon, {
        sdsSize: iconSize,
      });
    } else {
      endIconFinal = (
        <Icon sdsIcon={endIcon as keyof IconNameToSizes} sdsSize={iconSize} />
      );
    }
  }

  if (
    startIcon === undefined &&
    endIcon === undefined &&
    (children === undefined || children === null || children === "")
  ) {
    return InvalidIconButtonPropsError;
  }

  return (
    <RawButton
      {...props}
      sdsStyle={sdsStyle}
      startIcon={startIconFinal}
      endIcon={endIconFinal}
    />
  );
};
