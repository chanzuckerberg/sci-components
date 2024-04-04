import CellBasic from "src/core/CellBasic";
import RawTable from "src/core/Table";
import TableRow from "src/core/TableRow";

export const TestDemo = (): JSX.Element => (
  <RawTable data-testid="Table">
    <tbody>
      <TableRow>
        <CellBasic primaryText="Primary 1" shouldShowTooltipOnHover={false} />
        <CellBasic primaryText="Primary 2" shouldShowTooltipOnHover={false} />
        <CellBasic primaryText="Primary 3" shouldShowTooltipOnHover={false} />
        <CellBasic primaryText="Primary 4" shouldShowTooltipOnHover={false} />
      </TableRow>
    </tbody>
  </RawTable>
);
