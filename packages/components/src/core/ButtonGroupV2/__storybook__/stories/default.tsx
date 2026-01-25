import { Args } from "@storybook/react-webpack5";
import React from "react";
import RawButtonGroupV2 from "src/core/ButtonGroupV2";
import ButtonV2 from "src/core/ButtonV2";
import Icon from "src/core/Icon";

export const ButtonGroupV2 = (props: Args): JSX.Element => {
  const { size, ...rest } = props;

  return (
    <RawButtonGroupV2 {...rest} size={size}>
      <ButtonV2>
        <Icon sdsIcon="Download" sdsSize="s" />
      </ButtonV2>
      <ButtonV2 startIcon={<Icon sdsIcon="Download" sdsSize="s" />}>
        Label
      </ButtonV2>
      <ButtonV2>Label</ButtonV2>
    </RawButtonGroupV2>
  );
};

export const ButtonGroupV2IconOnly = (props: Args): JSX.Element => {
  const { size, ...rest } = props;

  return (
    <RawButtonGroupV2 {...rest} size={size}>
      <ButtonV2>
        <Icon sdsIcon="Download" sdsSize="s" />
      </ButtonV2>
      <ButtonV2>
        <Icon sdsIcon="Copy" sdsSize="s" />
      </ButtonV2>
      <ButtonV2>
        <Icon sdsIcon="Edit" sdsSize="s" />
      </ButtonV2>
    </RawButtonGroupV2>
  );
};

export const ButtonGroupV2DisabledButton = (props: Args): JSX.Element => {
  const { size, ...rest } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <RawButtonGroupV2 {...rest} orientation="horizontal" size={size}>
        <ButtonV2 disabled>
          <Icon sdsIcon="Download" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Copy" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Cube" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Github" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Edit" sdsSize="s" />
        </ButtonV2>
      </RawButtonGroupV2>

      <RawButtonGroupV2 {...rest} orientation="horizontal" size={size}>
        <ButtonV2>
          <Icon sdsIcon="Download" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Copy" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 disabled>
          <Icon sdsIcon="Cube" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Github" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Edit" sdsSize="s" />
        </ButtonV2>
      </RawButtonGroupV2>

      <RawButtonGroupV2 {...rest} orientation="horizontal" size={size}>
        <ButtonV2>
          <Icon sdsIcon="Download" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Copy" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 disabled>
          <Icon sdsIcon="Cube" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 disabled>
          <Icon sdsIcon="Github" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Edit" sdsSize="s" />
        </ButtonV2>
      </RawButtonGroupV2>

      <RawButtonGroupV2 {...rest} orientation="horizontal" size={size}>
        <ButtonV2>
          <Icon sdsIcon="Download" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Copy" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Cube" sdsSize="s" />
        </ButtonV2>
        <ButtonV2>
          <Icon sdsIcon="Github" sdsSize="s" />
        </ButtonV2>
        <ButtonV2 disabled>
          <Icon sdsIcon="Edit" sdsSize="s" />
        </ButtonV2>
      </RawButtonGroupV2>

      <div style={{ display: "flex", gap: "10px" }}>
        <RawButtonGroupV2 {...rest} orientation="vertical" size={size}>
          <ButtonV2 disabled>
            <Icon sdsIcon="Download" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Copy" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Cube" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Github" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Edit" sdsSize="s" />
          </ButtonV2>
        </RawButtonGroupV2>

        <RawButtonGroupV2 {...rest} orientation="vertical" size={size}>
          <ButtonV2>
            <Icon sdsIcon="Download" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Copy" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 disabled>
            <Icon sdsIcon="Cube" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Github" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Edit" sdsSize="s" />
          </ButtonV2>
        </RawButtonGroupV2>

        <RawButtonGroupV2 {...rest} orientation="vertical" size={size}>
          <ButtonV2>
            <Icon sdsIcon="Download" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Copy" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 disabled>
            <Icon sdsIcon="Cube" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 disabled>
            <Icon sdsIcon="Github" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Edit" sdsSize="s" />
          </ButtonV2>
        </RawButtonGroupV2>

        <RawButtonGroupV2 {...rest} orientation="vertical" size={size}>
          <ButtonV2>
            <Icon sdsIcon="Download" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Copy" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Cube" sdsSize="s" />
          </ButtonV2>
          <ButtonV2>
            <Icon sdsIcon="Github" sdsSize="s" />
          </ButtonV2>
          <ButtonV2 disabled>
            <Icon sdsIcon="Edit" sdsSize="s" />
          </ButtonV2>
        </RawButtonGroupV2>
      </div>
    </div>
  );
};
