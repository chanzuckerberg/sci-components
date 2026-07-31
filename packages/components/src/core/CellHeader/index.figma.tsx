import React from "react";
import CellHeader from "./index";
import figma from "@figma/code-connect";

figma.connect(
  CellHeader,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=5618%3A13366",
  {
    props: {
      // Header label — read the characters from the "Header" text layer.
      children: figma.textContent("Header"),
      // sdsStage (sorted/unsorted) is the active-sort state -> boolean `active`.
      active: figma.enum("sdsStage", {
        sorted: true,
        unsorted: false,
      }),
      // sortDirection -> `direction` ("asc" | "desc"). Figma's "none" has no code
      // value, so it intentionally falls through to undefined (code default "desc").
      direction: figma.enum("sortDirection", {
        ascending: "asc",
        descending: "desc",
      }),
      // INVERTED polarity: Figma showSortIcon? (true = icon shown) is the opposite
      // of code hideSortIcon (true = icon hidden).
      hideSortIcon: figma.boolean("showSortIcon?", {
        true: false,
        false: true,
      }),
      horizontalAlign: figma.enum("horizontalAlignment", {
        left: "left",
        center: "center",
        right: "right",
      }),
      // Intentionally unmapped:
      // - "state" (default/hover): a hover/preview visual state; the code `hover`
      //   prop is driven by table interaction, not an authored value.
      // - "textWrap?" (true/false variant): no equivalent code prop. Nearest concept
      //   is `shouldTruncate` (ellipsis), which differs in meaning and polarity.
    },
    example: (props) => (
      <CellHeader
        active={props.active}
        direction={props.direction}
        hideSortIcon={props.hideSortIcon}
        horizontalAlign={props.horizontalAlign}
      >
        {props.children}
      </CellHeader>
    ),
  }
);
