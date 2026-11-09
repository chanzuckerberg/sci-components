// icon takes an element, usually a Phosphor or @czi-sds/icons icon. The message
// draws it at 12px and forces its fill to the intent color, whatever size or
// color the icon was given.

import { GitHubIcon, SparkleIcon } from "@czi-sds/icons";
import { LockIcon } from "@phosphor-icons/react";
import { IntentMessage, IntentMessageItem } from "@czi-sds/components";

const MESSAGES: IntentMessageItem[] = [
  {
    icon: <GitHubIcon weight="bold" />,
    intent: "notice",
    text: "An icon from @czi-sds/icons",
  },
  {
    icon: <SparkleIcon weight="bold" size={24} />,
    intent: "positive",
    text: "Drawn at 12px whatever size it is given",
  },
  {
    icon: <LockIcon weight="bold" color="#000000" />,
    intent: "negative",
    text: "The icon color follows the intent, not the icon's color prop",
  },
];

function App() {
  return (
    <div className="app">
      <IntentMessage border messages={MESSAGES} />
    </div>
  );
}

export default App;
