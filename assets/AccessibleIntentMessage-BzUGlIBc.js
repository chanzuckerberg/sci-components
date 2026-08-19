import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The messages are plain text with no programmatic link to the input. To have
// them announced, render IntentMessage next to the input and point the input's
// aria-describedby at it. IntentMessageProps takes no id, so the id goes on a
// wrapper element, and the ARIA attributes go through slotProps.htmlInput so
// they land on the input rather than on the field wrapper.

import { InputText, IntentMessage } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "400px",
      }}
    >
      <InputText
        id="accessible-intent-input"
        label="Sample ID"
        placeholder="SAMP-0001"
        intent="negative"
        slotProps={{
          htmlInput: {
            "aria-describedby": "sample-id-messages",
            "aria-invalid": true,
          },
        }}
      />
      <div id="sample-id-messages">
        <IntentMessage
          messages={[{ intent: "negative", text: "Use the format SAMP-0000." }]}
        />
      </div>
    </div>
  );
}

export default App;
`}))();export{t as default};