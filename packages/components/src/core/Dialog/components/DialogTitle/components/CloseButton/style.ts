import styled from "@emotion/styled";
import ButtonV2 from "src/core/ButtonV2";
import { CommonThemeProps, getIconSizes, getSpaces } from "src/core/styles";

export const StyledButton = styled(ButtonV2)`
  position: absolute;
  height: unset;

  ${(props: CommonThemeProps & { size: "small" | "medium" | "large" }) => {
    const { size } = props;

    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);

    const isSmall = size === "small" || size === "medium";
    const right = isSmall ? spaces?.xl : spaces?.xxxl;
    const iconSizeMap = {
      small: iconSizes?.s?.width,
      medium: iconSizes?.l?.width,
      large: iconSizes?.xl?.width,
    };

    return `
      right: ${right}px;

      svg {
        width: ${iconSizeMap[size]}px;
        height: ${iconSizeMap[size]}px;
      }
    `;
  }}
`;
