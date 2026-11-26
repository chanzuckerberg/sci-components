/* eslint-disable sonarjs/no-duplicate-string */
// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import { DownloadSimpleIcon, PushPinSimpleIcon } from "@phosphor-icons/react";

const ICON_GRAY = "#969696";

export const AUTOCOMPLETE_ACTION_TYPE_OPTIONS = [
  {
    name: "Copy",
    onClick: () => {
      console.log("Copy Action Called!");
    },
    sdsType: "action",
    section: "Default",
  },
  {
    name: "Paste",
    onClick: () => {
      console.log("Paste Action Called!");
    },
    sdsType: "action",
    section: "Default",
  },
  {
    icon: <PushPinSimpleIcon weight="bold" color={ICON_GRAY} />,
    name: "Pin",
    onClick: () => {
      console.log("Pinned Successfully!");
    },
    sdsType: "action",
    section: "With Icon",
  },
  {
    icon: <DownloadSimpleIcon weight="bold" color={ICON_GRAY} />,
    name: "Download",
    onClick: () => {
      console.log("Download Started!");
    },
    sdsType: "action",
    section: "With Icon",
  },
  {
    count: "⌘ ⌥ P",
    name: "Pin",
    onClick: () => {
      console.log("Pinned Successfully!");
    },
    sdsType: "action",
    section: "With Shortcut",
  },
  {
    count: "⌘ ⌥ D",
    name: "Download",
    onClick: () => {
      console.log("Download Started!");
    },
    sdsType: "action",
    section: "With Shortcut",
  },
  {
    count: "⌘ ⌥ P",
    icon: <PushPinSimpleIcon weight="bold" color={ICON_GRAY} />,
    name: "Pin",
    onClick: () => {
      console.log("Pinned Successfully!");
    },
    sdsType: "action",
    section: "With Icon and Shortcut",
  },
  {
    count: "⌘ ⌥ D",
    icon: <DownloadSimpleIcon weight="bold" color={ICON_GRAY} />,
    name: "Download",
    onClick: () => {
      console.log("Download Started!");
    },
    sdsType: "action",
    section: "With Icon and Shortcut",
  },
];
