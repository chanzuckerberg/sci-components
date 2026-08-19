import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// sdsType="overlay" is a temporary drawer: it floats over the page and always
// draws a close button, so give it closeButtonOnClick. isBackdropClickEnabled
// adds a click-outside target, which reports through onClose rather than through
// closeButtonOnClick, so both have to set the state.
//
// Panel fixes itself to the edge of the viewport, which on this page is the edge
// of the docs rather than of the example. ModalProps.container renders it inside
// Stage instead, which is why the panel waits for that node to exist, and
// Stage's transform makes it the box that fixed positioning resolves against.
// The transition needs the same node, or it measures its slide against the
// window and spends most of the animation outside the frame. Stage clips with
// overflow: clip rather than hidden, because a hidden box is one the browser can
// scroll: it would scroll the frame to reveal the panel as the panel takes focus
// on its way in, dragging the example's own content sideways. A real page wants
// the viewport and needs none of this; the padding on Stage just stands in for
// the spacing a page's own content would have.

import {
  Button,
  Icon,
  Panel,
  fontBodyS,
  fontHeaderM,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Stage = styled.div<CommonThemeProps>\`
  \${fontBodyS}

  \${(props) => {
    const semanticColors = getSemanticColors(props);

    return \`
      color: \${semanticColors?.base?.textPrimary};
      height: 340px;
      overflow: clip;
      padding: 50px;
      transform: translateZ(0);
    \`;
  }}
\`;

const Header = styled.h3<CommonThemeProps>\`
  \${fontHeaderM}
  margin: 0;
\`;

function App() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<HTMLDivElement | null>(null);

  return (
    <div className="app">
      <Stage ref={setStage}>
        <Button
          onClick={() => setOpen(true)}
          sdsStyle="solid"
          sdsType="primary"
          startIcon={<Icon sdsIcon="InfoCircle" sdsSize="s" />}
        >
          Show details
        </Button>

        <p>
          An overlay panel reads a piece of the page rather than changing it, so
          the content underneath stays where it is.
        </p>

        {stage && (
          <Panel
            closeButtonOnClick={() => setOpen(false)}
            HeaderComponent={<Header>Sample details</Header>}
            isBackdropClickEnabled
            ModalProps={{ container: stage }}
            onClose={() => setOpen(false)}
            open={open}
            position="right"
            sdsType="overlay"
            slotProps={{ transition: { container: stage } }}
          >
            Collection date, tissue, and the rest of the record for whichever
            row the page has selected.
          </Panel>
        )}
      </Stage>
    </div>
  );
}

export default App;
`}))();export{t as default};