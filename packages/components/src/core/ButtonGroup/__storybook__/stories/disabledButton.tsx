import { Args } from "@storybook/react-vite";
import React from "react";
import RawButtonGroup from "@components/src/core/ButtonGroup";
import Button from "@components/src/core/Button";
import Icon from "@components/src/core/Icon";
import { StyledBackgroundAppearanceWrapper } from "@components/src/core/Button/style";
import { useMediaQuery, useTheme } from "@mui/material";

export const ButtonGroupDisabledButton = (props: Args): JSX.Element => {
  const { size, ...rest } = props;
  const theme = useTheme();

  const DynamicGapWide =
    size === "small" ? "8px" : size === "medium" ? "10px" : "12px";
  const DynamicGapNarrow =
    size === "small" ? "10px" : size === "medium" ? "12px" : "14px";
  const DynamicGap = useMediaQuery(theme?.breakpoints?.down("md"))
    ? DynamicGapNarrow
    : DynamicGapWide;

  return (
    <StyledBackgroundAppearanceWrapper
      backgroundAppearance={props.backgroundAppearance}
    >
      <div
        style={{ display: "flex", flexDirection: "column", gap: DynamicGap }}
      >
        <RawButtonGroup {...rest} orientation="horizontal" size={size}>
          <Button disabled aria-label="Download">
            <Icon sdsIcon="Download" sdsSize="s" />
          </Button>
          <Button aria-label="Copy">
            <Icon sdsIcon="Copy" sdsSize="s" />
          </Button>
          <Button aria-label="Cube">
            <Icon sdsIcon="Cube" sdsSize="s" />
          </Button>
          <Button aria-label="Github">
            <Icon sdsIcon="Github" sdsSize="s" />
          </Button>
          <Button aria-label="Edit">
            <Icon sdsIcon="Edit" sdsSize="s" />
          </Button>
        </RawButtonGroup>

        <RawButtonGroup {...rest} orientation="horizontal" size={size}>
          <Button aria-label="Download">
            <Icon sdsIcon="Download" sdsSize="s" />
          </Button>
          <Button aria-label="Copy">
            <Icon sdsIcon="Copy" sdsSize="s" />
          </Button>
          <Button disabled aria-label="Cube">
            <Icon sdsIcon="Cube" sdsSize="s" />
          </Button>
          <Button aria-label="Github">
            <Icon sdsIcon="Github" sdsSize="s" />
          </Button>
          <Button aria-label="Edit">
            <Icon sdsIcon="Edit" sdsSize="s" />
          </Button>
        </RawButtonGroup>

        <RawButtonGroup {...rest} orientation="horizontal" size={size}>
          <Button aria-label="Download">
            <Icon sdsIcon="Download" sdsSize="s" />
          </Button>
          <Button aria-label="Copy">
            <Icon sdsIcon="Copy" sdsSize="s" />
          </Button>
          <Button disabled aria-label="Cube">
            <Icon sdsIcon="Cube" sdsSize="s" />
          </Button>
          <Button disabled aria-label="Github">
            <Icon sdsIcon="Github" sdsSize="s" />
          </Button>
          <Button aria-label="Edit">
            <Icon sdsIcon="Edit" sdsSize="s" />
          </Button>
        </RawButtonGroup>

        <RawButtonGroup {...rest} orientation="horizontal" size={size}>
          <Button aria-label="Download">
            <Icon sdsIcon="Download" sdsSize="s" />
          </Button>
          <Button aria-label="Copy">
            <Icon sdsIcon="Copy" sdsSize="s" />
          </Button>
          <Button aria-label="Cube">
            <Icon sdsIcon="Cube" sdsSize="s" />
          </Button>
          <Button aria-label="Github">
            <Icon sdsIcon="Github" sdsSize="s" />
          </Button>
          <Button disabled aria-label="Edit">
            <Icon sdsIcon="Edit" sdsSize="s" />
          </Button>
        </RawButtonGroup>

        <div style={{ display: "flex", gap: DynamicGap }}>
          <RawButtonGroup {...rest} orientation="vertical" size={size}>
            <Button disabled aria-label="Download">
              <Icon sdsIcon="Download" sdsSize="s" />
            </Button>
            <Button aria-label="Copy">
              <Icon sdsIcon="Copy" sdsSize="s" />
            </Button>
            <Button aria-label="Cube">
              <Icon sdsIcon="Cube" sdsSize="s" />
            </Button>
            <Button aria-label="Github">
              <Icon sdsIcon="Github" sdsSize="s" />
            </Button>
            <Button aria-label="Edit">
              <Icon sdsIcon="Edit" sdsSize="s" />
            </Button>
          </RawButtonGroup>

          <RawButtonGroup {...rest} orientation="vertical" size={size}>
            <Button aria-label="Download">
              <Icon sdsIcon="Download" sdsSize="s" />
            </Button>
            <Button aria-label="Copy">
              <Icon sdsIcon="Copy" sdsSize="s" />
            </Button>
            <Button disabled aria-label="Cube">
              <Icon sdsIcon="Cube" sdsSize="s" />
            </Button>
            <Button aria-label="Github">
              <Icon sdsIcon="Github" sdsSize="s" />
            </Button>
            <Button aria-label="Edit">
              <Icon sdsIcon="Edit" sdsSize="s" />
            </Button>
          </RawButtonGroup>

          <RawButtonGroup {...rest} orientation="vertical" size={size}>
            <Button aria-label="Download">
              <Icon sdsIcon="Download" sdsSize="s" />
            </Button>
            <Button aria-label="Copy">
              <Icon sdsIcon="Copy" sdsSize="s" />
            </Button>
            <Button disabled aria-label="Cube">
              <Icon sdsIcon="Cube" sdsSize="s" />
            </Button>
            <Button disabled aria-label="Github">
              <Icon sdsIcon="Github" sdsSize="s" />
            </Button>
            <Button aria-label="Edit">
              <Icon sdsIcon="Edit" sdsSize="s" />
            </Button>
          </RawButtonGroup>

          <RawButtonGroup {...rest} orientation="vertical" size={size}>
            <Button aria-label="Download">
              <Icon sdsIcon="Download" sdsSize="s" />
            </Button>
            <Button aria-label="Copy">
              <Icon sdsIcon="Copy" sdsSize="s" />
            </Button>
            <Button aria-label="Cube">
              <Icon sdsIcon="Cube" sdsSize="s" />
            </Button>
            <Button aria-label="Github">
              <Icon sdsIcon="Github" sdsSize="s" />
            </Button>
            <Button disabled aria-label="Edit">
              <Icon sdsIcon="Edit" sdsSize="s" />
            </Button>
          </RawButtonGroup>
        </div>
      </div>
    </StyledBackgroundAppearanceWrapper>
  );
};
