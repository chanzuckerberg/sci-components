import { action } from "@storybook/addon-actions";
import Icon from "src/core/Icon";

export const BUTTON_EXCLUDED_CONTROLS = [
  "endIcon",
  "endIċon",
  "startIcon",
  "startIċon",
  "onClick",
  "sdsStyle",
  "sdsType",
  "text",
  "label",
  "disabled",
];

export const BUTTON_SDS_STYLES = ["rounded", "square", "minimal"];

export const BUTTON_SDS_TYPES = ["primary", "secondary"];

export const BUTTON_TEXT = "Label";

export const BUTTON_ICON_OPTIONS = [
  undefined,
  <Icon key="download" sdsSize="l" sdsIcon="Download" sdsType="button" />,
];

export const BUTTON_DISABLED_OPTIONS = [false, true];

export const BUTTON_PSEUDO_STATES = [
  "default",
  "hover",
  "active",
  "focus-visible",
];

export const BUTTON_ACTIONS = {
  onClick: action("onClick"),
};

export const BUTTON_LARGE_ICON_OPTIONS = [
  undefined,
  <Icon sdsIcon="Download" sdsType="button" sdsSize="l" key="download" />,
  <Icon sdsIcon="Share" sdsType="button" sdsSize="l" key="share" />,
  <Icon
    sdsIcon="SpeechBubbles"
    sdsType="button"
    sdsSize="l"
    key="speechBubbles"
  />,
];

export const BUTTON_SMALL_ICON_OPTIONS = [
  undefined,
  <Icon sdsIcon="Download" sdsType="button" sdsSize="s" key="downloadSmall" />,
  <Icon sdsIcon="Copy" sdsType="button" sdsSize="s" key="copy" />,
  <Icon sdsIcon="LightBulb" sdsType="button" sdsSize="s" key="lightBulb" />,
];

export const BUTTON_LARGE_ICON_LABELS = [
  "No icon",
  "Download",
  "Share",
  "Speech Bubbles",
];

export const BUTTON_SMALL_ICON_LABELS = [
  "No icon",
  "Download",
  "Copy",
  "Light Bulb",
];

export const DEFAULT_PLACEMENT_STYLES: React.CSSProperties = {
  display: "grid",
  gridColumnGap: "10px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(6, 120px)",
  gridTemplateRows: "1fr",
};

export const MINIMAL_PLACEMENT_STYLES: React.CSSProperties = {
  display: "grid",
  gridColumnGap: "24px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(3, min-content)",
  gridTemplateRows: "1fr",
};
