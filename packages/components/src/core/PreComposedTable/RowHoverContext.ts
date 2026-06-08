import { createContext } from "react";

export const RowHoverContext = createContext<{ isRowHovered: boolean }>({
  isRowHovered: false,
});
