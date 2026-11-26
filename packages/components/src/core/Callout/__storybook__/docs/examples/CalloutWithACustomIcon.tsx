// Replacing the intent's default icon with any Phosphor or @czi-sds/icons icon

import { VirusIcon } from "@phosphor-icons/react";
import { Callout } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout
        intent="accent"
        icon={<VirusIcon weight="bold" />}
        title="Custom icon"
        body="Pass an icon element to swap the icon the intent would otherwise pick."
      />
    </div>
  );
}

export default App;
