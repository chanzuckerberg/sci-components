// An SDS icon and a Phosphor icon side by side. Same props, different import.

import { BiohubIcon } from "@czi-sds/icons";
import { HeartIcon } from "@phosphor-icons/react";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <BiohubIcon size={32} />
      <HeartIcon size={32} />
    </div>
  );
}

export default App;
