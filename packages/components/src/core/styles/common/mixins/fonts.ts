import { css, SerializedStyles } from "@emotion/react";
import { TypographyStyle } from "@mui/material";
import { Typography } from "../types";
import { CommonThemeProps, getTypography } from "../selectors/theme";

type FontType = keyof Typography["wideStyles"];
type FontConfig<T extends FontType> = {
  type: T;
  defaultWeight?: keyof Typography["wideStyles"][T];
  additionalCss?: string;
};

function createFontFunction<T extends FontType>(config: FontConfig<T>) {
  return <W extends keyof Typography["wideStyles"][T]>(
    fontSize: keyof Typography["wideStyles"][T][W],
    fontWeight?: W,
    isNarrow: boolean = false
  ) => {
    return (props: CommonThemeProps): SerializedStyles | null => {
      const typography = getTypography(props);

      if (!typography) return null;

      const weight = fontWeight ?? (config.defaultWeight as W);
      const styleType = config.type;
      const wideStyles = typography.wideStyles[
        styleType
      ] as Typography["wideStyles"][T];
      const narrowStyles = typography.narrowStyles[
        styleType
      ] as Typography["narrowStyles"][T];
      const fontFamily = typography.fontFamily[styleType];

      const additionalCss = config.additionalCss || "";

      if (isNarrow) {
        return css`
          ${additionalCss}
          ${themeToCss(
            narrowStyles[weight][fontSize] as TypographyStyle,
            fontFamily
          )}
        `;
      }

      return css`
        ${additionalCss}
        ${themeToCss(
          wideStyles[weight][fontSize] as TypographyStyle,
          fontFamily
        )}

        ${props.theme?.breakpoints?.down("md")} {
          ${themeToCss(
            narrowStyles[weight][fontSize] as TypographyStyle,
            fontFamily
          )}
        }
      `;
    };
  };
}

export const fontBody = createFontFunction({
  defaultWeight: "regular",
  type: "body",
});

export const fontBodyL = fontBody("l", "regular");
export const fontBodyM = fontBody("m", "regular");
export const fontBodyS = fontBody("s", "regular");
export const fontBodyXs = fontBody("xs", "regular");
export const fontBodyXxs = fontBody("xxs", "regular");
export const fontBodyXxxs = fontBody("xxxs", "regular");
export const fontBodyXxxxs = fontBody("xxxxs", "regular");
export const fontBodyMediumL = fontBody("l", "medium");
export const fontBodyMediumM = fontBody("m", "medium");
export const fontBodyMediumS = fontBody("s", "medium");
export const fontBodyMediumXs = fontBody("xs", "medium");
export const fontBodyMediumXxs = fontBody("xxs", "medium");
export const fontBodyMediumXxxs = fontBody("xxxs", "medium");
export const fontBodyMediumXxxxs = fontBody("xxxxs", "medium");
export const fontBodySemiboldL = fontBody("l", "semibold");
export const fontBodySemiboldM = fontBody("m", "semibold");
export const fontBodySemiboldS = fontBody("s", "semibold");
export const fontBodySemiboldXs = fontBody("xs", "semibold");
export const fontBodySemiboldXxs = fontBody("xxs", "semibold");
export const fontBodySemiboldXxxs = fontBody("xxxs", "semibold");
export const fontBodySemiboldXxxxs = fontBody("xxxxs", "semibold");

export const fontCaps = createFontFunction({
  additionalCss: "text-transform: uppercase;",
  defaultWeight: "semibold",
  type: "caps",
});

export const fontCapsXxs = fontCaps("xxs");
export const fontCapsXxxs = fontCaps("xxxs");
export const fontCapsXxxxs = fontCaps("xxxxs");

export const fontHeader = createFontFunction({
  defaultWeight: "semibold",
  type: "header",
});

export const fontHeaderXxl = fontHeader("xxl");
export const fontHeaderXl = fontHeader("xl");
export const fontHeaderL = fontHeader("l");
export const fontHeaderM = fontHeader("m");
export const fontHeaderS = fontHeader("s");
export const fontHeaderXs = fontHeader("xs");
export const fontHeaderXxs = fontHeader("xxs");
export const fontHeaderXxxs = fontHeader("xxxs");

