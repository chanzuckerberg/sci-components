// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import {
  CaretRightIcon,
  CopyIcon,
  GitBranchIcon,
  LightbulbIcon,
  LinkIcon,
  ListBulletsIcon,
  PuzzlePieceIcon,
  VirusIcon,
} from "@phosphor-icons/react";
import CustomSvgIcon from "./svg/customSvgIcon";

const ICON_GRAY = "#969696";

export const AUTOCOMPLETE_MULTI_COLUMN_OPTIONS = [
  {
    icon: <CaretRightIcon weight="bold" />,
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
        disabled: true,
      },
      {
        count: 5,
        name: "Status: needs information",
        disabled: true,
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
    icon: <CaretRightIcon weight="bold" />,
    name: "Column Two",
    options: [
      {
        details: "This will be worked on!",
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
    icon: <CaretRightIcon weight="bold" />,
    name: "Column Three",
    options: [
      {
        icon: <VirusIcon weight="bold" color="#50b96d" />,
        name: "Custom Phosphor Icon",
        section: "With Icon",
      },
      {
        icon: <CustomSvgIcon sx={{ color: "orange", height: 16, width: 16 }} />,
        name: "Custom SVG Icon",
        section: "With Icon",
      },
      {
        icon: <PuzzlePieceIcon weight="bold" color={ICON_GRAY} />,
        name: "Puzzle Piece",
      },
      {
        count: 10,
        icon: <CopyIcon weight="bold" color={ICON_GRAY} />,
        name: "Copy",
      },
      {
        icon: <LightbulbIcon weight="bold" color={ICON_GRAY} />,
        name: "Light Bulb",
      },
      {
        count: 6,
        icon: <ListBulletsIcon weight="bold" color={ICON_GRAY} />,
        name: "List",
      },
      {
        icon: <GitBranchIcon weight="bold" color={ICON_GRAY} />,
        name: "Vertical Tree",
      },
      {
        icon: <LinkIcon weight="bold" color={ICON_GRAY} />,
        name: "Link",
      },
    ],
    width: 200,
  },
];
