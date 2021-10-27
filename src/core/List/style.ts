import styled from "@emotion/styled";
import { List } from "@material-ui/core";
import { getSpaces, Props } from "../styles";

export interface ExtraProps extends Props {
  component?: unknown;
  marginBottom?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l";
  ordered?: boolean;
}

// (thuang): Please keep this in sync with the props used in `ExtraProps`
const doNotForwardProps = ["marginBotton", "ordered"];

export const StyledList = styled(List, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  .MuiListSubheader-root {
    ${propsToMarginBottom}
  }

  ${(props: ExtraProps) => {
    if (!props.ordered) return "";

    return `
      counter-reset: section;
    `;
  }}
`;

function propsToMarginBottom(props: ExtraProps) {
  const spacings = getSpaces(props);

  const propsToMarginBottomMap: Record<
    NonNullable<ExtraProps["marginBottom"]>,
    number | undefined
  > = {
    l: spacings?.l,
    m: spacings?.l,
    s: spacings?.m,
    xs: spacings?.m,
    xxs: spacings?.m,
    xxxs: spacings?.s,
  };

  const { marginBottom } = props;

  return `
    margin-bottom: ${propsToMarginBottomMap[marginBottom || "s"]}px;
  `;
}
