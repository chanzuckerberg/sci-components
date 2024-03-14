import { action } from "@storybook/addon-actions";
import Icon from "src/core/Icon";

export const BUTTON_DROPDOWN_EXCLUDED_CONTROLS = [
  "disabled",
  "icon",
  "sdsStyle",
  "sdsType",
  "onClick",
];

export const BUTTON_DROPDOWN_TEXT = "Label";

export const BUTTON_DROPDOWN_ACTIONS = {
  onClick: action("onClick"),
};

export const BUTTON_DROPDOWN_ICON_OPTIONS = [
  <Icon sdsIcon="Download" sdsSize="l" sdsType="button" key="downloadIcon" />,
  <Icon sdsIcon="Copy" sdsSize="l" sdsType="button" key="copyIcon" />,
  <Icon sdsIcon="Bacteria" sdsSize="l" sdsType="button" key="bacteriaIcon" />,
];
