import CellHeader from "src/core/CellHeader";
import RawTableHeader from "src/core/TableHeader";

export const TestDemo = (): JSX.Element => (
  <table>
    <RawTableHeader data-testid="TableHeader">
      <CellHeader active hover>
        Column 1
      </CellHeader>
      <CellHeader hover>Column 2</CellHeader>
      <CellHeader hover>Column 3</CellHeader>
    </RawTableHeader>
  </table>
);
