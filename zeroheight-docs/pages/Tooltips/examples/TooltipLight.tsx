import { ButtonIcon, Tooltip } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Tooltip
        arrow
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi."
      >
        <ButtonIcon sdsType="secondary" sdsSize="large" icon="InfoCircle" />
      </Tooltip>
    </div>
  );
}

export default App;
