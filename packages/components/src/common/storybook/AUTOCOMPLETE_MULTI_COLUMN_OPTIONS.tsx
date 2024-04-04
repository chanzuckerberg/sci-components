// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import Icon from "../../core/Icon";
import CustomSdsIcon from "./customSdsIcon";
import CustomSvgIcon from "./customSvgIcon";

export const AUTOCOMPLETE_MULTI_COLUMN_OPTIONS = [
  {
    icon: <Icon sdsIcon="ChevronRight" sdsSize="xs" sdsType="static" />,
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
    icon: <Icon sdsIcon="ChevronRight" sdsSize="xs" sdsType="static" />,
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
        icon: <CustomSdsIcon sdsSize="s" color="gray" shade={500} />,
        name: "Custom SDS Icon",
        section: "With Icon",
      },
      {
        icon: (
          <CustomSvgIcon sx={{ color: "#767676", height: 16, width: 16 }} />
        ),
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
      },
      {
        count: 10,
        icon: "Copy",
        name: "Copy",
        sdsIconProps: {
          color: "gray",
          shade: 500,
        },
      },
      {
        icon: "LightBulb",
        name: "Light Bulb",
        sdsIconProps: {
          color: "gray",
          shade: 500,
        },
      },
      {
        count: 6,
        icon: "List",
        name: "List",
        sdsIconProps: {
          color: "gray",
          shade: 500,
        },
      },
      {
        icon: "TreeVertical",
        name: "Vertical Tree",
        sdsIconProps: {
          color: "gray",
          shade: 500,
        },
      },
      {
        icon: "Link",
        name: "Link",
        sdsIconProps: {
          color: "gray",
          shade: 500,
        },
      },
    ],
    width: 190,
  },
];
