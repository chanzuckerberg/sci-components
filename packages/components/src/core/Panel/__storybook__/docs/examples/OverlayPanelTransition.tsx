// transitionDuration sets how long the panel takes to travel in and out, in
// milliseconds. A single number times both directions; { enter, exit } times them
// separately, and 0 removes the animation. The Panel defaults to
// { enter: 225, exit: 195 }, which is MUI's drawer timing rather than the SDS
// theme's much shorter one.
//
// The duration stays put while the panel closes so the exit runs at the speed it
// opened with. Swapping it back on close would exit at the new speed instead.
//
// Stage, ModalProps.container and the transition's container are here only to
// keep the panel and its slide inside the example frame, as in the examples
// above.

import {
  Button,
  Panel,
  fontBodyS,
  fontBodyXs,
  fontHeaderM,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type PanelProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const SPEEDS: {
  duration: PanelProps["transitionDuration"];
  label: string;
}[] = [
  { duration: { enter: 225, exit: 195 }, label: "Default" },
  { duration: { enter: 700, exit: 500 }, label: "Slow" },
  { duration: 120, label: "Quick, both ways" },
  { duration: 0, label: "None" },
];

const Stage = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      height: 340px;
      overflow: clip;
      padding: 50px;
      transform: translateZ(0);
    `;
  }}
`;

const Controls = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.s}px;
    `;
  }}
`;

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
    `;
  }}
`;

const Header = styled.h3<CommonThemeProps>`
  ${fontHeaderM}
  margin: 0;
`;

function App() {
  const [open, setOpen] = useState(false);
  const [speed, setSpeed] = useState(SPEEDS[0]);
  const [stage, setStage] = useState<HTMLDivElement | null>(null);

  return (
    <div className="app">
      <Stage ref={setStage}>
        <Controls>
          {SPEEDS.map((option) => (
            <Button
              key={option.label}
              onClick={() => {
                setSpeed(option);
                setOpen(true);
              }}
              sdsStyle="outline"
              sdsType="secondary"
            >
              {option.label}
            </Button>
          ))}
        </Controls>

        <Readout>
          Opening with transitionDuration of {JSON.stringify(speed.duration)}
        </Readout>

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
            transitionDuration={speed.duration}
          >
            Close this and pick another speed to compare them.
          </Panel>
        )}
      </Stage>
    </div>
  );
}

export default App;
