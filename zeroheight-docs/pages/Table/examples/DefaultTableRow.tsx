import { TableRow, CellBasic } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <table>
        <tbody>
          <TableRow>
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
            <CellBasic
              primaryText="Primary Text"
              secondaryText="Secondary Text"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>
        </tbody>
      </table>
    </div>
  );
}

export default App;
