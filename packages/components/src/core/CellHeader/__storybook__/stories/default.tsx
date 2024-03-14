import { Args } from "@storybook/react";
import { useEffect, useState } from "react";
import RawCellHeader, { CellHeaderDirection } from "src/core/CellHeader";

export const CellHeader = (props: Args): JSX.Element => {
  const { direction, ...rest } = props;
  const [sorting, setSorting] = useState<CellHeaderDirection>(direction);

  useEffect(() => {
    setSorting(direction);
  }, [direction]);

  const clickHandler = () => {
    setSorting((prevState) => {
      return prevState === "asc" ? "desc" : "asc";
    });
  };

  return (
    <table>
      <tbody>
        <tr>
          <RawCellHeader onClick={clickHandler} direction={sorting} {...rest}>
            Header
          </RawCellHeader>
        </tr>
      </tbody>
    </table>
  );
};
