import { useContext } from "react";
import { AppContext } from "./AppContext";

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (appContext === undefined) {
    throw new Error("useAppContext must be inside a AppProvider");
  }
  return appContext;
};
