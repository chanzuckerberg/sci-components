// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import { DefaultDropdownMenuOption } from "../DropdownMenu";
import Tag from "../Tag";

export const data: Record<string, DefaultDropdownMenuOption[]> = {
  Custom: [
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
  ],
  Status: [
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
  Type: [
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
  ],
};
