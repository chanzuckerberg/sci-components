import { Args } from "@storybook/react";
import React from "react";
import RawButton from "src/core/Button";
import Callout from "src/core/Callout";
import CalloutTitle from "src/core/Callout/components/CalloutTitle";
import Icon, { IconNameToSizes } from "src/core/Icon";

const ButtonIconSizeToSdsIconSize = {
  large: "xl",
  medium: "l",
  small: "s",
};

const InvalidIconButtonPropsError = (
  <Callout intent="negative">
    <CalloutTitle>Invalid Props!</CalloutTitle>
    <p>
      The icon styled Button must include an icon. Please choose an icon from
      from the controls section.
    </p>
  </Callout>
);

const InvalidSdsTypeTertiaryError = (
  <Callout intent="negative">
    <CalloutTitle>Invalid Props!</CalloutTitle>
    <p>
      Only buttons with the icon style can have the tertiary type. Please select
      another type, either primary or secondary.
    </p>
  </Callout>
);

const InvalidSdsTypeDestructiveError = (
  <Callout intent="negative">
    <CalloutTitle>Invalid Props!</CalloutTitle>
    <p>
      Buttons with the &apos;icon&apos; style cannot have the
      &apos;destructive&apos; type. Please choose another type, such as
      &apos;square&apos;, &apos;rounded&apos;, or &apos;minimal&apos;.
    </p>
  </Callout>
);

const FinalIconSize = (sdsStyle: string, sdsSize: string) => {
  return sdsStyle === "minimal"
    ? "s"
    : sdsStyle === "icon"
      ? ButtonIconSizeToSdsIconSize[
          sdsSize as keyof typeof ButtonIconSizeToSdsIconSize
        ]
      : "l";
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const Button = (props: Args): JSX.Element => {
  const { sdsType, sdsStyle, sdsSize, text, startIcon, endIcon, icon } = props;

  const finalIconSize = FinalIconSize(sdsStyle, sdsSize);

  let startIconFinal = startIcon;
  let endIconFinal = endIcon;

  if (startIcon && finalIconSize) {
    if (typeof startIcon !== "string") {
      startIconFinal = React.cloneElement(startIcon, {
        sdsSize: finalIconSize,
      });
    } else {
      startIconFinal = (
        <Icon
          sdsIcon={startIcon as keyof IconNameToSizes}
          sdsType="button"
          sdsSize={finalIconSize as typeof sdsSize}
        />
      );
    }
  }

  if (endIcon && finalIconSize) {
    if (typeof endIcon !== "string") {
      endIconFinal = React.cloneElement(endIcon, {
        sdsSize: finalIconSize,
      });
    } else {
      endIconFinal = (
        <Icon
          sdsIcon={endIcon as keyof IconNameToSizes}
          sdsType="button"
          sdsSize={finalIconSize as typeof sdsSize}
        />
      );
    }
  }

  if (sdsStyle === "icon" && icon === undefined) {
    return InvalidIconButtonPropsError;
  }

  if (sdsStyle !== "icon" && sdsType === "tertiary") {
    return InvalidSdsTypeTertiaryError;
  }

  if (sdsStyle === "icon" && sdsType === "destructive") {
    return InvalidSdsTypeDestructiveError;
  }

  return (
    <RawButton
      sdsType={sdsType}
      sdsStyle={sdsStyle}
      sdsSize={sdsSize}
      {...props}
      startIcon={startIconFinal}
      endIcon={endIconFinal}
    >
      {text}
    </RawButton>
  );
};
