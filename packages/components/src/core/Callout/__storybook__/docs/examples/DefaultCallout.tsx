// Most minimal Callout (just has the basic requirements)

import { Callout } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout
        intent="info"
        title="Callout box"
        body="The Callout component is a versatile UI element designed to draw attention to important information or messages within your interface."
      />
    </div>
  );
}

export default App;
