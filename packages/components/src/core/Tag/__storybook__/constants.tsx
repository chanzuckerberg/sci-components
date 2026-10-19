import {
  CheckCircleIcon,
  SparkleIcon,
  UserIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { action } from "storybook/actions";
import Icon from "@components/src/core/Icon";
import {
  SdsTagColorType,
  SdsTagIntent,
  SdsTagSize,
  SdsTagStyle,
} from "@components/src/core/Tag/style";

export const TAG_INTENTS: SdsTagIntent[] = [
  "accent",
  "beta",
  "info",
  "negative",
  "neutral",
  "notice",
  "positive",
];

export const TAG_CUSTOM_COLORS: SdsTagColorType = [
  "#3b2f00",
  "#ffe6a0",
  "#b26f00",
];

export const TAG_PANEL_COLORS: SdsTagColorType[] = [
  ...TAG_INTENTS,
  TAG_CUSTOM_COLORS,
];

export const TAG_PANEL_COLOR_LABELS = [
  ...TAG_INTENTS,
  "Custom colors for Label, Background, Icon",
];

export const TAG_SDS_STYLES: SdsTagStyle[] = ["solid", "outline"];

export const TAG_SIZES: SdsTagSize[] = ["medium", "small"];

export const TAG_ICONS = [
  undefined,
  <SparkleIcon key="Sparkle" />,
  <CheckCircleIcon key="CheckCircle" />,
  <WarningCircleIcon key="WarningCircle" />,
  <UserIcon key="User" />,
  <Icon sdsIcon="CheckCircle" sdsSize="xs" key="SdsCheckCircle" />,
];

export const TAG_ICON_LABELS = [
  "No icon",
  "Phosphor Sparkle",
  "Phosphor CheckCircle",
  "Phosphor WarningCircle",
  "Phosphor User",
  "SDS Icon CheckCircle (deprecated Icon)",
];

export const TAG_ON_CLICK_OPTIONS = [undefined, action("onClick")];

export const TAG_ON_CLICK_LABELS = ["undefined", "() => {}"];

export const TAG_HREF_OPTIONS = [undefined, "https://sds.czi.design"];

export const TAG_HREF_LABELS = ["undefined", "https://sds.czi.design"];

export const TAG_COLOR_CONTRAST_RULE = "color-contrast";

export const TAG_PSEUDO_STATES = [
  "default",
  "hover",
  "active",
  "focus-visible",
];

export const TAG_EXCLUDED_CONTROLS = [
  "color",
  "disabled",
  "href",
  "icon",
  "iconOnly",
  "label",
  "onClick",
  "sdsStyle",
  "showLinkIcon",
  "size",
];

export const TAG_SANS_SERIF_STYLE = { fontFamily: "sans-serif" };
