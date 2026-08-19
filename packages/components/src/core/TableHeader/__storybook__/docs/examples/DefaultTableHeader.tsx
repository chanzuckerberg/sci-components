// TableHeader renders the thead and the header row itself, so its children are
// header cells rather than a tr.

import { CellHeader, Table, TableHeader } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Table>
        <TableHeader>
          <CellHeader>Header</CellHeader>
          <CellHeader>Header</CellHeader>
          <CellHeader>Header</CellHeader>
        </TableHeader>
      </Table>
    </div>
  );
}

export default App;
