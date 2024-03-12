import { Args } from "@storybook/react";
import RawCellBasic from "src/core/CellBasic";

export const CellBasic = (props: Args): JSX.Element => {
  return (
    <table>
      <tbody>
        <tr
          style={{
            display: "block",
            maxWidth: "400px",
          }}
        >
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
