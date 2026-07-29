// Every intent, each with the icon the Callout picks by default

import { Callout } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout
        intent="info"
        title="Info"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Callout
        intent="accent"
        title="Accent"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Callout
        intent="positive"
        title="Positive"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Callout
        intent="notice"
        title="Notice"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Callout
        intent="negative"
        title="Negative"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    </div>
  );
}

export default App;
