import { NavigationJumpTo } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <NavigationJumpTo
        items={[
          { elementRef: { current: null }, title: "Item 1" },
          { elementRef: { current: null }, title: "Item 2" },
          { elementRef: { current: null }, title: "Item 3" },
          { elementRef: { current: null }, title: "Item 4" },
          { elementRef: { current: null }, title: "Item 5" },
        ]}
      />
    </div>
  );
}

export default App;
