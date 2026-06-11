import CellBasic from "@components/src/core/CellBasic";
import RawTableRow from "@components/src/core/TableRow";

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
