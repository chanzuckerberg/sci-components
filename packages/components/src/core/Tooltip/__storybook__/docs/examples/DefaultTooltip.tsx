// The least a tooltip needs: a title, and something to hang it on. The dark
// scheme, the arrow and the placement below the trigger all come as standard, so
// hover or focus the button to see what the component does unasked.
//
// The trigger still says what it is. A tooltip adds to a label; it is not one.

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
        <Tooltip title="Recalculated whenever the filters change.">
          <Button sdsStyle="minimal" sdsType="secondary">
            Sequencing depth
          </Button>
        </Tooltip>
      </Stage>
    </div>
  );
}

export default App;
