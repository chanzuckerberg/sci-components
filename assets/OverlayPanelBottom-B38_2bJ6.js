import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// position="bottom" belongs to the overlay type only, and it turns the width
// prop into a height: the panel spans the full width and stands as tall as the
// value you pass. The paper also has a 320px floor in both directions, so a
// smaller number changes nothing.
//
// Panel fixes itself to the edge of the viewport, which on this page is the edge
// of the docs rather than of the example. ModalProps.container renders it inside
// Stage instead, which is why the panel waits for that node to exist, and
// Stage's transform makes it the box that fixed positioning resolves against.
// The transition needs the same node, or it measures its slide against the
// window and spends most of the animation outside the frame, and Stage clips with
// overflow: clip rather than hidden so the browser cannot scroll the frame to
// reveal the panel while it is still on its way in. A real page wants the
// viewport and needs none of this; the padding on Stage just stands in for the
// spacing a page's own content would have.

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
      height: 520px;
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

const Table = styled.div<CommonThemeProps>\`
  \${(props) => {
    const semanticColors = getSemanticColors(props);

    return \`
      border: 1px dashed \${semanticColors?.base?.divider};
      border-radius: 4px;
      color: \${semanticColors?.base?.textSecondary};
      padding: 24px;
    \`;
  }}
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
          startIcon={<Icon sdsIcon="Table" sdsSize="s" />}
        >
          Show table
        </Button>

        <p>
          A bottom panel suits content that is wider than it is tall, such as a
          table of the rows behind a chart.
        </p>

        {stage && (
          <Panel
            closeButtonOnClick={() => setOpen(false)}
            HeaderComponent={<Header>Underlying rows</Header>}
            ModalProps={{ container: stage }}
            onClose={() => setOpen(false)}
            open={open}
            position="bottom"
            sdsType="overlay"
            slotProps={{ transition: { container: stage } }}
            width={360}
          >
            <Table>[Table of rows, 360px of height to work with]</Table>
          </Panel>
        )}
      </Stage>
    </div>
  );
}

export default App;
`}))();export{t as default};