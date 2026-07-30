// sdsType="basic" is a persistent drawer: it sits in the page rather than over
// it, and nothing closes it but your own control. It does not move the page's
// content, so shift that yourself by the same width you gave the panel.
//
// Panel fixes itself to the edge of the viewport, which on this page is the edge
// of the docs rather than of the example. Stage carries a transform, which makes
// it the box that fixed positioning resolves against, so the panel stays in the
// frame, flush against its edge as it would be against the window's. A real page
// wants the viewport and needs none of this, and the padding below stands in for
// whatever spacing the page's own content already has.

import {
  Button,
  Icon,
  Panel,
  fontBodyS,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const PANEL_WIDTH = 280;

const Stage = styled.div`
  height: 320px;
  overflow: hidden;
  transform: translateZ(0);
`;

const Content = styled.div<CommonThemeProps & { shifted: boolean }>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      margin-left: ${props.shifted ? `${PANEL_WIDTH}px` : "0"};
      padding: 50px;
      transition: margin-left 225ms ease-out;
    `;
  }}
`;

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app">
      <Stage>
        <Panel open={open} sdsType="basic" width={PANEL_WIDTH}>
          Filters, dataset pickers, and anything else that changes what the page
          shows.
        </Panel>

        <Content shifted={open}>
          <Button
            onClick={() => setOpen((prev) => !prev)}
            sdsStyle="solid"
            sdsType="primary"
            startIcon={<Icon sdsIcon="Filter" sdsSize="s" />}
          >
            {open ? "Hide filters" : "Show filters"}
          </Button>

          <p>
            The page's own content moves aside for a basic panel, so the two
            never overlap.
          </p>
        </Content>
      </Stage>
    </div>
  );
}

export default App;
