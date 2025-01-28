import { CellHeader, CellHeaderProps } from "@czi-sds/components";
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
            hover
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
