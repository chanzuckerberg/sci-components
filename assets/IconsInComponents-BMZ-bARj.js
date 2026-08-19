import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Components that take an icon set the size themselves and color it from their
// own states, so pass a bare Icon without a color.

import { Button, Callout, Icon, Tag } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          sdsStyle="solid"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Download" sdsSize="s" />}
        >
          Download
        </Button>
        <Button
          sdsStyle="outline"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
        >
          Search
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <Tag
          label="Filtered"
          color="info"
          icon={<Icon sdsIcon="Filter" sdsSize="xs" />}
        />
      </div>

      <Callout
        intent="info"
        icon={<Icon sdsIcon="LightBulb" sdsSize="s" />}
        title="Swapping the icon"
        body="Callout picks an icon from its intent, and the icon prop replaces it."
      />
    </div>
  );
}

export default App;
`}))();export{t as default};