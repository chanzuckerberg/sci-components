import { ButtonIcon, Tooltip } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Tooltip
        arrow
        sdsStyle="dark"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi."
        title="Tooltip title"
      >
        <ButtonIcon sdsType="secondary" sdsSize="large" icon="InfoCircle" />
      </Tooltip>
    </div>
  );
}

export default App;
