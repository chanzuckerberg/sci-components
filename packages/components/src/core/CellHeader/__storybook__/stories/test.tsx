import RawCellHeader from "src/core/CellHeader";

export const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <tr>
        <RawCellHeader
          data-testid="CellHeader"
          horizontalAlign="right"
          shouldShowTooltipOnHover
          active
          tooltipText="testTooltipTitle"
        >
          Header
        </RawCellHeader>
      </tr>
    </tbody>
  </table>
);
