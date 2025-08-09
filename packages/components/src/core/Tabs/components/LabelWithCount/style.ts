import styled from "@emotion/styled";
import {
  CommonThemeProps,
  CommonThemeProps as StyleProps,
  fontBodyS,
  fontBodyXs,
  fontBodyXxs,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { SdsSize } from "../common";

export const Wrapper = styled("span")`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      &:active {
        color: ${semanticColors?.base?.textPrimary};
      }

      &:disabled {
        color: ${semanticColors?.base?.textDisabled};
      }
    `;
  }}
`;

interface Props extends StyleProps {
  sdsSize: SdsSize;
}

const LABEL_DO_NOT_FORWARD_PROPS = ["sdsSize"];

export const Label = styled("span", {
  shouldForwardProp: (prop) =>
    !LABEL_DO_NOT_FORWARD_PROPS.includes(String(prop)),
})<Props>`
  ${(props: Props) => {
    const { sdsSize } = props;

    const spaces = getSpaces(props);

    const isLarge = sdsSize === "large";

    return [
      isLarge ? fontBodyS(props) : fontBodyXs(props),
      `
        margin-right: ${spaces?.m}px;
      `,
    ];
  }}
`;

const COUNT_DO_NOT_FORWARD_PROPS = ["sdsSize"];

export const Count = styled("span", {
  shouldForwardProp: (prop) =>
    !COUNT_DO_NOT_FORWARD_PROPS.includes(String(prop)),
})`
  ${(props: Props) => {
    const { sdsSize } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    const isLarge = sdsSize === "large";

    return [
      isLarge ? fontBodyXs(props) : fontBodyXxs(props),
      `
        color: ${semanticColors?.base?.textSecondary};

        .MuiChip-root {
          margin: 0 0 ${spaces?.xxxs}px 0;
        }
      `,
    ];
  }}
`;
