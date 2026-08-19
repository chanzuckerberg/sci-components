import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The small size drops the label text from 14px to 13px and tightens the spacing
// around the group to 12px. It is meant for a second layer of tabbing underneath a
// large group, not on its own. See the two levels example further down.
//
// sdsSize reaches every Tab through context, so it is set once on the group. A
// Tab cannot ask for a different size than the group it sits in.

import { Tab, Tabs } from "@czi-sds/components";
import { SyntheticEvent, useState } from "react";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  return (
    <div className="app">
      <Tabs
        aria-label="Sample details"
        onChange={handleChange}
        sdsSize="small"
        value={value}
      >
        <Tab label="Metadata" />
        <Tab label="Quality control" />
        <Tab label="Files" />
      </Tabs>
    </div>
  );
}

export default App;
`}))();export{t as default};