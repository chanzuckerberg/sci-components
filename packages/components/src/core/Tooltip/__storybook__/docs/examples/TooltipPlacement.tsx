// placement is MUI's, and all twelve values work: a side, optionally with -start or
// -end to pin the tooltip to one end of the trigger. A tooltip that would fall off
// the screen flips to the opposite side on its own.
//
// arrowOffset is SDS's, and it is not an offset: the number becomes the arrow's left
// position inside the tooltip, in pixels from its left edge. Small values move the
// arrow near the left corner and values past the tooltip's width push it out of
// sight, so it is only worth reaching for when the arrow has to line up with
// something narrower than the trigger.

import {
  Button,
  Icon,
  Tooltip,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type TooltipProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const PLACEMENTS: TooltipProps["placement"][] = [
  "top",
  "right",
  "bottom-start",
  "left-end",
];

const Stage = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.xxl}px;
      justify-content: center;
      padding: ${spaces?.xxl}px 0;
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
        {PLACEMENTS.map((placement) => (
          <Labelled key={placement}>
            <Tooltip placement={placement} title={`Placed ${placement}`}>
              <Button
                aria-label={`Tooltip placed ${placement}`}
                sdsStyle="minimal"
                sdsType="secondary"
              >
                <Icon sdsIcon="InfoCircle" sdsSize="s" />
              </Button>
            </Tooltip>
            {placement}
          </Labelled>
        ))}

        <Labelled>
          <Tooltip
            arrowOffset={12}
            placement="top"
            title="Arrow pinned 12px from the left edge"
          >
            <Button
              aria-label="Tooltip with an offset arrow"
              sdsStyle="minimal"
              sdsType="secondary"
            >
              <Icon sdsIcon="InfoCircle" sdsSize="s" />
            </Button>
          </Tooltip>
          arrowOffset
        </Labelled>
      </Stage>
    </div>
  );
}

export default App;
