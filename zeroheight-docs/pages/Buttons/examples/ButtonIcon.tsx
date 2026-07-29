import { Button, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Button
        sdsType="secondary"
        sdsStyle="square"
        startIcon={<Icon sdsIcon="Download" sdsSize="s" />}
      >
        Download
      </Button>
    </div>
  );
}

export default App;
