// The minimal variant is body-sized text in secondary grey, for a region of a
// page that is still filling in. sdsStyle is required; there is no default.

import { LoadingIndicator } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <LoadingIndicator sdsStyle="minimal" />
    </div>
  );
}

export default App;
