import { TableRow, TableRowProps } from "czifui";
import React from "react";

const TableRowNameSpaceTest = (props: TableRowProps) => {
  return (
    <table>
      <tbody>
        <TableRow
          disabled={false}
          hover
          selected
          shouldShowTooltipOnHover
          tooltipProps={{ sdsStyle: "dark" }}
          tooltipText="Tooltip Text"
          tooltipSubtitle="Tooltip Subtitle"
          useDivider
        >
          <td>data</td>
        </TableRow>
      </tbody>
    </table>
  );
};
