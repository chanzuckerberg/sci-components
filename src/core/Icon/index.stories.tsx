import styled from "@emotion/styled";
import { Args, Story } from "@storybook/react";
import React, { useRef } from "react";
import {
  CommonThemeProps,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";
import TooltipCondensed from "../TooltipCondensed";
import Icon from "./index";
import { iconMap, IconNameToSizes } from "./map";

const Demo = (props: Args): JSX.Element => {
  const { px, sdsIcon, sdsSize, sdsType } = props;

  return (
    <div style={{ alignItems: "center", display: "flex" }}>
      <Icon sdsIcon={sdsIcon} sdsSize={sdsSize} sdsType={sdsType} />
      <span style={{ marginLeft: "8px" }}>{px}px</span>
    </div>
  );
};

export default {
  component: Demo,
  title: "Icon",
};

const Template: Story = (args) => <Demo {...args} />;

export const IconXS = Template.bind({});

IconXS.args = {
  px: 10,
  sdsIcon: "checkCircle",
  sdsSize: "xs",
  sdsType: "static",
};

export const IconS = Template.bind({});

IconS.args = {
  px: 14,
  sdsIcon: "checkCircle",
  sdsSize: "s",
  sdsType: "static",
};

export const IconL = Template.bind({});

IconL.args = {
  px: 22,
  sdsIcon: "checkCircle",
  sdsSize: "l",
  sdsType: "static",
};

export const IconXL = Template.bind({});

IconXL.args = {
  px: 32,
  sdsIcon: "checkCircle",
  sdsSize: "xl",
  sdsType: "static",
};

export const IconInteractive = Template.bind({});

IconInteractive.args = {
  px: 32,
  sdsIcon: "checkCircle",
  sdsSize: "xl",
  sdsType: "interactive",
};

const IconBankWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const typography = getTypography(props);
    const spacings = getSpaces(props);
    const colors = getColors(props);

    return `
      font-family: ${typography?.fontFamily};
      display: grid;
      grid-gap: ${spacings?.s}px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, 180px);

      input {
        margin: ${spacings?.m}px 0 0 0;
        border: none;
        outline: none;
        text-align: center;
        font-weight: bold;
        font-size: 14px;
      }

      span {
        color: ${colors?.gray[400]};
        font-size: 12px;
      }
    `;
  }}
`;

const IconWrapper = styled("div")`
  align-items: center;
  border: 1px dashed #eee;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
`;

export const IconBank = () => {
  const icons = Object.entries(iconMap);

  const copyIconNameHandler = (
    iconName: string,
    icon: HTMLInputElement | null
  ) => {
    navigator.clipboard.writeText(iconName);
    if (icon) icon.select();
  };

  return (
    <IconBankWrapper>
      {icons.map(([sdsIcon, icon]) => {
        const { largeIcon } = icon;
        const sdsSize = largeIcon ? "l" : "s";
        const iconInputRef = useRef<HTMLInputElement>(null);

        return (
          <TooltipCondensed title="Click to copy!" key={sdsIcon}>
            <IconWrapper
              onClick={() => copyIconNameHandler(sdsIcon, iconInputRef.current)}
            >
              <Icon
                sdsSize={sdsSize}
                sdsIcon={sdsIcon as keyof IconNameToSizes}
                sdsType="static"
              />
              <input
                type="text"
                ref={iconInputRef}
                value={sdsIcon}
                onChange={() => {}}
              />
              <span>(size {sdsSize})</span>
            </IconWrapper>
          </TooltipCondensed>
        );
      })}
    </IconBankWrapper>
  );
};
