import { createContext } from "react";

type RowHeight = number | string;

export const TableContext = createContext({ rowHeight: "auto" as RowHeight });
