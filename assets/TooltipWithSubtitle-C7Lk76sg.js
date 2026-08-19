import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// subtitle sits under title in smaller, dimmer text, for a detail like how to use
// the thing being pointed at. Both are optional, but a tooltip with neither a
// title, a subtitle, nor a componentSlot renders nothing at all.
//
// The trigger needs its own accessible name. An icon-only button gets one from
// aria-label, and it needs one because the tooltip text is not a substitute.

import { Button, Icon, Tooltip } from "@czi-sds/components";
import styled from "@emotion/styled";

const Stage = styled.div\`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 120px;
\`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Tooltip
          placement="top"
          subtitle="Values are recalculated whenever the filters change."
          title="Sequencing depth"
        >
          <Button
            aria-label="About sequencing depth"
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