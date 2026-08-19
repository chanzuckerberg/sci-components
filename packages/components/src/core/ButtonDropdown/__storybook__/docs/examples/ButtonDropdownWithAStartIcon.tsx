import { ButtonDropdown, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ButtonDropdown
        sdsType="secondary"
        startIcon={<Icon sdsIcon="Bacteria" sdsSize="s" />}
      >
        Bacteria Types
      </ButtonDropdown>
    </div>
  );
}

export default App;
