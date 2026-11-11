import { Args } from "@storybook/react-vite";
import React from "react";
import { GitHubIcon } from "@czi-sds/icons";
import {
  CopyIcon,
  CubeIcon,
  DownloadSimpleIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import RawButtonGroup from "@components/src/core/ButtonGroup";
import Button from "@components/src/core/Button";
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
            <DownloadSimpleIcon weight="bold" />
          </Button>
          <Button aria-label="Copy">
            <CopyIcon weight="bold" />
          </Button>
          <Button aria-label="Cube">
            <CubeIcon weight="bold" />
          </Button>
          <Button aria-label="Github">
            <GitHubIcon weight="bold" />
          </Button>
          <Button aria-label="Edit">
            <PencilSimpleIcon weight="bold" />
          </Button>
        </RawButtonGroup>

        <RawButtonGroup {...rest} orientation="horizontal" size={size}>
          <Button aria-label="Download">
            <DownloadSimpleIcon weight="bold" />
          </Button>
          <Button aria-label="Copy">
            <CopyIcon weight="bold" />
          </Button>
          <Button disabled aria-label="Cube">
            <CubeIcon weight="bold" />
          </Button>
          <Button aria-label="Github">
            <GitHubIcon weight="bold" />
          </Button>
          <Button aria-label="Edit">
            <PencilSimpleIcon weight="bold" />
          </Button>
        </RawButtonGroup>

        <RawButtonGroup {...rest} orientation="horizontal" size={size}>
          <Button aria-label="Download">
            <DownloadSimpleIcon weight="bold" />
          </Button>
          <Button aria-label="Copy">
            <CopyIcon weight="bold" />
          </Button>
          <Button disabled aria-label="Cube">
            <CubeIcon weight="bold" />
          </Button>
          <Button disabled aria-label="Github">
            <GitHubIcon weight="bold" />
          </Button>
          <Button aria-label="Edit">
            <PencilSimpleIcon weight="bold" />
          </Button>
        </RawButtonGroup>

        <RawButtonGroup {...rest} orientation="horizontal" size={size}>
          <Button aria-label="Download">
            <DownloadSimpleIcon weight="bold" />
          </Button>
          <Button aria-label="Copy">
            <CopyIcon weight="bold" />
          </Button>
          <Button aria-label="Cube">
            <CubeIcon weight="bold" />
          </Button>
          <Button aria-label="Github">
            <GitHubIcon weight="bold" />
          </Button>
          <Button disabled aria-label="Edit">
            <PencilSimpleIcon weight="bold" />
          </Button>
        </RawButtonGroup>

        <div style={{ display: "flex", gap: DynamicGap }}>
          <RawButtonGroup {...rest} orientation="vertical" size={size}>
            <Button disabled aria-label="Download">
              <DownloadSimpleIcon weight="bold" />
            </Button>
            <Button aria-label="Copy">
              <CopyIcon weight="bold" />
            </Button>
            <Button aria-label="Cube">
              <CubeIcon weight="bold" />
            </Button>
            <Button aria-label="Github">
              <GitHubIcon weight="bold" />
            </Button>
            <Button aria-label="Edit">
              <PencilSimpleIcon weight="bold" />
            </Button>
          </RawButtonGroup>

          <RawButtonGroup {...rest} orientation="vertical" size={size}>
            <Button aria-label="Download">
              <DownloadSimpleIcon weight="bold" />
            </Button>
            <Button aria-label="Copy">
              <CopyIcon weight="bold" />
            </Button>
            <Button disabled aria-label="Cube">
              <CubeIcon weight="bold" />
            </Button>
            <Button aria-label="Github">
              <GitHubIcon weight="bold" />
            </Button>
            <Button aria-label="Edit">
              <PencilSimpleIcon weight="bold" />
            </Button>
          </RawButtonGroup>

          <RawButtonGroup {...rest} orientation="vertical" size={size}>
            <Button aria-label="Download">
              <DownloadSimpleIcon weight="bold" />
            </Button>
            <Button aria-label="Copy">
              <CopyIcon weight="bold" />
            </Button>
            <Button disabled aria-label="Cube">
              <CubeIcon weight="bold" />
            </Button>
            <Button disabled aria-label="Github">
              <GitHubIcon weight="bold" />
            </Button>
            <Button aria-label="Edit">
              <PencilSimpleIcon weight="bold" />
            </Button>
          </RawButtonGroup>

          <RawButtonGroup {...rest} orientation="vertical" size={size}>
            <Button aria-label="Download">
              <DownloadSimpleIcon weight="bold" />
            </Button>
            <Button aria-label="Copy">
              <CopyIcon weight="bold" />
            </Button>
            <Button aria-label="Cube">
              <CubeIcon weight="bold" />
            </Button>
            <Button aria-label="Github">
              <GitHubIcon weight="bold" />
            </Button>
            <Button disabled aria-label="Edit">
              <PencilSimpleIcon weight="bold" />
            </Button>
          </RawButtonGroup>
        </div>
      </div>
    </StyledBackgroundAppearanceWrapper>
  );
};
