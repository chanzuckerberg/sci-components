import styled from "@emotion/styled";
import { Args, Meta, Story } from "@storybook/react";
import React, { FC, useState } from "react";
import Callout from "../Callout";
import InputSearch from "../InputSearch";
import {
  CommonThemeProps,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";
import Icon, { SdsIconWithColor } from "./index";
import { iconMap, IconNameToSizes } from "./map";

const Demo = (props: Args): JSX.Element => {
  const { sdsIcon, sdsSize, sdsType, ...rest } = props;

  return (
    <Icon sdsIcon={sdsIcon} sdsSize={sdsSize} sdsType={sdsType} {...rest} />
  );
};

export default {
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: [
        "beta",
        "gray",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ],
    },
    sdsIcon: {
      control: {
        type: "select",
      },
      options: [
        "checkCircle",
        "copy",
        "edit",
        "lightBulb",
        "linesHorizontal",
        "loading",
        "xMark",
      ],
    },
    sdsSize: {
      control: { type: "select" },
      options: ["xs", "s", "l", "xl"],
    },
    sdsType: {
      control: { type: "select" },
      options: ["iconButton", "interactive", "static", "button"],
    },
    shade: {
      control: {
        type: "select",
      },
      options: [100, 200, 300, 400, 500, 600],
    },
  },
  component: Demo,
  title: "Icon",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  color: "primary",
  sdsIcon: "checkCircle",
  sdsSize: "xl",
  sdsType: "static",
  shade: 400,
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
      grid-template-columns: repeat(auto-fit, 210px);
      margin-top: ${spacings?.m}px;
    `;
  }}
`;

const IconWrapper = styled("div")`
  ${(props: CommonThemeProps & SdsIconWithColor) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);

    const { color = "primary", shade = 400 } = props;

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
        color: ${colors?.gray[600]};
        font-size: 11px;
      }

      span.size-tag {
        background-color: rgba(0, 0, 0, 0.05);
        font-size: 10px;
        padding: 0 4px;
        margin: 0 2px;
        border-radius: 2px;
      }

      &:hover {
        border-radius: 2px;
        background-color: ${colors?.[color][shade]};
        border-color: ${colors?.[color][shade]};
        color: white;

        p {
          color: white;
        }

        span {
          color: white;
        }

        span.size-tag {
          background-color: rgba(0, 0, 0, 0.2);
        }

        svg {
          fill: white;
        }

        div.notif {
          display: flex;
        }
      }

      div.icon {
        min-height: 22px;
        display: flex;
        align-items: center;
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
      }
    `;
  }}
`;

type IconItemProps = {
  sdsIcon: string;
  innerIcon: [string, FC<CustomSVGProps> | null];
} & SdsIconWithColor;

const IconItem = (props: IconItemProps) => {
  const { sdsIcon, innerIcon, color, shade } = props;
  if (!innerIcon[1]) return null;
  const sdsSize = innerIcon[0] === "smallIcon" ? "s" : "l";
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
      color={color}
      shade={shade}
      key={sdsIcon + sdsSize}
      onClick={() => copyIconNameHandler(sdsIcon)}
    >
      <div className="icon">
        <Icon
          color={color}
          shade={shade}
          sdsSize={sdsSize}
          sdsIcon={sdsIcon as keyof IconNameToSizes}
          sdsType="static"
        />
      </div>
      <p>{sdsIcon}</p>
      <span>
        Available sizes{" "}
        {sdsSize === "s" ? (
          <>
            <span className="size-tag">xs</span>
            <span className="size-tag">s</span>
          </>
        ) : (
          <>
            <span className="size-tag">l</span>
            <span className="size-tag">xl</span>
          </>
        )}
      </span>
      {copied && (
        <div className="notif">
          <Icon
            color={color}
            shade={shade}
            sdsSize={sdsSize}
            sdsIcon={sdsIcon as keyof IconNameToSizes}
            sdsType="static"
          />
          <p>Copied!</p>
          <span>
            <Icon
              color={color}
              shade={shade}
              sdsSize="xs"
              sdsIcon="check"
              sdsType="static"
            />
          </span>
        </div>
      )}
    </IconWrapper>
  );
};

const IconBankDemo = (props: Args): JSX.Element => {
  const { color, shade } = props;

  const initialIcons = Object.entries(iconMap);

  const [icons, setIcons] = useState(initialIcons);

  const searchIconHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const regex = new RegExp(query, "gi");
    const newIcons = initialIcons.filter((icon) => {
      return icon[0].match(regex);
    });
    setIcons(newIcons);
  };

  return (
    <>
      <InputSearch
        id="squareSearchPreview"
        label="Search"
        sdsStyle="square"
        placeholder="Search icons"
        name="square-input-search"
        onChange={searchIconHandler}
      />
      {icons.length ? (
        <IconBankWrapper>
          {icons.map(([sdsIcon, icon]) => {
            return Object.entries(icon).map((innerIcon) => (
              <IconItem
                color={color}
                shade={shade}
                key={sdsIcon + innerIcon[0]}
                innerIcon={innerIcon}
                sdsIcon={sdsIcon}
              />
            ));
          })}
        </IconBankWrapper>
      ) : (
        <Callout
          intent="warning"
          icon={
            <Icon sdsSize="l" sdsIcon="infoSpeechBubble" sdsType="static" />
          }
        >
          Sorry, there are no matches for your search!
        </Callout>
      )}
    </>
  );
};

const IconBankTemplate: Story = (args) => <IconBankDemo {...args} />;

export const IconBank = IconBankTemplate.bind({});

IconBank.parameters = {
  controls: {
    exclude: ["sdsIcon", "sdsSize", "sdsType", "shade"],
  },
};

IconBank.args = {
  color: "primary",
};

const TestDemo = (): JSX.Element => {
  return (
    <Icon
      sdsIcon="checkCircle"
      sdsSize="l"
      sdsType="static"
      color="success"
      data-testid="icon"
    />
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.parameters = {
  controls: {
    exclude: ["color", "sdsIcon", "sdsSize", "sdsType"],
  },
};
