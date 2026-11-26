import { VirusIcon } from "@phosphor-icons/react";
import { ButtonDropdown } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ButtonDropdown
        sdsType="secondary"
        startIcon={<VirusIcon weight="bold" />}
      >
        Bacteria Types
      </ButtonDropdown>
    </div>
  );
}

export default App;
