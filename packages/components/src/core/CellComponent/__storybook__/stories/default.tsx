import { Args } from "@storybook/react-vite";
import RawCellComponent from "@components/src/core/CellComponent";

export const CellComponent = (props: Args): JSX.Element => {
  const { horizontalAlign, verticalAlign, children } = props;

  return (
    <table>
      <tbody>
        <tr>
          <RawCellComponent
            horizontalAlign={horizontalAlign}
            verticalAlign={verticalAlign}
            data-testid="CellComponent"
            {...props}
          >
            {children}
          </RawCellComponent>
        </tr>
      </tbody>
    </table>
  );
};
