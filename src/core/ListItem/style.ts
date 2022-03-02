import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { ListItem } from "@material-ui/core";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";
import {
  CommonThemeProps,
  fontBody,
  getFontWeights,
  getSpaces,
} from "../styles";

const fontBodyL = fontBody("l");
const fontBodyM = fontBody("m");
const fontBodyS = fontBody("s");
const fontBodyXs = fontBody("xs");
const fontBodyXxs = fontBody("xxs");
const fontBodyXxxs = fontBody("xxxs");

export interface ExtraProps extends CommonThemeProps {
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
      const { ordered } = props;

      const {
        theme: { typography },
      } = props;

      return `
        align-items: flex-start;
        font-family: ${(typography as TypographyOptions)?.fontFamily};
        ${ordered ? "counter-increment: section;" : ""}
      `;
    }}

    &:before {
      display: inline-block;
      font-weight: 600;

      ${(props) => {
        const spacings = getSpaces(props);
        const { ordered } = props;

        return `
          content: ${ordered ? `counters(section, ".")"."` : `"•"`};
          margin-right: ${ordered ? spacings?.xs : spacings?.s}px;
        `;
      }}
    }
  }
`;

function propsToFontBody(props: ExtraProps) {
  const propsToFontBodyMap: Record<
    NonNullable<ExtraProps["fontSize"]>,
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

function propsToMarginBottom(props: ExtraProps) {
  const spacings = getSpaces(props);

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
