// hasInvertedStyle={false} draws the light tooltip: a white surface with a hairline
// outline and body text rather than semibold. The design treats this one as the
// default, so it is worth asking for deliberately.
//
// width="wide" lifts the cap from 250px to 550px and switches the text to the left,
// which is what longer explanations need. It logs a warning saying wide is for light
// tooltips only. The check is broken and fires whichever style you use, so it can
// be ignored here.

import {
  Button,
  Icon,
  Tooltip,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const LONG_TEXT =
  "Reads are aligned to the reference genome with minimap2, then filtered to remove duplicates and anything below the mapping quality threshold set for the project.";

const Stage = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      gap: ${spaces?.xxl}px;
      justify-content: center;
      min-height: 140px;
    `;
  }}
`;

const Labelled = styled.div<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      align-items: center;
      color: ${semanticColors?.base?.textSecondary};
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xs}px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Labelled>
          <Tooltip
            hasInvertedStyle={false}
            placement="top"
            title="Aligned with minimap2"
          >
            <Button
              aria-label="About alignment"
              sdsStyle="minimal"
              sdsType="secondary"
            >
              <Icon sdsIcon="InfoCircle" sdsSize="s" />
            </Button>
          </Tooltip>
          Default width
        </Labelled>

        <Labelled>
          <Tooltip
            hasInvertedStyle={false}
            placement="top"
            title={LONG_TEXT}
            width="wide"
          >
            <Button
              aria-label="About the alignment pipeline"
              sdsStyle="minimal"
              sdsType="secondary"
            >
              <Icon sdsIcon="InfoCircle" sdsSize="s" />
            </Button>
          </Tooltip>
          Wide
        </Labelled>
      </Stage>
    </div>
  );
}

export default App;
