import { ListProps as RawListProps } from "@mui/material";
import { ListExtraProps, StyledList } from "./style";

export type ListProps = ListExtraProps &
  Omit<RawListProps, "nonce" | "rev" | "rel" | "autoFocus" | "content">;

/**
 * @see https://mui.com/material-ui/react-list/
 */
const List = (props: ListProps): JSX.Element => {
  const { ordered } = props;

  return (
    <StyledList component={ordered ? "ol" : "ul"} disablePadding {...props} />
  );
};

export default List;
