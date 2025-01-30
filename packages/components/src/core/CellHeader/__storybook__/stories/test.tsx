import { Args } from "@storybook/types";
import RawCellHeader from "src/core/CellHeader";

export const TestDemo = (props: Args): JSX.Element => (
  <table>
    <tbody>
      <tr>
        <RawCellHeader
          data-testid="CellHeader"
          horizontalAlign="right"
          shouldShowTooltipOnHover
          active
          tooltipText="testTooltipTitle"
          {...props}
        >
          Header
        </RawCellHeader>
      </tr>
    </tbody>
  </table>
);
