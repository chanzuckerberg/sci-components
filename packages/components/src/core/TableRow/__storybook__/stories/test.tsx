import CellBasic from "src/core/CellBasic";
import RawTableRow from "src/core/TableRow";

export const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <RawTableRow
        data-testid="TableRow"
        hover
        shouldShowTooltipOnHover
        tooltipText="testTooltipTitle"
      >
        <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
      </RawTableRow>
    </tbody>
  </table>
);
