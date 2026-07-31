// Most minimal Notification (just has the basic requirements)

import { Notification } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Notification intent="info" slideDirection="left">
        The Notification component has been rendered successfully!
      </Notification>
    </div>
  );
}

export default App;
