import { Args } from "@storybook/react";
import CellBasic from "src/core/CellBasic";
import RawTableRow from "src/core/TableRow";

export const TableRow = (props: Args): JSX.Element => {
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <RawTableRow {...props}>
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
          <CellBasic primaryText="Primary" shouldShowTooltipOnHover={false} />
        </RawTableRow>
      </tbody>
    </table>
  );
};
