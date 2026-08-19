// Replacing the intent's default icon with any SDS icon

import { Callout } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout
        intent="accent"
        icon="Bacteria"
        title="Custom icon"
        body="Pass an icon name to swap the icon the intent would otherwise pick."
      />
    </div>
  );
}

export default App;
