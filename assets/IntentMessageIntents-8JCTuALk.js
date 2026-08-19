import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The three intents each come with a default icon: CheckCircle for positive,
// ExclamationMarkCircle for negative and notice. The text and the icon take the
// intent's foreground color, and the border takes its border color.

import { IntentMessage } from "@czi-sds/components";

const INTENTS = [
  { intent: "negative", text: "This is a negative message" },
  { intent: "notice", text: "This is a notice message" },
  { intent: "positive", text: "This is a positive message" },
] as const;

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      {INTENTS.map(({ intent, text }) => (
        <IntentMessage key={intent} border messages={[{ intent, text }]} />
      ))}
    </div>
  );
}

export default App;
`}))();export{t as default};