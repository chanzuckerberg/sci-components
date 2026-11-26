import { CellComponent, CellComponentProps } from "@czi-sds/components";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import React from "react";

const CellBasicNameSpaceTest = (props: CellComponentProps) => {
  return (
    <table>
      <tbody>
        <tr>
          <CellComponent horizontalAlign="center" verticalAlign="center">
            <DownloadSimpleIcon weight="bold" size={24} />
          </CellComponent>
        </tr>
      </tbody>
    </table>
  );
};
