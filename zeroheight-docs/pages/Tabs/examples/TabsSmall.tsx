import { useState, SyntheticEvent } from "react";
import { Tabs, Tab } from "@czi-sds/components";

function App() {
  const [value, setValue] = useState(0);

  const handleTabsChange = (_: SyntheticEvent, tabsValue: unknown) => {
    setValue(tabsValue as number);
  };

  return (
    <div className="app">
      <Tabs value={value} sdsSize="small" onChange={handleTabsChange}>
        <Tab label="First Tab" />
        <Tab label="Second Tab" />
      </Tabs>
    </div>
  );
}

export default App;
