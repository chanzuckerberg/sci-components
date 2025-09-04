import styled from "@emotion/styled";
import { Args } from "@storybook/react-webpack5";
import { FC, useState } from "react";
import Callout from "src/core/Callout";
import RawIcon, { IconNameToSizes, SdsIconWithColor } from "src/core/Icon";
import {
  CommonThemeProps,
  fontBodyXs,
  getColors,
  getMode,
  getSemanticColors,
  getSpaces,
  getTypography,
} from "src/core/styles";
import { iconMap } from "src/core/Icon/map";
import InputSearch from "src/core/InputSearch";

const IconBankWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const typography = getTypography(props);
    const spaces = getSpaces(props);

    return `
      font-family: ${typography?.fontFamily};
      display: grid;
      grid-gap: ${spaces?.s}px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, 210px);
      margin-top: ${spaces?.m}px;
    `;
  }}
`;

const IconWrapper = styled("div")`
  ${fontBodyXs}

  ${(props: CommonThemeProps & SdsIconWithColor) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const mode = getMode(props);

    const { color = "blue", shade = mode === "dark" ? 600 : 500 } = props;

    return `
      align-items: center;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8px;
      position: relative;
      cursor: pointer;
      transition: all .2s;

      p {
        margin: ${spaces?.m}px 0 0 0;
        text-align: center;
        font-size: 13px;
        background-color: transparent;
      }

      span {
        color: ${semanticColors?.base?.textPrimary};
        font-size: 11px;
      }

      span.size-tag {
        background-color: ${mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"};
        font-size: 10px;
        padding: 0 4px;
        margin: 0 2px;
        border-radius: 2px;
      }

      &:hover {
        border-radius: 4px;
        background-color: ${colors?.[color]?.[shade]};
        border-color: ${colors?.[color]?.[shade]};
        color: ${semanticColors?.base?.textPrimaryInverse};

        p {
          color: ${semanticColors?.base?.textPrimaryInverse};
        }

        span {
          color: ${semanticColors?.base?.textPrimaryInverse};
        }

        span.size-tag {
          background-color: ${mode === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"};
        }

        svg {
          fill: ${semanticColors?.base?.ornamentPrimaryInverse};
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
          />
          <p>Copied!</p>
          <span>
            <RawIcon color={color} sdsSize="xs" sdsIcon="Check" />
          </span>
        </div>
      )}
    </IconWrapper>
  );
};

export const IconBankDemo = (props: Args): JSX.Element => {
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
        sx={{ width: "210px" }}
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
          icon={<RawIcon sdsSize="l" sdsIcon="InfoSpeechBubble" />}
        >
          Sorry, there are no matches for your search!
        </Callout>
      )}
    </>
  );
};
