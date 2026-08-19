import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The InputDropdown is as wide as its own content until \`width\` says otherwise.
// A bare number is read as pixels; anything else is used as the CSS width, so a
// percentage sizes the input against whatever contains it. The dashed box below
// is the container the percentages are measured against.

import { InputDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <div
        style={{
          // Without this the column would stretch every input to its full width,
          // which is the one thing this example is trying to show a difference in.
          alignItems: "flex-start",
          border: "1px dashed #a9a9a9",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px",
          width: "400px",
        }}
      >
        <InputDropdown label="Auto" onClick={() => {}} />
        <InputDropdown label="240px" onClick={() => {}} width="240" />
        <InputDropdown label="50%" onClick={() => {}} width="50%" />
        <InputDropdown label="100%" onClick={() => {}} width="100%" />
      </div>
    </div>
  );
}

export default App;
`}))();export{t as default};