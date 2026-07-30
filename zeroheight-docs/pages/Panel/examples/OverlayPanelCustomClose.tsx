// CloseButtonComponent replaces the default X. The click handler stays on
// closeButtonOnClick, which the panel attaches to the wrapper around whatever
// you pass, so the replacement needs no onClick of its own. The wrapper also
// forces any icon inside a button to 24px, so sdsSize on it has no effect.
//
// Stage and ModalProps.container are here only to keep the panel inside the
// example frame, as in the examples above.

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

const Stage = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      height: 340px;
      overflow: hidden;
      padding: 50px;
      transform: translateZ(0);
    `;
  }}
`;

const Header = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      h3 {
        ${fontHeaderM(props)}
        margin: 0;
      }

      p {
        ${fontBodyS(props)}
        color: ${semanticColors?.base?.textSecondary};
        margin: 4px 0 0 0;
      }
    `;
  }}
`;

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
          startIcon={<Icon sdsIcon="Gear" sdsSize="s" />}
        >
          Show settings
        </Button>

        <p>The header holds as much as you want to put in it.</p>

        {stage && (
          <Panel
            closeButtonOnClick={() => setOpen(false)}
            CloseButtonComponent={
              <Button sdsStyle="minimal" sdsType="primary">
                Done
              </Button>
            }
            HeaderComponent={
              <Header>
                <h3>Display settings</h3>
                <p>Applies to this session only</p>
              </Header>
            }
            ModalProps={{ container: stage }}
            onClose={() => setOpen(false)}
            open={open}
            position="right"
            sdsType="overlay"
            width={360}
          >
            Colour scale, point size, and the other controls for the plot.
          </Panel>
        )}
      </Stage>
    </div>
  );
}

export default App;
