import CellHeader from "src/core/CellHeader";
import RawTableHeader from "src/core/TableHeader";

export const TestDemo = (): JSX.Element => (
  <table>
    <RawTableHeader data-testid="TableHeader">
      <CellHeader active>Column 1</CellHeader>
      <CellHeader>Column 2</CellHeader>
      <CellHeader>Column 3</CellHeader>
    </RawTableHeader>
  </table>
);
