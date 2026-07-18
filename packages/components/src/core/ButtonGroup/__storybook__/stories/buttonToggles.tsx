import { Args } from "@storybook/react-vite";
import React, { useState } from "react";
import RawButtonGroup from "@components/src/core/ButtonGroup";
import ButtonToggle from "@components/src/core/ButtonToggle";
import Icon from "@components/src/core/Icon";
import { StyledBackgroundAppearanceWrapper } from "@components/src/core/Button/style";

const BUTTON_TOGGLES = [
  { ariaLabel: "Search", icon: "Search" },
  { ariaLabel: "Copy", icon: "Copy" },
  { ariaLabel: "Code", icon: "Code" },
  { ariaLabel: "Cube", icon: "Cube" },
] as const;

export const ButtonGroupButtonToggles = (props: Args): JSX.Element => {
  const { size, ...rest } = props;
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>(
    {}
  );

  const handleToggle = (key: string) => {
    setActiveToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <StyledBackgroundAppearanceWrapper
      backgroundAppearance={props.backgroundAppearance}
    >
      <RawButtonGroup {...rest} size={size}>
        {BUTTON_TOGGLES.map(({ ariaLabel, icon }) => (
          <ButtonToggle
            key={ariaLabel}
            aria-label={ariaLabel}
            startIcon={<Icon sdsIcon={icon} sdsSize="s" />}
            sdsStage={activeToggles[ariaLabel] ? "on" : "off"}
            sdsStyle="outline"
            sdsType={props.sdsType}
            onClick={() => handleToggle(ariaLabel)}
            backgroundAppearance={props.backgroundAppearance}
          />
        ))}
      </RawButtonGroup>
    </StyledBackgroundAppearanceWrapper>
  );
};
