import { TableRow, CellHeader } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <table>
        <thead>
          <tr>
            <CellHeader>Header</CellHeader>
            <CellHeader>Header</CellHeader>
            <CellHeader>Header</CellHeader>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default App;
