import { Icon, Tag } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Tag
        label="Virus"
        icon={<Icon sdsSize="l" sdsIcon="Virus" />}
        sdsStyle="rounded"
        color="negative"
        sdsSize="l"
      />
    </div>
  );
}

export default App;
