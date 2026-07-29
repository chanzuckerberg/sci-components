// Expandable Callout: children are the extra content revealed by the chevron

import { Callout } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout
        intent="notice"
        sdsStyle="expandable"
        sdsStage="closed"
        title="Attention Required"
        body="The Callout serves as a visual alert to draw immediate attention to information that requires action or consideration."
      >
        Use the expandable style strategically, and only when there really is
        extra content to reveal. The chevron is rendered either way, so an
        expandable Callout with no children toggles to an empty section.
      </Callout>
    </div>
  );
}

export default App;
