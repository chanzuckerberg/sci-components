// Notification whose children carry more than a single line of text

import { Notification } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Notification intent="positive" slideDirection="left">
        Your export is ready
        <div>
          The file will stay available for 24 hours. Anyone with access to the
          project can download it from the downloads page.
        </div>
      </Notification>
    </div>
  );
}

export default App;
