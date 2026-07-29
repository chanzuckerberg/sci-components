import { ButtonIcon, Tooltip } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Tooltip arrow title="This Button is disabled!">
        <span>
          <ButtonIcon
            sdsType="secondary"
            sdsSize="large"
            icon="Widget"
            disabled
          />
        </span>
      </Tooltip>
    </div>
  );
}

export default App;
