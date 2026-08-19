import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// anchorOrigin names the point on the trigger, transformOrigin the point on the
// popover that meets it. A string names a corner or an edge; a number is measured
// in pixels and subtracted from the anchor point, which is how a gap is made.
//
// SDS already sets both to open the popover 8px below the left of its trigger. The
// defaults are spread before your props, so each one is replaced whole rather than
// merged: every pair below has to write its own gap back in as a negative number.

import { useState } from "react";
import {
  Button,
  Popover,
  getSpaces,
  type CommonThemeProps,
  type PopoverProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const GAP = 8;

interface Placement {
  anchorOrigin: PopoverProps["anchorOrigin"];
  description: string;
  label: string;
  transformOrigin: PopoverProps["transformOrigin"];
}

const PLACEMENTS: Placement[] = [
  {
    anchorOrigin: { horizontal: "left", vertical: "bottom" },
    description: "Below, left aligned",
    label: "Default",
    transformOrigin: { horizontal: 0, vertical: -GAP },
  },
  {
    anchorOrigin: { horizontal: "right", vertical: "bottom" },
    description: "Below, right aligned",
    label: "Right aligned",
    transformOrigin: { horizontal: "right", vertical: -GAP },
  },
  {
    anchorOrigin: { horizontal: "right", vertical: "top" },
    description: "Beside the trigger",
    label: "To the side",
    transformOrigin: { horizontal: -GAP, vertical: "top" },
  },
];

const Stage = styled.div<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      flex-wrap: wrap;
      gap: \${spaces?.l}px;
    \`;
  }}
\`;

function App() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const close = () => {
    setOpenIndex(null);
    setAnchorEl(null);
  };

  return (
    <div className="app">
      <Stage>
        {PLACEMENTS.map((placement, index) => (
          <div key={placement.label}>
            <Button
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setOpenIndex(index);
              }}
              sdsStyle="outline"
              sdsType="primary"
            >
              {placement.label}
            </Button>

            <Popover
              anchorEl={anchorEl}
              anchorOrigin={placement.anchorOrigin}
              onClose={close}
              open={openIndex === index}
              transformOrigin={placement.transformOrigin}
            >
              {placement.description}
            </Popover>
          </div>
        ))}
      </Stage>
    </div>
  );
}

export default App;
`}))();export{t as default};