import styled from "@emotion/styled";
import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import {
  CommonThemeProps,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";
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

    return `
      font-family: ${typography?.fontFamily};
      display: grid;
      grid-gap: ${spacings?.s}px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, 150px);
    `;
  }}
`;

const IconWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);

    return `
      align-items: center;
      border: 1px solid #eee;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8px;
      position: relative;
      cursor: pointer;
      transition: all .2s;

      p {
        margin: ${spacings?.m}px 0 0 0;
        text-align: center;
        font-size: 13px;
        background-color: transparent;
      }

      span {
        color: ${colors?.gray[400]};
        font-size: 11px;
      }

      &:hover {
        border-radius: 2px;
        background-color: ${colors?.primary[400]};
        border-color: ${colors?.primary[400]};
        color: white;

        p {
          color: white;
        }

        span {
          color: white;
        }

        svg {
          fill: white;
        }

        div.notif {
          display: flex;
        }
      }

      div.notif {
        flex-direction: column;
        border-radius: 2px;
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(3px);
        color: white;
        align-items: center;
        justify-content: center;
        p {
          margin: 4px 0;
        }
      }
    `;
  }}
`;

export const IconBank = () => {
  const icons = Object.entries(iconMap);

  return (
    <IconBankWrapper>
      {icons.map(([sdsIcon, icon]) => {
        const { largeIcon } = icon;
        const sdsSize = largeIcon ? "l" : "s";

        const [copied, setCopied] = useState(false);

        const copyIconNameHandler = (iconName: string) => {
          navigator.clipboard.writeText(iconName);
          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 1500);
        };

        return (
          <IconWrapper
            key={sdsIcon}
            onClick={() => copyIconNameHandler(sdsIcon)}
          >
            <Icon
              sdsSize={sdsSize}
              sdsIcon={sdsIcon as keyof IconNameToSizes}
              sdsType="static"
            />
            <p>{sdsIcon}</p>
            <span>(size {sdsSize})</span>
            {copied && (
              <div className="notif">
                <Icon
                  sdsSize={sdsSize}
                  sdsIcon={sdsIcon as keyof IconNameToSizes}
                  sdsType="static"
                />
                <p>Copied!</p>
              </div>
            )}
          </IconWrapper>
        );
      })}
    </IconBankWrapper>
  );
};
