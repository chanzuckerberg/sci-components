import { CellBasic, CellBasicProps, Icon } from "@czi-sds/components";
import React from "react";

const CellBasicNameSpaceTest = (props: CellBasicProps) => {
  return (
    <table>
      <tbody>
        <tr>
          <CellBasic
            horizontalAlign="left"
            verticalAlign="center"
            icon={<Icon sdsIcon="Download" sdsSize="l" />}
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
