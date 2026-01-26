import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButtonGroup from "src/core/ButtonGroup";
import ButtonV2 from "src/core/ButtonV2";
import Icon from "src/core/Icon";

export const ButtonGroup = (props: Args): JSX.Element => {
  const { size, ...rest } = props;

  return (
    <RawButtonGroup {...rest} size={size}>
      <ButtonV2 aria-label="Download">
        <Icon sdsIcon="Download" sdsSize="s" />
      </ButtonV2>
      <ButtonV2 startIcon={<Icon sdsIcon="Download" sdsSize="s" />}>
        Label
      </ButtonV2>
      <ButtonV2>Label</ButtonV2>
    </RawButtonGroup>
  );
};

export const ButtonGroupIconOnly = (props: Args): JSX.Element => {
  const { size, ...rest } = props;

  return (
    <RawButtonGroup {...rest} size={size}>
      <ButtonV2 aria-label="Download">
        <Icon sdsIcon="Download" sdsSize="s" />
      </ButtonV2>
      <ButtonV2 aria-label="Copy">
        <Icon sdsIcon="Copy" sdsSize="s" />
      </ButtonV2>
      <ButtonV2 aria-label="Edit">
        <Icon sdsIcon="Edit" sdsSize="s" />
      </ButtonV2>
    </RawButtonGroup>
  );
};

export const ButtonGroupDisabledButton = (props: Args): JSX.Element => {
  const { size, ...rest } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <RawButtonGroup {...rest} orientation="horizontal" size={size}>
        <ButtonV2 disabled aria-label="Download">
          <Icon sdsIcon="Download" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Copy">
          <Icon sdsIcon="Copy" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Cube">
          <Icon sdsIcon="Cube" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Github">
          <Icon sdsIcon="Github" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Edit">
          <Icon sdsIcon="Edit" sdsSize="s" />
        </ButtonV2>
      </RawButtonGroup>

      <RawButtonGroup {...rest} orientation="horizontal" size={size}>
        <ButtonV2 aria-label="Download">
          <Icon sdsIcon="Download" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Copy">
          <Icon sdsIcon="Copy" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 disabled aria-label="Cube">
          <Icon sdsIcon="Cube" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Github">
          <Icon sdsIcon="Github" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Edit">
          <Icon sdsIcon="Edit" sdsSize="s" />
        </ButtonV2>
      </RawButtonGroup>

      <RawButtonGroup {...rest} orientation="horizontal" size={size}>
        <ButtonV2 aria-label="Download">
          <Icon sdsIcon="Download" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Copy">
          <Icon sdsIcon="Copy" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 disabled aria-label="Cube">
          <Icon sdsIcon="Cube" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 disabled aria-label="Github">
          <Icon sdsIcon="Github" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Edit">
          <Icon sdsIcon="Edit" sdsSize="s" />
        </ButtonV2>
      </RawButtonGroup>

      <RawButtonGroup {...rest} orientation="horizontal" size={size}>
        <ButtonV2 aria-label="Download">
          <Icon sdsIcon="Download" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Copy">
          <Icon sdsIcon="Copy" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Cube">
          <Icon sdsIcon="Cube" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 aria-label="Github">
          <Icon sdsIcon="Github" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 disabled aria-label="Edit">
          <Icon sdsIcon="Edit" sdsSize="s" />
        </ButtonV2>
      </RawButtonGroup>

      <div style={{ display: "flex", gap: "10px" }}>
        <RawButtonGroup {...rest} orientation="vertical" size={size}>
          <ButtonV2 disabled aria-label="Download">
            <Icon sdsIcon="Download" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Copy">
            <Icon sdsIcon="Copy" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Cube">
            <Icon sdsIcon="Cube" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Github">
            <Icon sdsIcon="Github" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Edit">
            <Icon sdsIcon="Edit" sdsSize="s" />
          </ButtonV2>
        </RawButtonGroup>

        <RawButtonGroup {...rest} orientation="vertical" size={size}>
          <ButtonV2 aria-label="Download">
            <Icon sdsIcon="Download" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Copy">
            <Icon sdsIcon="Copy" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 disabled aria-label="Cube">
            <Icon sdsIcon="Cube" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Github">
            <Icon sdsIcon="Github" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Edit">
            <Icon sdsIcon="Edit" sdsSize="s" />
          </ButtonV2>
        </RawButtonGroup>

        <RawButtonGroup {...rest} orientation="vertical" size={size}>
          <ButtonV2 aria-label="Download">
            <Icon sdsIcon="Download" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Copy">
            <Icon sdsIcon="Copy" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 disabled aria-label="Cube">
            <Icon sdsIcon="Cube" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 disabled aria-label="Github">
            <Icon sdsIcon="Github" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Edit">
            <Icon sdsIcon="Edit" sdsSize="s" />
          </ButtonV2>
        </RawButtonGroup>

        <RawButtonGroup {...rest} orientation="vertical" size={size}>
          <ButtonV2 aria-label="Download">
            <Icon sdsIcon="Download" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Copy">
            <Icon sdsIcon="Copy" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Cube">
            <Icon sdsIcon="Cube" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 aria-label="Github">
            <Icon sdsIcon="Github" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 disabled aria-label="Edit">
            <Icon sdsIcon="Edit" sdsSize="s" />
          </ButtonV2>
        </RawButtonGroup>
      </div>
    </div>
  );
};
