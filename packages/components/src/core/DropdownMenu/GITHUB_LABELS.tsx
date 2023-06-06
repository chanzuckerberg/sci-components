// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import { DefaultDropdownMenuOption } from ".";
import Tag from "../Tag";

export const GITHUB_LABELS: DefaultDropdownMenuOption[] = [
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
    details: "This will not be worked on",
    name: "Type: bug",
    sdsIcon: "bacteria",
    sdsIconProps: {
      className: "custom-class-name",
    },
    section: "With Icon",
  },
  {
    count: 4,
    name: "Type: discussion",
    sdsIcon: "puzzlePiece",
    section: "With Icon",
  },
  {
    name: "Type: documentation",
    sdsIcon: "copy",
    section: "With Icon",
  },
  {
    name: "Type: enhancement",
    sdsIcon: "lightBulb",
    section: "With Icon",
  },
  {
    name: "Type: epic",
    sdsIcon: "list",
    section: "With Icon",
  },
  {
    name: "Type: feature request",
    sdsIcon: "treeVertical",
    section: "With Icon",
  },
  {
    name: "Type: question",
    sdsIcon: "search",
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
          />
          <Tag
            label="feature"
            sdsStyle="rounded"
            sdsType="secondary"
            color="warning"
          />
          <Tag
            label="refactor"
            sdsStyle="rounded"
            sdsType="secondary"
            color="gray"
          />
        </div>
      </div>
    ),
    name: "custom 2",
    section: "custom component",
  },
];
