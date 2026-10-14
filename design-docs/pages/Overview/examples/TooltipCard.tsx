// The Tooltip card on the Overview page.
//
// A card is a picture rather than a demo: it takes no pointer and is inert, so a
// component that only shows itself on hover or on a click has to be staged open
// here. That staging is why these live beside the catalog instead of on the
// component's own page, where an example should behave as it would in an app.
//
// Nothing has to ask for the tooltip to be drawn in place: the previews' theme
// unportals every popper already, so that an overlay is framed by the card that
// opened it rather than laid over the page. The popper options are the one thing
// the theme cannot hand over, because Tooltip passes options of its own, and
// without them the tooltip drifts off the button as the card moves down the
// window.

import { CARD_POPPER_OPTIONS } from "@sds-docs/cardPopper";
import { Button, Tooltip } from "@czi-sds/components";
import styled from "@emotion/styled";

const Stage = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 140px;
`;

function App() {
  return (
    <div className="app">
      <Stage>
        <Tooltip
          open
          slotProps={{ popper: { popperOptions: CARD_POPPER_OPTIONS } }}
          title="Recalculated whenever the filters change."
        >
          <Button sdsStyle="minimal" sdsType="secondary">
            Sequencing depth
          </Button>
        </Tooltip>
      </Stage>
    </div>
  );
}

export default App;
