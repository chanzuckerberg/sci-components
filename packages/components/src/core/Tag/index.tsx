import { ChipProps } from "@mui/material";
import { ExtraTagProps, SdsTagColorType, StyledTag } from "./style";

export interface SdsTagProps
  extends Omit<
    ChipProps,
    "color" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
  > {
  label: string;
  color?: SdsTagColorType;
  icon?: JSX.Element;
}

export type TagProps = SdsTagProps & ExtraTagProps;
export type { SdsTagColorType };

/**
 * @see https://mui.com/material-ui/react-chip/
 *
 * @props color: {string}                   - applies color for tag based on default theme color values
 *               [string, string]           - applies custom colors for [font, background]
 *               [string, string, string]   - applies custom colors for [font, background, icon]
 */
const Tag = (props: TagProps): JSX.Element => {
  const { color, icon } = props;

  return <StyledTag tagColor={color} {...props} color="primary" icon={icon} />;
};

export default Tag;
