import { muiTheme } from "storybook-addon-material-ui";
import { defaultTheme } from "../src/core/styles";

export const decorators = [muiTheme([defaultTheme])];
