import { ButtonDropdown, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ButtonDropdown
        icon={<Icon sdsIcon="Bacteria" sdsSize="s" />}
        sdsType="primary"
        sdsStyle="square"
      >
        Bacteria Types
      </ButtonDropdown>
    </div>
  );
}

export default App;
