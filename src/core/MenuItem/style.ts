import styled from "@emotion/styled";
import { MenuItem } from "@material-ui/core";
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

    const primary = colors?.primary[400];

    return `
      padding: ${spacings?.xs}px ${spacings?.m}px;

      &.MuiListItem-root.MuiListItem-button {
        background-color: transparent;

        &:hover {
          background-color: ${colors?.gray[100]};
        }
      }

      &:hover {
        svg {
          color: ${selected ? primary : colors?.gray[500]};
        }
      }

      &:active {
        svg {
          color: ${primary};
        }

        .primary-text {
          font-weight: ${fontWeights?.semibold};
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

interface StyledCheckType {
  selected?: boolean;
}

export const StyledCheck = styled(Check, {
  shouldForwardProp: (prop) => prop !== "selected",
})<StyledCheckType>`
  ${(props) => {
    const { selected } = props;
    const colors = getColors(props);
    const iconSizes = getIconSizes(props);
    const spacings = getSpacings(props);

    return `
      color: ${selected ? colors?.primary[400] : "transparent"};
      margin-right: ${spacings?.m}px;
      margin-top: ${spacings?.xxxs}px;
      padding: 0;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;

      &.MuiCheckbox-colorPrimary.Mui-checked:hover {
        background-color: transparent;
      }
    `;
  }}
`;
