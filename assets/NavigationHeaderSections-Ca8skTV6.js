import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Dropdown items grouped into sections: each item names its section, and the
// menu draws a heading per group with a divider between them. This style uses
// only the label and the section; icons and details need drawer style.

import {
  NavigationHeader,
  type NavigationHeaderPrimaryNavItem,
} from "@czi-sds/components";
import { useState } from "react";

const primaryNavItems: NavigationHeaderPrimaryNavItem<string>[] = [
  {
    itemType: "dropdown",
    items: [
      { label: "Browse datasets", section: "Data" },
      { label: "API reference", section: "Data" },
      { label: "CZ CELLxGENE", section: "Repositories" },
      { label: "CryoET", section: "Repositories" },
    ],
    key: "data",
    label: "Data",
  },
  {
    itemType: "text",
    key: "about",
    label: "About",
    onClick: () => console.log("About clicked"),
  },
];

function App() {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("data");

  return (
    <div className="app">
      <NavigationHeader
        activePrimaryNavKey={activePrimaryNavKey}
        setActivePrimaryNavKey={setActivePrimaryNavKey}
        isSticky={false}
        menuProps={{ disablePortal: true, disableScrollLock: true }}
        primaryNavItems={primaryNavItems}
        showSearch={false}
        title="Science Data"
      />
    </div>
  );
}

export default App;
`}))();export{t as default};