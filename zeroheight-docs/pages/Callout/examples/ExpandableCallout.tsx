// Expandable Callout

import { Callout, CalloutTitle } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout intent="notice" sdsStyle="expandable">
        <CalloutTitle>Attention Required</CalloutTitle>
        The Warning Callout serves as a visual alert to draw immediate attention
        to critical information that requires action or consideration. Its
        distinct appearance, coupled with the "Attention Required" message,
        signals urgency and prompts users to take appropriate steps. Use this
        component strategically to ensure vital messages are noticed promptly
        and acted upon, enhancing user awareness and responsiveness.
      </Callout>
    </div>
  );
}

export default App;
