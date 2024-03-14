import { CellComponent, CellComponentProps, Icon } from "@czi-sds/components";
import React from "react";

const CellBasicNameSpaceTest = (props: CellComponentProps) => {
  return (
    <table>
      <tbody>
        <tr>
          <CellComponent horizontalAlign="center" verticalAlign="center">
            <Icon sdsIcon="Download" sdsSize="l" sdsType="button" />
          </CellComponent>
        </tr>
      </tbody>
    </table>
  );
};
