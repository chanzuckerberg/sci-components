import { ChipProps } from "@mui/material";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributeAnchorTarget,
  ReactElement,
} from "react";
import {
  SdsTagColorType,
  SdsTagIntent,
  SdsTagSize,
  SdsTagStyle,
  StyledTag,
  TAG_LABEL_TEXT_CLASS,
  TAG_LINK_ICON_CLASS,
} from "./style";

export type { SdsTagColorType, SdsTagIntent, SdsTagSize, SdsTagStyle };
export { TAG_LABEL_TEXT_CLASS, TAG_LINK_ICON_CLASS };

export interface SdsTagProps extends Omit<
  ChipProps,
  "color" | "label" | "size" | "variant"
> {
  /**
   * The tag's text, and its accessible name. It is cut off with an ellipsis
   * rather than wrapped, so keep it to a word or two. An icon-only tag still
   * needs it: the text is hidden from view but read by screen readers.
   */
  label: string;
  /**
   * `solid` fills the tag with the intent color. `outline` tints the fill and
   * draws the label, the icons and a 1px border in the intent color.
   */
  sdsStyle?: SdsTagStyle;
  /**
   * `medium` is 24px tall with a 13px label and 12px icons, `small` is 20px
   * tall with a 10px label and 10px icons.
   */
  size?: SdsTagSize;
  /**
   * One of the seven intents, or CSS colors for a tag the intents do not
   * cover: `[label, background]` or `[label, background, icon]`. The icon
   * takes the label color when the third value is left out.
   */
  color?: SdsTagColorType;
  /**
   * An icon on the leading edge, usually a Phosphor or `@czi-sds/icons` icon.
   * The tag draws it at its own icon size and color.
   */
  icon?: ReactElement;
  /**
   * Draws only the icon, in a square tag. The label is hidden from view but
   * stays the tag's accessible name. Has no effect without an icon.
   */
  iconOnly?: boolean;
  /**
   * Adds an arrow after the label to say the tag leads somewhere. Usually
   * paired with `href`, though a tag can be a link without it.
   */
  showLinkIcon?: boolean;
  /**
   * Turns the tag into a link. It renders as an `<a>` unless `component`
   * says otherwise, as with a router's link component.
   */
  href?: string;
  /** Where the link opens. `_blank` also sets `rel="noopener noreferrer"`. */
  target?: HTMLAttributeAnchorTarget;
  /** The link's relationship to the current page. */
  rel?: string;
  /**
   * Greys the tag out. On a clickable tag or a link it also takes the tag out
   * of the tab order.
   */
  disabled?: boolean;
}

export type TagProps = SdsTagProps;

/**
 * @see https://mui.com/material-ui/react-chip/
 */
const Tag = forwardRef(
  (props: TagProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const {
      clickable,
      color = "neutral",
      component,
      href,
      icon,
      iconOnly = false,
      label,
      onClick,
      rel,
      sdsStyle = "solid",
      showLinkIcon = false,
      size = "medium",
      target,
      ...rest
    } = props;

    const isLink = Boolean(href);
    const isIconOnly = iconOnly && Boolean(icon);
    const isClickable =
      clickable ?? (isLink || Boolean(onClick) ? true : undefined);

    const linkProps = isLink
      ? {
          href,
          rel: rel ?? (target === "_blank" ? "noopener noreferrer" : undefined),
          target,
        }
      : {};

    return (
      <StyledTag
        ref={ref}
        {...rest}
        {...linkProps}
        clickable={isClickable}
        color="default"
        component={component ?? (isLink ? "a" : undefined)}
        icon={icon}
        iconOnly={isIconOnly}
        isInteractive={Boolean(isClickable)}
        label={
          <>
            <span className={TAG_LABEL_TEXT_CLASS}>{label}</span>
            {showLinkIcon && !isIconOnly && (
              <ArrowUpRightIcon aria-hidden className={TAG_LINK_ICON_CLASS} />
            )}
          </>
        }
        onClick={onClick}
        sdsStyle={sdsStyle}
        size={size}
        tagColor={color}
        variant="filled"
      />
    );
  }
);

export default Tag;
