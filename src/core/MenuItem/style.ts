import styled from "@emotion/styled";
import { Black } from "../styles/common/constants/black";
import { FontWeights } from "../styles/common/constants/fontWeights";
import { Gray } from "../styles/common/constants/gray";
import { fontXs } from "../styles/common/mixins/body";

export const ContentWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

interface TextWrapperProps {
  selected: boolean;
}

export const TextWrapper = styled.span`
  ${fontXs}
  color: ${Black.DEFAULT};
  font-weight: ${({ selected }: TextWrapperProps) =>
    selected ? FontWeights.SEMI_BOLD : FontWeights.REGULAR};
`;

export const ColumnWrapper = styled.span`
  ${fontXs}
  color: ${Gray.DARK};
`;
