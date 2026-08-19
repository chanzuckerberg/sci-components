// A disabled button fires no pointer events, so a tooltip attached straight to one
// never opens. Wrapping it in a span gives the tooltip an element that still reports
// hovers.
//
// The span works for the keyboard too, without any extra work: SDS puts tabIndex={0}
// on whatever a tooltip wraps, so the span becomes a tab stop of its own and the
// tooltip opens when it takes focus. That is the one route left, since the disabled
// button itself cannot be focused.

import { Button, Tooltip } from "@czi-sds/components";
import styled from "@emotion/styled";

const Stage = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 120px;
`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Tooltip
          placement="top"
          title="Pick at least one sample before exporting"
        >
          <span>
            <Button disabled sdsStyle="solid" sdsType="primary">
              Export
            </Button>
          </span>
        </Tooltip>
      </Stage>
    </div>
  );
}

export default App;