export const fontCode = createFontFunction({
  defaultWeight: "regular",
  type: "code",
});

export const fontCodeXs = fontCode("xs", "regular");
export const fontCodeS = fontCode("s", "regular");
export const fontCodeMediumXs = fontCode("xs", "medium");
export const fontCodeMediumS = fontCode("s", "medium");
export const fontCodeSemiboldXs = fontCode("xs", "semibold");
export const fontCodeSemiboldS = fontCode("s", "semibold");

export const fontTabular = createFontFunction({
  additionalCss: "font-variant-numeric: tabular-nums;",
  defaultWeight: "regular",
  type: "tabular",
});

export const fontTabularXxxxs = fontTabular("xxxxs", "regular");
export const fontTabularXxxs = fontTabular("xxxs", "regular");
export const fontTabularXxs = fontTabular("xxs", "regular");
export const fontTabularXs = fontTabular("xs", "regular");
export const fontTabularS = fontTabular("s", "regular");
export const fontTabularMediumXxxxs = fontTabular("xxxxs", "medium");
export const fontTabularMediumXxxs = fontTabular("xxxs", "medium");
export const fontTabularMediumXxs = fontTabular("xxs", "medium");
export const fontTabularMediumXs = fontTabular("xs", "medium");
export const fontTabularMediumS = fontTabular("s", "medium");
export const fontTabularSemiboldXxxxs = fontTabular("xxxxs", "semibold");
export const fontTabularSemiboldXxxs = fontTabular("xxxs", "semibold");
export const fontTabularSemiboldXxs = fontTabular("xxs", "semibold");
export const fontTabularSemiboldXs = fontTabular("xs", "semibold");
export const fontTabularSemiboldS = fontTabular("s", "semibold");

export const fontTitle = createFontFunction({
  defaultWeight: "bold",
  type: "title",
});

export const fontTitleBoldS = fontTitle("s", "bold");
export const fontTitleBoldM = fontTitle("m", "bold");
export const fontTitleBoldL = fontTitle("l", "bold");

export const fontLink = createFontFunction({
  defaultWeight: "regular",
  type: "link",
});

export const fontLinkL = fontLink("l", "regular");
export const fontLinkM = fontLink("m", "regular");
export const fontLinkS = fontLink("s", "regular");
export const fontLinkXs = fontLink("xs", "regular");
export const fontLinkXxs = fontLink("xxs", "regular");
export const fontLinkXxxs = fontLink("xxxs", "regular");
export const fontLinkXxxxs = fontLink("xxxxs", "regular");
export const fontLinkMediumL = fontLink("l", "medium");
export const fontLinkMediumM = fontLink("m", "medium");
export const fontLinkMediumS = fontLink("s", "medium");
export const fontLinkMediumXs = fontLink("xs", "medium");
export const fontLinkMediumXxs = fontLink("xxs", "medium");
export const fontLinkMediumXxxs = fontLink("xxxs", "medium");
export const fontLinkMediumXxxxs = fontLink("xxxxs", "medium");
export const fontLinkSemiboldL = fontLink("l", "semibold");
export const fontLinkSemiboldM = fontLink("m", "semibold");
export const fontLinkSemiboldS = fontLink("s", "semibold");
export const fontLinkSemiboldXs = fontLink("xs", "semibold");
export const fontLinkSemiboldXxs = fontLink("xxs", "semibold");
export const fontLinkSemiboldXxxs = fontLink("xxxs", "semibold");
export const fontLinkSemiboldXxxxs = fontLink("xxxxs", "semibold");

function themeToCss(
  fontTheme: TypographyStyle,
  fontFamily: React.CSSProperties["fontFamily"] = "inherit"
) {
  return css`
    font-family: ${fontFamily};
    font-size: ${fontTheme.fontSize}px;
    line-height: ${fontTheme.lineHeight} !important;
    letter-spacing: ${fontTheme.letterSpacing};
    font-weight: ${fontTheme.fontWeight};
    text-transform: ${fontTheme.textTransform};
    ${fontTheme.textDecoration
      ? `text-decoration: ${fontTheme.textDecoration};`
      : ""}
  `;
}
