import { Args } from "@storybook/types";
import CellHeader from "src/core/CellHeader";
import RawTableHeader from "src/core/TableHeader";

export const TableHeader = (props: Args): JSX.Element => {
  return (
    <table>
      <RawTableHeader {...props}>
        <CellHeader active hover>
          Column 1
        </CellHeader>
        <CellHeader hover>Column 2</CellHeader>
        <CellHeader hover>Column 3</CellHeader>
      </RawTableHeader>
    </table>
  );
};
