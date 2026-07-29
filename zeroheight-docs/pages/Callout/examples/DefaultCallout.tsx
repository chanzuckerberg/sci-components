// Most minimal Callout (just has the basic requirements)

import { Callout, CalloutTitle } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout intent="info">
        <CalloutTitle>Callout box</CalloutTitle>
        The Callout Box component is a versatile UI element designed to draw
        attention to important information or messages within your interface.
        With its clean and elegant design, the Callout Box helps highlight key
        content, alerts, or contextual details.
      </Callout>
    </div>
  );
}

export default App;
