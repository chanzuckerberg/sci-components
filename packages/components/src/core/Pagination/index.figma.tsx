import React from "react";
import Pagination from "./index";
import figma from "@figma/code-connect";

figma.connect(
  Pagination,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=6867%3A25911",
  {
    props: {
      // Figma "rounded" -> code "round" ("round" | "square"); square is 1:1.
      sdsStyle: figma.enum("sdsStyle", {
        rounded: "round",
        square: "square",
      }),
      // Intentionally unmapped — these Figma variants are derived state, not
      // authorable props:
      // - pageQuantity ("2 pages".."7+ pages"): the page count is computed by
      //   usePagination from totalCount / pageSize (Math.ceil). No count prop
      //   exists, and "7+" isn't a number.
      // - activePosition (first..seventh): this is `currentPage`, a number —
      //   data/state, not an enum, so the ordinal preview can't map to it.
      // - hoveredPosition (previous/first../next): pure hover preview state.
    },
    example: ({ sdsStyle }) => (
      // PLACEHOLDER DATA — replace with your own. Pagination is a controlled
      // component: totalCount/currentPage/pageSize are your data, and the
      // callbacks wire to your page-change handlers. Values below are illustrative.
      <Pagination
        sdsStyle={sdsStyle}
        totalCount={100}
        currentPage={1}
        pageSize={10}
        onPageChange={() => {}}
        onNextPage={() => {}}
        onPreviousPage={() => {}}
      />
    ),
  }
);
