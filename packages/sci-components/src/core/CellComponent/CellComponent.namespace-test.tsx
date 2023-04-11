import {
  CellComponent,
  CellComponentProps,
  Icon,
} from "@czifui/sci-components";
import React from "react";

const CellBasicNameSpaceTest = (props: CellComponentProps) => {
  return (
    <table>
      <tbody>
        <tr>
          <CellComponent horizontalAlign="center" verticalAlign="center">
            <Icon sdsIcon="download" sdsSize="l" sdsType="button" />
          </CellComponent>
        </tr>
      </tbody>
    </table>
  );
};
