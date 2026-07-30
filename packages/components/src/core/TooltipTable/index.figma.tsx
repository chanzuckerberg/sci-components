import React from "react";
import TooltipTable from "./index";
import figma from "@figma/code-connect";

/**
 * TooltipTable renders from a `data` array — without it the component renders
 * nothing, so the array must appear in the example.
 *
 * `data` CANNOT be mapped from Figma: the design nests Section/Row instances,
 * but the code takes a JS array of objects, and figma.textContent/children read
 * single layers or rendered snippets, not data structures. The content in the
 * library component is itself placeholder (designers replace it per use), so
 * there is no "real" content to match — the example uses generic placeholders
 * with an explicit callout instead.
 *
 * NOT MAPPED:
 *   - `section #` (1/2/3): a Figma authoring count with no code prop; section
 *     count is expressed by the number of entries in `data`.
 *   - `itemAlign` ("left" | "right", defaults to "right") and `contentAlert`:
 *     no corresponding Figma properties; left to code defaults.
 */
figma.connect(
  TooltipTable,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=3258%3A61211",
  {
    props: {
      showSectionHeader: figma.boolean("showSectionNames?"),
    },
    example: ({ showSectionHeader }) => (
      <TooltipTable
        showSectionHeader={showSectionHeader}
        // PLACEHOLDER DATA — replace with your own. Structure is accurate;
        // section/row counts and text are illustrative only.
        data={[
          {
            dataRows: [
              { label: "Row label 1", value: "Value 1" },
              { label: "Row label 2", value: "Value 2" },
            ],
            label: "Section label 1",
          },
          {
            dataRows: [
              { label: "Row label 1", value: "Value 1" },
              { label: "Row label 2", value: "Value 2" },
            ],
            label: "Section label 2",
          },
        ]}
      />
    ),
  }
);
