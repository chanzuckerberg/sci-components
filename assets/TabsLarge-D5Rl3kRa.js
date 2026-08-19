import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Tabs is a controlled component: it draws the tab whose value matches the value
// prop, so the selection has to live in your state and onChange has to write it
// back. Without that, clicking a tab changes nothing.
//
// The large size is the default and belongs at the top level of a screen. The
// component brings its own spacing, 16px above and 24px below, so the group does
// not need margins of its own.

import { Tab, Tabs } from "@czi-sds/components";
import { SyntheticEvent, useState } from "react";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  return (
    <div className="app">
      <Tabs aria-label="Sample views" onChange={handleChange} value={value}>
        <Tab label="Overview" />
        <Tab label="Samples" />
        <Tab label="Sequencing runs" />
      </Tabs>
    </div>
  );
}

export default App;
`}))();export{t as default};