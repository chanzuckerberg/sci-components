import { Icon, Tag } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Tag
        label="Star"
        icon={<Icon sdsSize="l" sdsIcon="Star" />}
        color={["yellow", "#f23", "orange"]}
        sdsStyle="rounded"
        sdsSize="l"
      />
    </div>
  );
}

export default App;
