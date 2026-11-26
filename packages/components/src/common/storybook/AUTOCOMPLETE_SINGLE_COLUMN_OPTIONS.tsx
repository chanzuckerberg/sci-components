// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import {
  CopyIcon,
  GitBranchIcon,
  LightbulbIcon,
  LinkIcon,
  ListBulletsIcon,
  PuzzlePieceIcon,
  VirusIcon,
} from "@phosphor-icons/react";
import Tag from "@components/src/core/Tag";
import CustomSvgIcon from "./svg/customSvgIcon";

const ICON_GRAY = "#969696";

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
    disabled: true,
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
    disabled: true,
  },
  {
    details: "This is still in progress",
    name: "Status: work in progress",
    section: "name with details",
  },
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
    section: "With Icon",
  },
  {
    count: 10,
    icon: <CopyIcon weight="bold" color={ICON_GRAY} />,
    name: "Copy",
    section: "With Icon",
  },
  {
    icon: <LightbulbIcon weight="bold" color={ICON_GRAY} />,
    name: "Light Bulb",
    section: "With Icon",
  },
  {
    count: 6,
    icon: <ListBulletsIcon weight="bold" color={ICON_GRAY} />,
    name: "List",
    section: "With Icon",
  },
  {
    icon: <GitBranchIcon weight="bold" color={ICON_GRAY} />,
    name: "Vertical Tree",
    section: "With Icon",
  },
  {
    icon: <LinkIcon weight="bold" color={ICON_GRAY} />,
    name: "Link",
    section: "With Icon",
  },
  {
    component: (
      <div>
        Available Labels:
        <div
          style={{
            marginTop: 2,
            marginBottom: 4,
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          <Tag label="bug" sdsStyle="outline" color="negative" />
          <Tag label="feature" sdsStyle="outline" color="positive" />
          <Tag label="refactor" sdsStyle="outline" color="notice" />
        </div>
      </div>
    ),
    name: "Available labels",
    section: "custom component",
  },
];
