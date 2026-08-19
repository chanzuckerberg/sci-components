import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// MUI's RadioGroup owns the selection: each InputRadio is checked when its
// \`value\` matches the group's. \`row\` lays the options out horizontally.
import { useState } from "react";
import { InputRadio } from "@czi-sds/components";
import { RadioGroup } from "@mui/material";

const OPTIONS = ["Option 1", "Option 2", "Option 3"];

function App() {
  const [value, setValue] = useState(OPTIONS[0]);

  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <RadioGroup
        name="vertical-options"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {OPTIONS.map((option) => (
          <InputRadio key={option} label={option} value={option} />
        ))}
      </RadioGroup>

      {/* SDS removes the side margin MUI puts on labels, so a row needs its
          own gap. */}
      <RadioGroup
        row
        name="row-options"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        sx={{ gap: "24px" }}
      >
        {OPTIONS.map((option) => (
          <InputRadio key={option} label={option} value={option} />
        ))}
      </RadioGroup>
    </div>
  );
}

export default App;
`}))();export{t as default};