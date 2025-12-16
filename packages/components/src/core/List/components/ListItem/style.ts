import { SerializedStyles } from "@emotion/react";
import { ListItem } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBody,
  getFontWeights,
  getSpaces,
} from "src/core/styles";

const fontBodyL = fontBody("l");
const fontBodyM = fontBody("m");
const fontBodyS = fontBody("s");
const fontBodyXs = fontBody("xs");
const fontBodyXxs = fontBody("xxs");
const fontBodyXxxs = fontBody("xxxs");

export interface ListItemExtraProps extends CommonThemeProps {
  marginBottom?: "s" | "xs" | "xxs";
  fontSize?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l";
  ordered?: boolean;
}

// (thuang): Please keep this in sync with the props used in `ListItemExtraProps`
const doNotForwardProps = ["marginBottom", "fontSize", "ordered"];

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${propsToMarginBottom}
  ${propsToFontBody}

  padding: 0;

  ${(props) => {
    const { ordered } = props;

    return `
      align-items: flex-start;
      ${ordered ? "counter-increment: section;" : ""}
    `;
  }}

  &:before {
    display: inline-block;

    ${(props) => {
      const spaces = getSpaces(props);
      const fontWeights = getFontWeights(props);
      const { ordered } = props;

      // (masoudmanson):
      // IMPORTANT: Do NOT change \\2022 to a literal bullet character (•)!
      // Using \\2022 (CSS escape for U+2022 bullet) instead of the literal "•" character
      // prevents "illegal escape sequence" errors in the built JavaScript bundle.
      // When Rollup bundles this code, a literal • would be converted to \u2022 in the JS string,
      // which creates an illegal escape sequence. The double backslash (\\2022) properly escapes
      // through both JavaScript parsing and CSS rendering to produce the bullet character.
      //
      // NOTE: This bug existed for a very long time and caused significant performance issues
      // in production builds when components from this library were used in other projects.
      // It was finally fixed in Nov 7th, 2025. Please do not reintroduce this issue! Thank you! :D
      return `        
        font-weight: ${fontWeights?.semibold};
        content: ${ordered ? `counters(section, ".")"."` : `"\\2022"`};
        margin-right: ${ordered ? spaces?.xs : spaces?.s}px;
      `;
    }}
  }
`;

function propsToFontBody(props: ListItemExtraProps) {
  const propsToFontBodyMap: Record<
    NonNullable<ListItemExtraProps["fontSize"]>,
    (props: CommonThemeProps) => SerializedStyles | null
  > = {
    l: fontBodyL,
    m: fontBodyM,
    s: fontBodyS,
    xs: fontBodyXs,
    xxs: fontBodyXxs,
    xxxs: fontBodyXxxs,
  };

  const { fontSize } = props;

  return propsToFontBodyMap[fontSize || "s"];
}

function propsToMarginBottom(props: ListItemExtraProps) {
  const spaces = getSpaces(props);

  const propsToMarginBottomMap: Record<
    NonNullable<ListItemExtraProps["marginBottom"]>,
    number | undefined
  > = {
    s: spaces?.s,
    xs: spaces?.xs,
    xxs: spaces?.xxs,
  };

  const { marginBottom } = props;

  return `
    margin-bottom: ${propsToMarginBottomMap[marginBottom || "xs"]}px;
  `;
}

export const ListItemLabel = styled("span")`
  margin-right: 5px;

  ${(props: CommonThemeProps) => {
    const fontWeights = getFontWeights(props);

    return `
      font-weight: ${fontWeights?.semibold};
    `;
  }}
`;
