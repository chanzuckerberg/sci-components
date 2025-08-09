// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import Tag from "../../core/Tag";
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
    icon: <CustomSdsIcon sdsSize="s" color="green" shade={400} />,
    name: "Custom SDS Icon",
    section: "With Icon",
  },
  {
    icon: <CustomSvgIcon sx={{ color: "orange", height: 16, width: 16 }} />,
    name: "Custom SVG Icon",
    section: "With Icon",
  },
  {
    icon: "PuzzlePiece",
    name: "Puzzle Piece",
    sdsIconProps: {
      color: "gray",
      shade: 500,
    },
    section: "With Icon",
  },
  {
    count: 10,
    icon: "Copy",
    name: "Copy",
    sdsIconProps: {
      color: "gray",
      shade: 500,
    },
    section: "With Icon",
  },
  {
    icon: "LightBulb",
    name: "Light Bulb",
    sdsIconProps: {
      color: "gray",
      shade: 500,
    },
    section: "With Icon",
  },
  {
    count: 6,
    icon: "List",
    name: "List",
    sdsIconProps: {
      color: "gray",
      shade: 500,
    },
    section: "With Icon",
  },
  {
    icon: "TreeVertical",
    name: "Vertical Tree",
    sdsIconProps: {
      color: "gray",
      shade: 500,
    },
    section: "With Icon",
  },
  {
    icon: "Link",
    name: "Link",
    sdsIconProps: {
      color: "gray",
      shade: 500,
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
            color="negative"
            hover={false}
          />
          <Tag
            label="feature"
            sdsStyle="rounded"
            sdsType="secondary"
            color="positive"
            hover={false}
          />
          <Tag
            label="refactor"
            sdsStyle="rounded"
            sdsType="secondary"
            color="neutral"
            hover={false}
          />
        </div>
      </div>
    ),
    name: "Available labels",
    section: "custom component",
  },
];
