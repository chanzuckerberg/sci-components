// import { AutocompleteValue } from "@mui/base";
// import { DefaultAutocompleteOption } from "dist/index.cjs";

// (masoudmanson): The unit tests rely on the content in this file; do not alter it!
const SORTED_BY_TYPE = "Sorted by type";

export const GITHUB_LABELS_MULTI_COLUMN = [
  {
    columnName: "Column 1",
    columnWidth: 260,
    options: [
      {
        name: "Status: can't reproduce",
        section: "name only",
      },
      {
        name: "Status: confirmed",
        section: "name only",
      },
      {
        count: 3,
        name: "Status: duplicate",
        section: "name with count",
      },
      {
        count: 5,
        name: "Status: needs information",
        section: "name with count",
      },
      {
        details: "This will not be worked on",
        name: "Status: wont do/fix",
        section: "name with details",
      },
      {
        details: "This is still in progress",
        name: "Status: work in progress",
        section: "name with details",
      },
    ],
    sdsIcon: "chevronRight",
  },
  {
    columnName: "Column 2",
    columnWidth: 260,
    options: [
      {
        details: "This will be worked on",
        name: "Type: bug",
        section: SORTED_BY_TYPE,
      },
      {
        count: 4,
        name: "Type: discussion",
        section: SORTED_BY_TYPE,
      },
      {
        name: "Type: documentation",
        section: SORTED_BY_TYPE,
      },
      {
        name: "Type: enhancement",
        section: SORTED_BY_TYPE,
      },
      {
        name: "Type: epic",
        section: SORTED_BY_TYPE,
      },
      {
        name: "Type: feature request",
        section: SORTED_BY_TYPE,
      },
      {
        name: "Type: question",
        section: SORTED_BY_TYPE,
      },
    ],
    sdsIcon: "chevronRight2",
  },
  {
    columnName: "Column 3",
    columnWidth: 170,
    options: [
      {
        name: "Bacteria",
        sdsIcon: "bacteria",
        sdsIconProps: {
          color: "gray",
        },
        section: "With Icon",
      },
      {
        name: "Puzzle Piece",
        sdsIcon: "puzzlePiece",
        sdsIconProps: {
          color: "gray",
        },
        section: "With Icon",
      },
      {
        name: "Copy",
        sdsIcon: "copy",
        sdsIconProps: {
          color: "gray",
        },
        section: "With Icon",
      },
      {
        name: "Light Bulb",
        sdsIcon: "lightBulb",
        sdsIconProps: {
          color: "gray",
        },
        section: "With Icon",
      },
      {
        name: "List",
        sdsIcon: "list",
        sdsIconProps: {
          color: "gray",
        },
        section: "With Icon",
      },
      {
        name: "Vertical Tree",
        sdsIcon: "treeVertical",
        sdsIconProps: {
          color: "gray",
        },
        section: "With Icon",
      },
      {
        name: "Link",
        sdsIcon: "link",
        sdsIconProps: {
          color: "gray",
        },
        section: "With Icon",
      },
    ],
  },
];
