// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import Tag from "../core/Tag";
import CustomSdsIcon from "./customSdsIcon";
import CustomSvgIcon from "./customSvgIcon";

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
    icon: <CustomSdsIcon sdsSize="s" color="gray" />,
    name: "Custom SDS Icon",
    section: "With Icon",
  },
  {
    icon: <CustomSvgIcon sx={{ color: "#999", height: 14, width: 14 }} />,
    name: "Custom SVG Icon",
    section: "With Icon",
  },
  {
    icon: "puzzlePiece",
    name: "Puzzle Piece",
    sdsIconProps: {
      color: "gray",
      sdsSize: "xl",
    },
    section: "With Icon",
  },
  {
    count: 10,
    icon: "copy",
    name: "Copy",
    sdsIconProps: {
      color: "gray",
    },
    section: "With Icon",
  },
  {
    icon: "lightBulb",
    name: "Light Bulb",
    sdsIconProps: {
      color: "gray",
    },
    section: "With Icon",
  },
  {
    count: 6,
    icon: "list",
    name: "List",
    sdsIconProps: {
      color: "gray",
    },
    section: "With Icon",
  },
  {
    icon: "treeVertical",
    name: "Vertical Tree",
    sdsIconProps: {
      color: "gray",
    },
    section: "With Icon",
  },
  {
    icon: "link",
    name: "Link",
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
