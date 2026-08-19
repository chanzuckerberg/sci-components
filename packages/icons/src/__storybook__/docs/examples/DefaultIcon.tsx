// An SDS icon and a Phosphor icon side by side. Same props, different import.

import { SdsBiohubIcon } from "@czi-sds/icons";
import { HeartIcon } from "@phosphor-icons/react";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <SdsBiohubIcon size={32} />
      <HeartIcon size={32} />
    </div>
  );
}

export default App;
