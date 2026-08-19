import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// \`IconContext\` comes from Phosphor and covers both packages, because SDS icons
// are built on Phosphor's IconBase and read the very same context.

import { AtlasIcon } from "@czi-sds/icons";
import { IconContext, HeartIcon } from "@phosphor-icons/react";

function App() {
  return (
    <IconContext.Provider value={{ color: "#3867fa", size: 32 }}>
      <div className="app" style={{ display: "flex", gap: "16px" }}>
        <AtlasIcon />
        <HeartIcon />
      </div>
    </IconContext.Provider>
  );
}

export default App;
`}))();export{t as default};