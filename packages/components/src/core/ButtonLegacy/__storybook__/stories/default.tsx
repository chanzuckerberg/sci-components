import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButtonLegacy from "src/core/ButtonLegacy";
import Callout from "src/core/Callout";
import Icon, { IconNameToSizes } from "src/core/Icon";

const ButtonIconSizeToSdsIconSize = {
  large: "xl",
  medium: "l",
  small: "s",
};

export const InvalidIconButtonPropsError = (
  <Callout
    intent="negative"
    title="Invalid Props!"
    body={
      <>
        The <strong>icon</strong> styled Button must include an icon. Please
        choose an icon from from the controls section.
      </>
    }
  />
);

export const InvalidSdsTypeTertiaryError = (
  <Callout
    intent="negative"
    title="Invalid Props!"
    body={
      <>
        Only buttons with the <strong>icon</strong> style can have the{" "}
        <strong>tertiary</strong> type. Please select another type, either{" "}
        <strong>primary</strong> or <strong>secondary</strong>.
      </>
    }
  />
);

export const InvalidSdsTypeDestructiveError = (
  <Callout
    intent="negative"
    title="Invalid Props!"
    body={
      <>
        Buttons with the <strong>icon</strong> or <strong>minimal</strong>{" "}
        styles cannot have the <strong>destructive</strong> type. Please choose
        another type, such as <strong>square</strong> or{" "}
        <strong>rounded</strong>.
      </>
    }
  />
);

const FinalIconSize = (sdsStyle: string, sdsSize: string) => {
  return sdsStyle === "minimal"
    ? "xs"
    : sdsStyle === "icon"
      ? ButtonIconSizeToSdsIconSize[
          sdsSize as keyof typeof ButtonIconSizeToSdsIconSize
        ]
      : "s";
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const ButtonLegacy = (props: Args): JSX.Element => {
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

  if (
    (sdsStyle === "icon" || sdsStyle === "minimal") &&
    sdsType === "destructive"
  ) {
    return InvalidSdsTypeDestructiveError;
  }

  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>ButtonLegacy</strong> component is deprecated!
            <br />
            Please use <strong>Button</strong> component instead.
          </>
        }
      />
      <RawButtonLegacy
        {...props}
        sdsStyle={sdsStyle}
        startIcon={startIconFinal}
        endIcon={endIconFinal}
      >
        {text}
      </RawButtonLegacy>
    </>
  );
};
