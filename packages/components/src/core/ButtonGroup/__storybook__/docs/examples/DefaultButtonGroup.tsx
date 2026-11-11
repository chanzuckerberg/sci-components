import { Button, ButtonGroup } from "@czi-sds/components";
import { CopyIcon, DownloadSimpleIcon } from "@phosphor-icons/react";

function App() {
  return (
    <div className="app">
      <ButtonGroup>
        <Button aria-label="Download">
          <DownloadSimpleIcon weight="bold" />
        </Button>
        <Button startIcon={<CopyIcon weight="bold" />}>Copy</Button>
        <Button>Label</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
