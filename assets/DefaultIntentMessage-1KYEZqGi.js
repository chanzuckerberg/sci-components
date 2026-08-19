import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// IntentMessage wraps the input it describes: children render first, then the
// messages. Set the input's own intent to match the message.

import { InputText, IntentMessage } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ width: "400px" }}>
      <IntentMessage
        border
        messages={[
          { intent: "negative", text: "Enter a valid email address." },
        ]}
      >
        <InputText
          id="default-intent-input"
          label="Email"
          placeholder="name@example.org"
          intent="negative"
        />
      </IntentMessage>
    </div>
  );
}

export default App;
`}))();export{t as default};