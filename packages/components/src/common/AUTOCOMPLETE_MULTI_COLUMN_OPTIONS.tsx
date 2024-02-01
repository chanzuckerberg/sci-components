// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import Icon from "../core/Icon";

export const AUTOCOMPLETE_MULTI_COLUMN_OPTIONS = [
  {
    icon: <Icon sdsIcon="chevronRight" sdsSize="xs" sdsType="static" />,
    name: "Column One",
    options: [
      {
        name: "Status: can't reproduce",
      },
      {
        name: "Status: confirmed",
      },
      {
        count: 3,
        name: "Status: duplicate",
      },
      {
        count: 5,
        name: "Status: needs information",
      },
      {
        details: "This will not be worked on",
        name: "Status: wont do/fix",
      },
      {
        details: "This is still in progress",
        name: "Status: work in progress",
      },
    ],
    width: 260,
  },
  {
    icon: <Icon sdsIcon="chevronRight" sdsSize="xs" sdsType="static" />,
    name: "Column Two",
    options: [
      {
        details: "This will be worked on",
        name: "Type: bug",
      },
      {
        count: 4,
        name: "Type: discussion",
      },
      {
        name: "Type: documentation",
      },
      {
        name: "Type: enhancement",
      },
      {
        name: "Type: epic",
      },
      {
        name: "Type: feature request",
      },
      {
        name: "Type: question",
      },
    ],
    width: 260,
  },
  {
    name: "Column Three",
    options: [
      {
        name: "Bacteria",
        sdsIcon: "bacteria",
        sdsIconProps: {
          color: "gray",
        },
      },
      {
        name: "Puzzle Piece",
        sdsIcon: "puzzlePiece",
        sdsIconProps: {
          color: "gray",
        },
      },
      {
        count: 10,
        name: "Copy",
        sdsIcon: "copy",
        sdsIconProps: {
          color: "gray",
        },
      },
      {
        name: "Light Bulb",
        sdsIcon: "lightBulb",
        sdsIconProps: {
          color: "gray",
        },
      },
      {
        count: 6,
        name: "List",
        sdsIcon: "list",
        sdsIconProps: {
          color: "gray",
        },
      },
      {
        name: "Vertical Tree",
        sdsIcon: "treeVertical",
        sdsIconProps: {
          color: "gray",
        },
      },
      {
        name: "Link",
        sdsIcon: "link",
        sdsIconProps: {
          color: "gray",
        },
      },
    ],
    width: 180,
  },
];
