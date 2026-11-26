import { SparklesIcon } from "@czi-sds/icons";
import {
  CopyIcon,
  DownloadSimpleIcon,
  IntersectIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { action } from "storybook/actions";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";

export const BUTTON_DROPDOWN_EXCLUDED_CONTROLS = [
  "disabled",
  "icon",
  "sdsStyle",
  "sdsType",
  "onClick",
  "size",
  "backgroundOnHover",
  "startIcon",
  "children",
  "backgroundAppearance",
];

export const BUTTON_DROPDOWN_ACTIONS = {
  onClick: action("onClick"),
};

export const BUTTON_DROPDOWN_ICON_OPTIONS = {
  download: <DownloadSimpleIcon key="download" weight="bold" />,
  copy: <CopyIcon key="copy" weight="bold" />,
  intersect: <IntersectIcon key="intersect" weight="bold" />,
  trash: <TrashIcon key="trash" weight="bold" />,
  sparkles: <SparklesIcon key="sparkles" weight="bold" />,
  customSvgIcon: (
    <CustomSvgIcon key="customIcon" style={{ height: "16px", width: "16px" }} />
  ),
};

export const BUTTON_DROPDOWN_ICON_LABELS = {
  download: "Phosphor DownloadSimple",
  copy: "Phosphor Copy",
  intersect: "Phosphor Intersect",
  trash: "Phosphor Trash",
  sparkles: "@czi-sds/icons Sparkles",
  customSvgIcon: "Custom SVG Icon",
};
