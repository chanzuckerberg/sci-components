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

export const TAG_PANEL_COLORS: Record<string, SdsTagColorType> = {
  accent: "accent",
  beta: "beta",
  info: "info",
  negative: "negative",
  neutral: "neutral",
  notice: "notice",
  positive: "positive",
  custom: TAG_CUSTOM_COLORS,
};

export const TAG_PANEL_COLOR_LABELS = {
  custom: "Custom colors for Label, Background, Icon",
};

export const TAG_SDS_STYLES: SdsTagStyle[] = ["solid", "outline"];

export const TAG_SIZES: SdsTagSize[] = ["medium", "small"];

export const TAG_ICONS = {
  none: undefined,
  sparkle: <SparkleIcon key="Sparkle" />,
  checkCircle: <CheckCircleIcon key="CheckCircle" />,
  warningCircle: <WarningCircleIcon key="WarningCircle" />,
  user: <UserIcon key="User" />,
  sdsCheckCircle: (
    <Icon sdsIcon="CheckCircle" sdsSize="xs" key="SdsCheckCircle" />
  ),
};

export const TAG_ICON_LABELS = {
  none: "No icon",
  sparkle: "Phosphor Sparkle",
  checkCircle: "Phosphor CheckCircle",
  warningCircle: "Phosphor WarningCircle",
  user: "Phosphor User",
  sdsCheckCircle: "SDS Icon CheckCircle (deprecated Icon)",
};

export const TAG_ON_CLICK_OPTIONS = {
  none: undefined,
  action: action("onClick"),
};

export const TAG_ON_CLICK_LABELS = {
  none: "undefined",
  action: "() => {}",
};

export const TAG_HREF_OPTIONS = {
  none: undefined,
  sdsSite: "https://sds.czi.design",
};

export const TAG_HREF_LABELS = {
  none: "undefined",
  sdsSite: "https://sds.czi.design",
};

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
