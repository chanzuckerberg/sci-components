import { useState, SyntheticEvent } from "react";
import { Tabs, Tab, Tag } from "@czi-sds/components";
import { styled } from "@mui/material";

function App() {
  const [value, setValue] = useState(0);

  const handleTabsChange = (_: SyntheticEvent, tabsValue: unknown) => {
    setValue(tabsValue as number);
  };

  const CountWrapper = styled("span")`
    margin-right: 5px;
  `;

  function BetaTagWithCount() {
    return (
      <>
        <CountWrapper>14</CountWrapper>
        <Tag label="BETA" color="beta" sdsStyle="rounded" sdsType="secondary" />
      </>
    );
  }

  return (
    <div className="app">
      <Tabs
        value={value}
        sdsSize="large"
        onChange={handleTabsChange}
        underlined
      >
        <Tab label="First Tab" count="4" />
        <Tab label="Second Tab" count="20" />
        <Tab label="Third Tab" count={<BetaTagWithCount />} />
      </Tabs>
    </div>
  );
}

export default App;
