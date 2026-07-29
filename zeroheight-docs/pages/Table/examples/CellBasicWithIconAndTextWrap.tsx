import { CellBasic, Icon } from "@czi-sds/components";

function App() {
  const TableCellStyle = {
    border: "dashed 1px #eee",
    maxWidth: 160,
    width: 160,
  };

  return (
    <div className="app">
      <table>
        <tbody>
          <tr>
            <CellBasic
              primaryText="Primary Text that is longer than expected."
              secondaryText="Secondary Text that is londer than expected."
              tertiaryText="Tertiary Text that is lonegrt than expected."
              icon={<Icon sdsIcon="Bacteria" sdsSize="l" color="yellow" />}
              style={TableCellStyle}
              tooltipProps={{
                placement: "right",
                sdsStyle: "light",
              }}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
