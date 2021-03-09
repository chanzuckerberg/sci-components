import { muiTheme } from "storybook-addon-material-ui";
import { defaultTheme } from "../src/core/styles";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [muiTheme([defaultTheme])];
