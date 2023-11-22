// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import Tag from "../core/Tag";

export const AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS = [
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
    count: 10,
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
    count: 6,
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
  {
    component: (
      <div>
        Available Labels:
        <div style={{ marginTop: 10 }}>
          <Tag
            label="bug"
            sdsStyle="rounded"
            sdsType="secondary"
            color="error"
            hover={false}
          />
          <Tag
            label="feature"
            sdsStyle="rounded"
            sdsType="secondary"
            color="warning"
            hover={false}
          />
          <Tag
            label="refactor"
            sdsStyle="rounded"
            sdsType="secondary"
            color="gray"
            hover={false}
          />
        </div>
      </div>
    ),
    name: "Available labels",
    section: "custom component",
  },
];
