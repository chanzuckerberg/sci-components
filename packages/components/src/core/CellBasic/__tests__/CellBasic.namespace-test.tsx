import { CellBasic, CellBasicProps } from "@czi-sds/components";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import React from "react";

const CellBasicNameSpaceTest = (props: CellBasicProps) => {
  return (
    <table>
      <tbody>
        <tr>
          <CellBasic
            horizontalAlign="left"
            verticalAlign="center"
            icon={<DownloadSimpleIcon weight="bold" size={24} />}
            iconVerticalAlign="center"
            primaryText="Primary Text"
            primaryTextWrapLineCount={2}
            secondaryText="Secondary Text"
            secondaryTextWrapLineCount={1}
            tertiaryText="Tertiary Text"
            tertiaryTextWrapLineCount={1}
            shouldShowTooltipOnHover
            tooltipProps={{ sdsStyle: "light" }}
            shouldTextWrap
          />
        </tr>
      </tbody>
    </table>
  );
};
