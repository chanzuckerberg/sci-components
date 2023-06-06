import { ListSubheaderProps } from "@mui/material";
import { StyledListSubheader } from "./style";

export type { ListSubheaderProps };

/**
 * @see https://mui.com/material-ui/react-list/
 */
const ListSubheader = (props: ListSubheaderProps): JSX.Element => {
  return <StyledListSubheader disableGutters {...props} />;
};

export default ListSubheader;
