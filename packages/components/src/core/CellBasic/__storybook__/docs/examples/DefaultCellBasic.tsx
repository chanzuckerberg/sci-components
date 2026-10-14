import { CellBasic } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
