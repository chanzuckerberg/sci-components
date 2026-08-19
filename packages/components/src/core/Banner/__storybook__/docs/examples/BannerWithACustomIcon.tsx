// Replacing the intent's default icon with any SDS icon

import { Banner } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Banner sdsType="secondary" intent="accent" icon="Bacteria">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
    </div>
  );
}

export default App;
