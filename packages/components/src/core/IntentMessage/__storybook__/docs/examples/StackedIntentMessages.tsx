// Messages are sorted by severity by default, so the array order does not
// matter. Turn autoOrder off to keep the order you passed. The border takes the
// color of the most severe intent in the list either way.

import { IntentMessage, IntentMessageItem } from "@czi-sds/components";

const MESSAGES: IntentMessageItem[] = [
  { intent: "positive", text: "Password is at least 12 characters long" },
  { intent: "negative", text: "Password needs one number" },
  { intent: "notice", text: "Avoid reusing a password from another site" },
];

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      <IntentMessage border messages={MESSAGES} />
      <IntentMessage border autoOrder={false} messages={MESSAGES} />
    </div>
  );
}

export default App;
