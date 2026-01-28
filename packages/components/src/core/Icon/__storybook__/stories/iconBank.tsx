import styled from "@emotion/styled";
import { Args } from "@storybook/react-webpack5";
import { FC, useState } from "react";
import Callout from "src/core/Callout";
import RawIcon, { IconNameToSizes, SdsIconWithColor } from "src/core/Icon";
import {
  CommonThemeProps,
  getColors,
  getMode,
  getSemanticColors,
  getSpaces,
  getTypography,
} from "src/core/styles";
import { iconMap } from "src/core/Icon/map";
import InputSearch from "src/core/InputSearch";
import Tooltip from "src/core/Tooltip";
import { IconSizes } from "src/core/styles/common/constants/iconSizes";

const IconBankWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const typography = getTypography(props);
    const spaces = getSpaces(props);

    return `
      font-family: ${typography?.fontFamily};
      display: grid;
      grid-gap: ${spaces?.s}px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, 260px);
      margin-top: ${spaces?.m}px;
    `;
  }}
`;

const IconWrapper = styled("div")`
  ${(props: CommonThemeProps & SdsIconWithColor) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const mode = getMode(props);

    const { color = "blue", shade = mode === "dark" ? 600 : 500 } = props;

    return `
      align-items: center;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 16px 20px;
      position: relative;
      cursor: pointer;
      transition: all .2s;
      min-height: unset !important;
      line-height: unset !important;

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
        padding: 0 4px 1px;
        margin: 0 2px;
        border-radius: 2px;
      }

      &:hover {
        border-radius: 8px;
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
        display: flex;
        align-items: center;
        gap: 8px;
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
  innerIcon: {
    smallIcon: FC<CustomSVGProps> | null;
    largeIcon: FC<CustomSVGProps> | null;
  };
} & SdsIconWithColor;

const IconItem = (props: IconItemProps) => {
  const { sdsIcon, innerIcon, color } = props;

  const [copied, setCopied] = useState(false);

  const sdsSize = innerIcon.smallIcon ? "s" : "l";

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
      key={sdsIcon + "wrapper"}
      onClick={() => copyIconNameHandler(sdsIcon)}
    >
      <div className="icon">
        {[
          ...(innerIcon.smallIcon ? ["xxs", "xs", "s"] : []),
          ...(innerIcon.largeIcon ? ["l", "xl"] : []),
        ].map((size) => {
          const iconSize = IconSizes[size as keyof typeof IconSizes];

          return (
            <Tooltip
              placement="top"
              title={`Size ${size.toUpperCase()} (${iconSize.height}px \u00D7 ${iconSize.width}px)`}
              key={size + sdsIcon}
            >
              <span>
                <RawIcon
                  color={color}
                  sdsSize={size as "xxs" | "xs" | "s" | "l" | "xl"}
                  sdsIcon={sdsIcon as keyof IconNameToSizes}
                />
              </span>
            </Tooltip>
          );
        })}
      </div>
      <p>{sdsIcon}</p>
      <span>
        Available sizes
        {[
          ...(innerIcon.smallIcon ? ["xxs", "xs", "s"] : []),
          ...(innerIcon.largeIcon ? ["l", "xl"] : []),
        ].map((size) => (
          <span key={sdsIcon + size} className="size-tag">
            {size}
          </span>
        ))}
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
        sx={{ width: "260px" }}
      />
      {icons.length ? (
        <IconBankWrapper>
          {icons.map(([sdsIcon, icon]) => {
            return (
              <IconItem
                color={color}
                key={sdsIcon}
                innerIcon={icon}
                sdsIcon={sdsIcon}
              />
            );
          })}
        </IconBankWrapper>
      ) : (
        <div style={{ maxWidth: "400px" }}>
          <Callout
            intent="notice"
            icon={<RawIcon sdsSize="s" sdsIcon="InfoCircle" />}
            title="No matches"
            body="Sorry, there are no matches for your search!"
          />
        </div>
      )}
    </>
  );
};
