import { ButtonIcon, TooltipCondensed } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <TooltipCondensed
        indicator
        indicatorColor="DodgerBlue"
        title="Tooltip title"
      >
        <ButtonIcon sdsType="secondary" sdsSize="large" icon="InfoCircle" />
      </TooltipCondensed>
    </div>
  );
}

export default App;
