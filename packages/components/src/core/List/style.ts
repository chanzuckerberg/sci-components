import { List } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CommonThemeProps, getSpaces } from "../styles";

export interface ListExtraProps extends CommonThemeProps {
  component?: unknown;
  marginBottom?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l";
  ordered?: boolean;
}

// (thuang): Please keep this in sync with the props used in `ListExtraProps`
const doNotForwardProps = ["marginBotton", "ordered"];

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
  const spacings = getSpaces(props);

  const propsToMarginBottomMap: Record<
    NonNullable<ListExtraProps["marginBottom"]>,
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
