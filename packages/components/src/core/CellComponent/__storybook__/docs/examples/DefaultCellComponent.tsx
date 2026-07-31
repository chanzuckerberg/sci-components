import { CellComponent, InputToggle } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <CellComponent>
              <InputToggle />
            </CellComponent>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
