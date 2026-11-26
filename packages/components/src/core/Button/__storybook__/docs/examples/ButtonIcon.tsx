import { Button } from "@czi-sds/components";
import { CaretRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <Button
        sdsType="secondary"
        startIcon={<DownloadSimpleIcon weight="bold" />}
      >
        Download
      </Button>
      <Button sdsType="secondary" endIcon={<CaretRightIcon weight="bold" />}>
        Next
      </Button>
    </div>
  );
}

export default App;
