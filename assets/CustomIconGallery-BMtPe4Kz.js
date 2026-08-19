import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Every icon @czi-sds/icons ships, with the name to import it by.

import * as sdsIcons from "@czi-sds/icons";
import type { Icon } from "@czi-sds/icons";

// Everything the package exports at runtime is an icon apart from the
// \`createSdsIcon\` factory, the types beside them being erased.
const icons = Object.entries(sdsIcons).filter(
  (entry): entry is [string, Icon] => entry[0] !== "createSdsIcon"
);

function App() {
  return (
    <div
      className="app"
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      }}
    >
      {icons.map(([name, IconComponent]) => (
        <div
          key={name}
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            textAlign: "center",
          }}
        >
          <IconComponent size={32} />
          <code style={{ fontSize: "11px", wordBreak: "break-all" }}>
            {name}
          </code>
        </div>
      ))}
    </div>
  );
}

export default App;
`}))();export{t as default};