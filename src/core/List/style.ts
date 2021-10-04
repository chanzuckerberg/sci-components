import styled from "@emotion/styled";
import { List } from "@material-ui/core";
import { Props } from "../styles";

export interface ExtraProps extends Props {
  ordered?: boolean;
  component?: unknown;
}

// (thuang): Please keep this in sync with the props used in `ExtraProps`
const doNotForwardProps = ["ordered"];

export const StyledList = styled(List, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraProps) => {
    if (!props.ordered) return "";

    return `
      counter-reset: section;
    `;
  }}
`;
