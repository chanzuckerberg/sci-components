import styled from "@emotion/styled";
import { Checkbox, MenuItem } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { fontBody } from "../styles/common/mixins/fonts";
import {
  getColors,
  getFontWeights,
  getIconSizes,
  getPalette,
  getSpacings,
} from "../styles/common/selectors/theme";

const fontBodyXs = fontBody("xs");

export const StyledMenuItem = styled(MenuItem)`
  ${(props) => {
    const { selected } = props;
    const colors = getColors(props);
    const fontWeights = getFontWeights(props);
    const spacings = getSpacings(props);

    return `
      padding: ${spacings?.s}px ${spacings?.m}px;

      &.MuiListItem-root.Mui-selected,
      &.MuiListItem-root.Mui-selected:hover {
        background-color: transparent;

        &:hover {
          background-color: ${colors?.gray[100]};
        }
      }

      &:active .primary-text {
        font-weight: ${fontWeights?.semibold};
      }

      &:hover {
        svg {
          color: ${selected ? "currentColor" : colors?.gray[500]};
        }
      }
    `;
  }}
`;

export const ContentWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

interface TextWrapperProps {
  selected: boolean;
}

export const TextWrapper = styled.span<TextWrapperProps>`
  ${fontBodyXs}

  ${(props) => {
    const palette = getPalette(props);

    return `
      color: ${palette?.text?.primary};
    `;
  }}
`;

export const ColumnWrapper = styled.span`
  ${fontBodyXs}

  ${(props) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
    `;
  }}
`;

export const DemoWrapper = styled.div`
  width: 250px;
`;

export const StyledCheckbox = styled(Checkbox)`
  ${(props) => {
    const spacings = getSpacings(props);

    return `
      margin-right: ${spacings?.m}px;
      padding: 0;

      &.MuiCheckbox-colorPrimary.Mui-checked:hover {
        background-color: transparent;
      }
    `;
  }}
`;

export const StyledCheck = styled(Check, {
  shouldForwardProp: (prop) => prop !== "selected",
})`
  ${(props) => {
    const { selected } = props;
    const iconSizes = getIconSizes(props);
    const spacings = getSpacings(props);

    return `
      color: ${selected ? "currentColor" : "transparent"};
      margin-top: ${spacings?.xxxs}px;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
    `;
  }}
`;
