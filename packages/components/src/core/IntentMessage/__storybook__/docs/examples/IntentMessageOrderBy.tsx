// orderBy replaces the default severity ranking. It also decides which intent
// colors the border, since that is the first intent in the ranking that is
// present, so it applies even when autoOrder is off.

import { IntentMessage, IntentMessageItem } from "@czi-sds/components";

const MESSAGES: IntentMessageItem[] = [
  { intent: "negative", text: "Two samples failed to upload" },
  { intent: "notice", text: "Three samples are still processing" },
  { intent: "positive", text: "Twelve samples uploaded" },
];

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      <IntentMessage border messages={MESSAGES} />
      <IntentMessage
        border
        orderBy={["positive", "notice", "negative"]}
        messages={MESSAGES}
      />
    </div>
  );
}

export default App;
