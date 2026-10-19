import { ChipProps } from "@mui/material";
import {
  ExtraTagLegacyProps,
  SdsTagLegacyColorType,
  StyledTagLegacy,
} from "./style";

export interface SdsTagLegacyProps extends Omit<ChipProps, "color"> {
  /**
   * The tag's text, and its accessible name. It is cut off with an ellipsis
   * rather than wrapped, so keep it to a word or two.
   */
  label: string;
  color?: SdsTagLegacyColorType;
}

export type TagLegacyProps = SdsTagLegacyProps & ExtraTagLegacyProps;
export type { SdsTagLegacyColorType };

/**
 * @see https://mui.com/material-ui/react-chip/
 *
 * @deprecated Use Tag instead. TagLegacy will be removed in a future release.
 *
 * @props color: {string}                   - applies color for tag based on default theme color values
 *               [string, string]           - applies custom colors for [font, background]
 *               [string, string, string]   - applies custom colors for [font, background, icon]
 */
const TagLegacy = (props: TagLegacyProps): JSX.Element => {
  const { color } = props;

  return <StyledTagLegacy tagColor={color} {...props} color="primary" />;
};

export default TagLegacy;
