import { Args } from "@storybook/react-vite";
import CellBasic from "@components/src/core/CellBasic";
import RawTableRow from "@components/src/core/TableRow";

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
