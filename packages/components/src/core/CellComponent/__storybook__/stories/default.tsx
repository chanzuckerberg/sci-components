import { Args } from "@storybook/react";
import RawCellComponent from "src/core/CellComponent";
import TableRow from "src/core/TableRow";

export const CellComponent = (props: Args): JSX.Element => {
  const { horizontalAlign, verticalAlign, children } = props;

  return (
    <table>
      <tbody>
        <TableRow
          style={{
            display: "block",
            maxWidth: "280px",
          }}
        >
          <RawCellComponent
            horizontalAlign={horizontalAlign}
            verticalAlign={verticalAlign}
            data-testid="CellComponent"
            {...props}
          >
            {children}
          </RawCellComponent>
        </TableRow>
      </tbody>
    </table>
  );
};
