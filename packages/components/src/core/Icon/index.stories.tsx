import styled from "@emotion/styled";
import { Args, Meta } from "@storybook/react";
import React, { FC, useState } from "react";
import Callout from "../Callout";
import InputSearch from "../InputSearch";
import {
  CommonThemeProps,
  fontBodyXs,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";
import RawIcon, { SdsIconWithColor } from "./index";
import { IconNameToSizes, iconMap } from "./map";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const Icon = (props: Args): JSX.Element => {
  const { sdsIcon, sdsSize, sdsType, ...rest } = props;

  return (
    <RawIcon sdsIcon={sdsIcon} sdsSize={sdsSize} sdsType={sdsType} {...rest} />
  );
};

export default {
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["blue", "gray", "green", "purple", "red", "yellow"],
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
  component: Icon,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Icon",
} as Meta;

// Default

export const Default = {
  args: {
    color: "blue",
    sdsIcon: "checkCircle",
    sdsSize: "xl",
    sdsType: "static",
    shade: 400,
  },
};

// Icon Bank

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
  ${fontBodyXs}

  ${(props: CommonThemeProps & SdsIconWithColor) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);

    const { color = "blue", shade = 400 } = props;

    return `
      align-items: center;
      border: 1px solid ${colors?.gray[200]};
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
        background-color: ${colors?.[color]?.[shade]};
        border-color: ${colors?.[color]?.[shade]};
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

        div.notification {
          display: flex;
        }
      }

      div.icon {
        min-height: 22px;
        display: flex;
        align-items: center;
      }

      div.notification {
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
  const { sdsIcon, innerIcon, color } = props;

  const [copied, setCopied] = useState(false);

  if (!innerIcon[1]) return null;

  const sdsSize = innerIcon[0] === "smallIcon" ? "s" : "l";

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
      key={sdsIcon + sdsSize}
      onClick={() => copyIconNameHandler(sdsIcon)}
    >
      <div className="icon">
        <RawIcon
          color={color}
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
        <div className="notification">
          <RawIcon
            color={color}
            sdsSize={sdsSize}
            sdsIcon={sdsIcon as keyof IconNameToSizes}
            sdsType="static"
          />
          <p>Copied!</p>
          <span>
            <RawIcon
              color={color}
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
  const { color } = props;

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
                key={sdsIcon + innerIcon[0]}
                innerIcon={innerIcon}
                sdsIcon={sdsIcon}
              />
            ));
          })}
        </IconBankWrapper>
      ) : (
        <Callout
          intent="notice"
          icon={
            <RawIcon sdsSize="l" sdsIcon="infoSpeechBubble" sdsType="static" />
          }
        >
          Sorry, there are no matches for your search!
        </Callout>
      )}
    </>
  );
};

export const IconBank = {
  args: {
    color: "blue",
  },
  parameters: {
    controls: {
      exclude: ["sdsIcon", "sdsSize", "sdsType", "shade"],
    },
  },
  render: (args: Args) => <IconBankDemo {...args} />,
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: ["color", "sdsIcon", "sdsSize", "sdsType", "shade"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <RawIcon
      sdsIcon="checkCircle"
      sdsSize="l"
      sdsType="static"
      color="blue"
      data-testid="icon"
      {...args}
    />
  ),
};
