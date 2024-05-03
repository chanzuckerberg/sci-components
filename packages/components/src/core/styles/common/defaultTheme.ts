import { createTheme } from "@mui/material/styles";
import { SDSThemeOptions } from "./types";
import { SDSAppTheme } from "./SDSAppTheme";
import { makeThemeOptions } from "./makeThemeOptions";

const defaultThemeOptions: SDSThemeOptions = makeThemeOptions(SDSAppTheme);

export const defaultTheme = createTheme(defaultThemeOptions);
