import { TableHeader, TableHeaderProps } from "@czifui/sci-components";
import React from "react";

const TableHeaderNameSpaceTest = (props: TableHeaderProps) => {
  return (
    <table>
      <TableHeader>
        <th>Column 1</th>
      </TableHeader>
    </table>
  );
};
