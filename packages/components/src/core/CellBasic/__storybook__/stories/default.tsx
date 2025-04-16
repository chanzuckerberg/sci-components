import { Args } from "@storybook/react";
import RawCellBasic from "src/core/CellBasic";

export const CellBasic = (props: Args): JSX.Element => {
  return (
    <table>
      <tbody>
        <tr>
          <RawCellBasic
            data-testid="CellBasic"
            primaryText="Primary Text"
            tooltipProps={{ sdsStyle: "light" }}
            {...props}
          />
        </tr>
      </tbody>
    </table>
  );
};
