import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// disabled comes from MUI and greys a tab out. The tab stays in the strip, so it
// still says that the section exists, but it cannot be clicked and the arrow keys
// skip past it.
//
// A tab is worth disabling when its content is not ready yet rather than not
// available at all. Otherwise leave it out of the group.

import { Tab, Tabs } from "@czi-sds/components";
import { SyntheticEvent, useState } from "react";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  return (
    <div className="app">
      <Tabs aria-label="Analysis steps" onChange={handleChange} value={value}>
        <Tab count={12} label="Samples" />
        <Tab disabled label="Alignment" />
        <Tab count={3} label="Variant calls" />
      </Tabs>
    </div>
  );
}

export default App;
`}))();export{t as default};