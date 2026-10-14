// icon takes either an SDS icon name or an element. A name is always rendered at
// xs, so it has to be an icon that offers that size. Either way the fill is
// forced to the intent color.

import { Icon, IntentMessage, IntentMessageItem } from "@czi-sds/components";

const MESSAGES: IntentMessageItem[] = [
  { icon: "Github", intent: "notice", text: "Named SDS icon, rendered at xs" },
  {
    icon: <Icon sdsIcon="Sparkle" sdsSize="s" />,
    intent: "positive",
    text: "An Icon element, so you choose the size",
  },
  {
    icon: <Icon sdsIcon="Lock" sdsSize="xs" />,
    intent: "negative",
    text: "The icon color follows the intent, not the Icon color prop",
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
