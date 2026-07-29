// aria-label changes only what a screen reader announces. The visible word
// stays "Loading" either way, so use the label to name what is loading.

import { LoadingIndicator } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <LoadingIndicator sdsStyle="minimal" />
      <LoadingIndicator sdsStyle="minimal" aria-label="Loading cell types" />
    </div>
  );
}

export default App;
