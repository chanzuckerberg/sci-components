import { Args } from "@storybook/react-vite";
import React, { useState } from "react";
import {
  CodeIcon,
  CopyIcon,
  CubeIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import RawButtonGroup from "@components/src/core/ButtonGroup";
import ButtonToggle from "@components/src/core/ButtonToggle";
import { StyledBackgroundAppearanceWrapper } from "@components/src/core/Button/style";

const BUTTON_TOGGLES = [
  { ariaLabel: "Search", icon: <MagnifyingGlassIcon weight="bold" /> },
  { ariaLabel: "Copy", icon: <CopyIcon weight="bold" /> },
  { ariaLabel: "Code", icon: <CodeIcon weight="bold" /> },
  { ariaLabel: "Cube", icon: <CubeIcon weight="bold" /> },
];

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
            startIcon={icon}
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
