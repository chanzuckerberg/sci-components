import styled from "@emotion/styled";
import { CardActions, CardActionsProps } from "@mui/material";
import { ButtonV2Props } from "src/core/ButtonV2";
import { CommonThemeProps, getSpaces } from "src/core/styles";

const doNotForwardProps = ["buttonsPosition"];

export type StyledCardActionsProps = CardActionsProps &
  CommonThemeProps & {
    buttonsPosition?: "left" | "right";
    children?: Array<React.ReactElement<ButtonV2Props>>;
  };

export const StyledCardActions = styled(CardActions, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyledCardActionsProps) => {
    const { buttonsPosition = "left" } = props;

    const spaces = getSpaces(props);

    return `
      margin: 0;
      padding: ${spaces?.xl}px 0 0;
      display: flex;
      gap: ${spaces?.m}px;
      justify-content: ${buttonsPosition === "right" ? "flex-end" : "flex-start"};

      & > * {
        margin: 0 !important;
      }
    `;
  }}
`;
