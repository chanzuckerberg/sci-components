import { List } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CommonThemeProps, getSpaces } from "src/core/styles";

export interface ListExtraProps extends CommonThemeProps {
  component?: unknown;
  marginBottom?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l";
  ordered?: boolean;
}

// (thuang): Please keep this in sync with the props used in `ListExtraProps`
const doNotForwardProps = ["marginBottom", "ordered"];

export const StyledList = styled(List, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  .MuiListSubheader-root {
    ${propsToMarginBottom}
  }

  ${(props: ListExtraProps) => {
    if (!props.ordered) return "";

    return `
      counter-reset: section;
    `;
  }}
`;

function propsToMarginBottom(props: ListExtraProps) {
  const spaces = getSpaces(props);

  const propsToMarginBottomMap: Record<
    NonNullable<ListExtraProps["marginBottom"]>,
    number | undefined
  > = {
    l: spaces?.l,
    m: spaces?.l,
    s: spaces?.m,
    xs: spaces?.m,
    xxs: spaces?.m,
    xxxs: spaces?.s,
  };

  const { marginBottom } = props;

  return `
    margin-bottom: ${propsToMarginBottomMap[marginBottom || "s"]}px;
  `;
}
