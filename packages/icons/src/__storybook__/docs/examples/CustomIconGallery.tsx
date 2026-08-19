// Every icon @czi-sds/icons ships, with the name to import it by.

import * as sdsIcons from "@czi-sds/icons";
import type { Icon } from "@czi-sds/icons";

// Every icon is exported as `Sds<Name>Icon`, which is what separates them from
// the `createSdsIcon` factory the package also exports.
const icons = Object.entries(sdsIcons).filter(
  (entry): entry is [string, Icon] =>
    entry[0].startsWith("Sds") && entry[0].endsWith("Icon")
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
