import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { ListItem } from "@material-ui/core";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";
import { fontBody, getFontWeights, getSpacings, Props } from "../styles";

const fontBodyL = fontBody("l");
const fontBodyM = fontBody("m");
const fontBodyS = fontBody("s");
const fontBodyXs = fontBody("xs");
const fontBodyXxs = fontBody("xxs");
const fontBodyXxxs = fontBody("xxxs");

export interface ExtraProps extends Props {
  marginBottom?: "s" | "xs" | "xxs";
  fontSize?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l";
  ordered?: boolean;
}

// (thuang): Please keep this in sync with the props used in `ExtraProps`
const doNotForwardProps = ["marginBottom", "fontSize", "ordered"];

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  &.MuiListItem-root {
    ${propsToMarginBottom}
    ${propsToFontBody}

    padding: 0;

    ${(props) => {
      const spacings = getSpacings(props);
      const { ordered } = props;

      const {
        theme: { typography },
      } = props;

      return `
        font-family: ${(typography as TypographyOptions).fontFamily};
        margin-left: ${markerMargin(Boolean(ordered), spacings?.m || 1)}px;
        ${ordered ? "counter-increment: section;" : ""}
      `;
    }}

    &:before {
      display: inline-block;
      font-weight: 600;
      position: absolute;
      top: 0;

      ${(props) => {
        const spacings = getSpacings(props);
        const { ordered } = props;

        return `
          content: ${ordered ? `counters(section, ".")` : `"•"`};
          left: -${markerMargin(Boolean(ordered), spacings?.m || 1)}px;
        `;
      }}
    }
  }
`;

function markerMargin(ordered: boolean, spacing = 1) {
  return ordered ? 3 * spacing : spacing;
}

function propsToFontBody(props: ExtraProps) {
  const propsToFontBodyMap: Record<
    NonNullable<ExtraProps["fontSize"]>,
    (props: Props) => SerializedStyles | null
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

function propsToMarginBottom(props: ExtraProps) {
  const spacings = getSpacings(props);

  const propsToMarginBottomMap: Record<
    NonNullable<ExtraProps["marginBottom"]>,
    number | undefined
  > = {
    s: spacings?.s,
    xs: spacings?.xs,
    xxs: spacings?.xxs,
  };

  const { marginBottom } = props;

  return `
    margin-bottom: ${propsToMarginBottomMap[marginBottom || "xs"]}px;
  `;
}

export const ListItemLabel = styled.span`
  margin-right: 5px;

  ${(props) => {
    const fontWeights = getFontWeights(props);

    return `
      font-weight: ${fontWeights?.semibold};
    `;
  }}
`;
