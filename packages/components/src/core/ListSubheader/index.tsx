import { ListSubheaderProps as RawListSubheaderProps } from "@mui/material";
import { StyledListSubheader } from "./style";

export type ListSubheaderProps = Omit<
  RawListSubheaderProps,
  "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

/**
 * @see https://mui.com/material-ui/react-list/
 */
const ListSubheader = (props: ListSubheaderProps): JSX.Element => {
  return <StyledListSubheader disableGutters {...props} />;
};

export default ListSubheader;
