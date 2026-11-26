import { Button } from "@czi-sds/components";
import { CopyIcon, DownloadSimpleIcon, TrashIcon } from "@phosphor-icons/react";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <Button aria-label="Download">
        <DownloadSimpleIcon weight="bold" />
      </Button>
      <Button sdsStyle="outline" sdsType="secondary" aria-label="Copy">
        <CopyIcon weight="bold" />
      </Button>
      <Button sdsStyle="minimal" sdsType="secondary" aria-label="Delete">
        <TrashIcon weight="bold" />
      </Button>
    </div>
  );
}

export default App;
