import { CellHeader, CellHeaderProps } from "czifui";
import React from "react";
import { noop } from "src/common/utils";

const CellBasicNameSpaceTest = (props: CellHeaderProps) => {
  return (
    <table>
      <tbody>
        <tr>
          <CellHeader
            onClick={noop}
            direction="asc"
            active
            hideSortIcon
            horizontalAlign="center"
            shouldShowTooltipOnHover
            tooltipProps={{ sdsStyle: "light" }}
            tooltipText="Tooltip"
          >
            Header
          </CellHeader>
        </tr>
      </tbody>
    </table>
  );
};
