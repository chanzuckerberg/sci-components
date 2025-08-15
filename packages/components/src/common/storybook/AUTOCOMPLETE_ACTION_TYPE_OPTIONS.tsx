/* eslint-disable sonarjs/no-duplicate-string */
// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

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
    icon: "Pin",
    name: "Pin",
    onClick: () => {
      console.log("Pinned Successfully!");
    },
    sdsIconProps: {
      color: "gray",
      shade: 500,
    },
    sdsType: "action",
    section: "With Icon",
  },
  {
    icon: "Download",
    name: "Download",
    onClick: () => {
      console.log("Download Started!");
    },
    sdsIconProps: {
      color: "gray",
      shade: 500,
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
    icon: "Pin",
    name: "Pin",
    onClick: () => {
      console.log("Pinned Successfully!");
    },
    sdsIconProps: {
      color: "gray",
      shade: 500,
    },
    sdsType: "action",
    section: "With Icon and Shortcut",
  },
  {
    count: "⌘ ⌥ D",
    icon: "Download",
    name: "Download",
    onClick: () => {
      console.log("Download Started!");
    },
    sdsIconProps: {
      color: "gray",
      shade: 500,
    },
    sdsType: "action",
    section: "With Icon and Shortcut",
  },
];
