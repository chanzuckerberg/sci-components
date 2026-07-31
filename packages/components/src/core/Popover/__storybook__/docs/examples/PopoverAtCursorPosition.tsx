// anchorReference="anchorPosition" positions the popover against a point instead
// of an element, which is what a right-click menu needs: there is no anchor to
// measure, only where the pointer was.
//
// anchorPosition is read in viewport coordinates, so clientX and clientY go
// straight in — no scroll offset, and no bounding rect. Everything else works as
// before, including the 8px the SDS transformOrigin subtracts, which is why the
// popover opens just below the cursor rather than under it.
//
// The browser's own context menu has to be prevented, and the surface is given a
// tabIndex and a keyboard route of its own, since a right-click is not something
// every person can perform.

import { useState, type MouseEvent } from "react";
import {
  Popover,
  fontBodyS,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

interface Point {
  left: number;
  top: number;
}

const Surface = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      align-items: center;
      background-color: ${semanticColors?.base?.backgroundSecondary};
      border: 1px dashed ${semanticColors?.base?.divider};
      border-radius: 6px;
      color: ${semanticColors?.base?.textSecondary};
      display: flex;
      justify-content: center;
      min-height: 120px;
      padding: ${spaces?.l}px;
      text-align: center;
    `;
  }}
`;

function App() {
  const [point, setPoint] = useState<Point | null>(null);

  const openAt = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPoint({ left: event.clientX, top: event.clientY });
  };

  return (
    <div className="app">
      <Surface
        onContextMenu={openAt}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const box = event.currentTarget.getBoundingClientRect();
            setPoint({ left: box.left + box.width / 2, top: box.top });
          }
        }}
        role="button"
        tabIndex={0}
      >
        Right-click anywhere in here, or focus it and press Enter
      </Surface>

      <Popover
        anchorPosition={point ?? undefined}
        anchorReference="anchorPosition"
        onClose={() => setPoint(null)}
        open={point !== null}
      >
        Opened at the cursor
      </Popover>
    </div>
  );
}

export default App;
