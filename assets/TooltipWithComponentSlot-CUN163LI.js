import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// componentSlot takes anything React can render and puts it under the title and
// subtitle, with 12px between them. It is the way to get something other than text
// into a tooltip (a legend, a thumbnail, a link) because title and subtitle are
// each wrapped in a paragraph, so a table or a div passed to title produces invalid
// HTML.
//
// A tooltip is interactive: the pointer can travel from the trigger, across the gap,
// and onto the tooltip without closing it, which is what makes the link below
// reachable. Content that has to be clicked only works because of that, and it stops
// working the moment disableInteractive is set.

import {
  Button,
  Icon,
  Tooltip,
  focusVisibleA11yStyle,
  fontBodyXs,
  fontLinkXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const Stage = styled.div\`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 140px;
\`;

const Legend = styled.div<CommonThemeProps>\`
  \${fontBodyXs}

  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      display: flex;
      flex-direction: column;
      gap: \${spaces?.xxs}px;
      text-align: left;
    \`;
  }}
\`;

const Swatch = styled.span<CommonThemeProps>\`
  \${(props) => {
    const spaces = getSpaces(props);

    return \`
      align-items: center;
      display: flex;
      gap: \${spaces?.s}px;

      &::before {
        border-radius: 2px;
        content: "";
        height: 10px;
        width: 10px;
      }
    \`;
  }}
\`;

const PassingSwatch = styled(Swatch)<CommonThemeProps>\`
  \${(props) => \`
    &::before {
      background-color: \${getSemanticColors(props)?.positive?.fillPrimary};
    }
  \`}
\`;

const FailingSwatch = styled(Swatch)<CommonThemeProps>\`
  \${(props) => \`
    &::before {
      background-color: \${getSemanticColors(props)?.negative?.fillPrimary};
    }
  \`}
\`;

// The tooltip renders in a portal outside the page's styles, so a link inside one
// carries the SDS link type style itself.
const SlotLink = styled.a<CommonThemeProps>\`
  \${fontLinkXs}
  \${focusVisibleA11yStyle}

  \${(props) => {
    const semanticColors = getSemanticColors(props);

    return \`
      color: \${semanticColors?.accent?.textAction};
      text-underline-offset: 2.5px;

      &:hover {
        color: \${semanticColors?.accent?.textActionHover};
      }
    \`;
  }}
\`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Tooltip
          componentSlot={
            <Legend>
              <PassingSwatch>Above 30x coverage</PassingSwatch>
              <FailingSwatch>Below the threshold</FailingSwatch>
              <SlotLink href="https://sds.czi.design/009eaf17b">
                Read the full method
              </SlotLink>
            </Legend>
          }
          placement="right"
          textAlign="left"
          title="Coverage"
        >
          <Button
            aria-label="Coverage legend"
            sdsStyle="minimal"
            sdsType="secondary"
          >
            <Icon sdsIcon="InfoCircle" sdsSize="s" />
          </Button>
        </Tooltip>
      </Stage>
    </div>
  );
}

export default App;
`}))();export{t as default};