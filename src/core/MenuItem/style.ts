import styled from "@emotion/styled";
import { MenuItem } from "@material-ui/core";
import { Black } from "../styles/common/constants/black";
import { FontWeights } from "../styles/common/constants/fontWeights";
import { Gray } from "../styles/common/constants/gray";
import { fontXs } from "../styles/common/mixins/body";
import { getPalette, getSpacings } from "../styles/common/selectors/theme";

export const StyledMenuItem = styled(MenuItem)`
  ${(props) => {
    const spacings = getSpacings(props);

    return `
      padding: ${spacings?.s}px ${spacings?.m}px;
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
  ${fontXs}

  ${(props) => {
    const { selected } = props;
    const palette = getPalette(props);

    return `
      color: ${palette?.text?.primary || Black.DEFAULT};
      font-weight: ${selected ? FontWeights.SEMI_BOLD : FontWeights.REGULAR}};
    `;
  }}
`;

export const ColumnWrapper = styled.span`
  ${fontXs}
  color: ${Gray.DARK};
`;

export const DemoWrapper = styled.div`
  width: 250px;
`;
