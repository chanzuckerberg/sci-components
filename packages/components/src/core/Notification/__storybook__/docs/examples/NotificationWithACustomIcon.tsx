// Replacing the intent's default icon with any Phosphor or @czi-sds/icons icon

import { BookIcon } from "@phosphor-icons/react";
import { Notification } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Notification
        intent="accent"
        slideDirection="left"
        icon={<BookIcon weight="bold" />}
      >
        Pass an icon element to swap the icon the intent would otherwise pick.
      </Notification>
    </div>
  );
}

export default App;
