// The TooltipTable card on the Overview page. See TooltipCard for why the catalog
// stages its components open, and TooltipCondensedCard for why an open condensed
// tooltip needs an anchor of its own, and its popper options.

import { CARD_POPPER_OPTIONS } from "@sds-docs/cardPopper";
import {
  TooltipCondensed,
  TooltipTable,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

// Two sections and four rows, which is as tall as a card has room for: a table
// that runs past the frame is cropped along one edge, and a heading is the worst
// thing to lose.
const DATA = [
  {
    dataRows: [
      { label: "Cells", value: "1,284" },
      { label: "Median genes", value: "2,105" },
    ],
    label: "Sample",
  },
  {
    dataRows: [
      { label: "Depth", value: "34x" },
      { label: "Duplicates", value: "8.1%" },
    ],
    label: "Sequencing",
  },
];

const Stage = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      justify-content: center;
      /* The tooltip is out of flow and always to the right of its trigger, so
         centring the trigger alone would push the table off the edge of the card.
         Holding the tooltip's width free on that side centres the pair. */
      padding: ${spaces?.xl}px 250px ${spaces?.xl}px 0;
    `;
  }}
`;

const Cell = styled.div<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      color: ${semanticColors?.base?.textPrimary};
      cursor: default;
      padding: ${spaces?.s}px ${spaces?.m}px;
    `;
  }}
`;

function App() {
  const [cell, setCell] = useState<HTMLElement | null>(null);

  return (
    <div className="app">
      <Stage>
        <TooltipCondensed
          componentSlot={<TooltipTable data={DATA} itemAlign="right" />}
          open={Boolean(cell)}
          slotProps={{
            popper: {
              anchorEl: cell,
              /* A condensed tooltip stands on the bottom edge of what it is
                 given, which for a cursor is where a tooltip belongs. Level with
                 the cell instead, so that a table as tall as this one is centred
                 in the card rather than hanging out of the top of it. */
              placement: "right",
              popperOptions: CARD_POPPER_OPTIONS,
            },
          }}
          title={null}
        >
          <Cell ref={setCell}>Sample AB-1024</Cell>
        </TooltipCondensed>
      </Stage>
    </div>
  );
}

export default App;
