// (masoudmanson): The unit tests rely on the content in this file; do not alter it!

import { DefaultAutocompleteOption } from ".";

const COLUMN_ONE = "Column One";
const COLUMN_TWO = "Column Two";
const COLUMN_THREE = "Column Three";

export const GITHUB_LABELS: DefaultAutocompleteOption[] = [
  {
    name: "Status: can't reproduce",
    section: COLUMN_ONE,
  },
  {
    name: "Status: confirmed",
    section: COLUMN_ONE,
  },
  {
    count: 3,
    name: "Status: duplicate",
    section: COLUMN_ONE,
  },
  {
    count: 5,
    name: "Status: needs information",
    section: COLUMN_ONE,
  },
  {
    details: "This will not be worked on",
    name: "Status: wont do/fix",
    section: COLUMN_ONE,
  },
  {
    details: "This is still in progress",
    name: "Status: work in progress",
    section: COLUMN_ONE,
  },
  {
    details: "This needs to be fixed!",
    name: "Type: bug",
    section: COLUMN_TWO,
  },
  {
    count: 4,
    name: "Type: discussion",
    section: COLUMN_TWO,
  },
  {
    name: "Type: documentation",
    section: COLUMN_TWO,
  },
  {
    name: "Type: enhancement",
    section: COLUMN_TWO,
  },
  {
    name: "Type: epic",
    section: COLUMN_TWO,
  },
  {
    count: 23,
    details: "This one is disabled.",
    name: "Type: feature request",
    section: COLUMN_TWO,
  },
  {
    name: "Type: question",
    section: COLUMN_TWO,
  },
  {
    name: "Epic: Documentation",
    section: COLUMN_THREE,
  },
  {
    name: "Epic: Dropdown Menu",
    section: COLUMN_THREE,
  },
  {
    name: "Epic: Migration to v5",
    section: COLUMN_THREE,
  },
];
