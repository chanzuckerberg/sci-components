import { Button, ButtonGroup, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <ButtonGroup>
        <Button aria-label="Download">
          <Icon sdsIcon="Download" sdsSize="s" />
        </Button>
        <Button startIcon={<Icon sdsIcon="Copy" sdsSize="s" />}>Copy</Button>
        <Button>Label</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
