import { CellBasic, getColors } from "@czi-sds/components";
import { useTheme } from "@mui/material";
import { VirusIcon } from "@phosphor-icons/react";

function App() {
  const theme = useTheme();

  const TableCellStyle = {
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
              icon={
                <VirusIcon
                  weight="bold"
                  size={24}
                  color={getColors({ theme })?.yellow[500]}
                />
              }
              style={TableCellStyle}
              tooltipProps={{
                placement: "right",
              }}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
