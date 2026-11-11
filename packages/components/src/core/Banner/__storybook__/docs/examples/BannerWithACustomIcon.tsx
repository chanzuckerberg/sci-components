// Replacing the intent's default icon with any Phosphor or @czi-sds/icons icon

import { VirusIcon } from "@phosphor-icons/react";
import { Banner } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Banner
        sdsType="secondary"
        intent="accent"
        icon={<VirusIcon weight="bold" />}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
    </div>
  );
}

export default App;
