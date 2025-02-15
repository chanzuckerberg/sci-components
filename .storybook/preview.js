import CssBaseline from "@mui/material/CssBaseline";
import {
  makeThemeOptions,
  Theme,
} from "../packages/components/src/core/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BADGE } from "../packages/components/src/common/storybook/storybookBadges";
import { makeSdsSemanticAppTheme } from "@czi-sds/components";

export const decorators = [
  (Story, context) => {
    const { theme: storybookTheme } = context.globals;

    // Temporary

    const LightColors = {
      blue: {
        100: "#f23",
        200: "#f23",
        300: "#f23",
        400: "#f23",
        500: "#f23",
        600: "#f23",
        700: "#f23",
        800: "#f23",
      },
      gray: {
        100: "#f3f3f3",
        200: "#dfdfdf",
        300: "#c3c3c3",
        400: "#a5a5a5",
        50: "#ffffff",
        500: "#969696",
        600: "#6c6c6c",
        700: "#3b3b3b",
        75: "#fafafa",
        800: "#1b1b1b",
        900: "#000000",
      },
      green: {
        100: "#daf4de",
        200: "#b9ecc3",
        300: "#7fd693",
        400: "#50b96d",
        500: "#238444",
        600: "#105b2b",
        700: "#07431d",
        800: "#001f00",
      },
      purple: {
        100: "#efeafe",
        200: "#e4dbfc",
        300: "#cbbaF8",
        400: "#b296f2",
        500: "#8b54e2",
        600: "#6526b5",
        700: "#490092",
        800: "#26004c",
      },
      red: {
        100: "#ffe8e6",
        200: "#ffd6d2",
        300: "#ffafa8",
        400: "#ff7e78",
        500: "#db2131",
        600: "#980017",
        700: "#6f0008",
        800: "#340000",
      },
      yellow: {
        100: "#fff3db",
        200: "#ffdb97",
        300: "#ffca5c",
        400: "#fab700",
        500: "#da9900",
        600: "#b07300",
        700: "#7c3e00",
        800: "#541700",
      },
    };

    const DarkColors = {
      blue: {
        100: "#f85",
        200: "#f85",
        300: "#f85",
        400: "#f85",
        500: "#f85",
        600: "#f85",
        700: "#f85",
        800: "#f85",
      },
      gray: {
        100: "#333333",
        200: "#494949",
        300: "#696969",
        400: "#9b9b9b",
        50: "#000000",
        500: "#aaaaaa",
        600: "#cdcdcd",
        700: "#ededed",
        75: "#101010",
        800: "#fafafa",
        900: "#ffffff",
      },
      green: {
        100: "#082608",
        200: "#063617",
        300: "#10632e",
        400: "#278b48",
        500: "#4bae68",
        600: "#85d898",
        700: "#bcecc5",
        800: "#daf4de",
      },
      purple: {
        100: "#331252",
        200: "#410f70",
        300: "#6429b2",
        400: "#905de6",
        500: "#aa89ef",
        600: "#cebef8",
        700: "#e4dcfc",
        800: "#f0ebfe",
      },
      red: {
        100: "#330603",
        200: "#660a12",
        300: "#9e1c1c",
        400: "#c73028",
        500: "#e05043",
        600: "#ff988a",
        700: "#ffbdb3",
        800: "#ffd8d1",
      },
      yellow: {
        100: "#361b07",
        200: "#52270a",
        300: "#965a0b",
        400: "#bd8804",
        500: "#d9a943",
        600: "#e5bc63",
        700: "#f5d789",
        800: "#ffe6a8",
      },
    };

    const semanticAppTheme = makeSdsSemanticAppTheme(
      storybookTheme === "light" ? LightColors : DarkColors
    );
    const themeOptions = makeThemeOptions(semanticAppTheme, storybookTheme);
    const theme = createTheme(themeOptions, {
      cssVariables: true,
    });

    // Temporary

    return (
      <ThemeProvider theme={Theme(storybookTheme)}>
        {/* <ThemeProvider theme={theme}> */}
        {/* CssBaseline provides light/dark background MUI theme for all stories */}
        <CssBaseline />
        <Story />
      </ThemeProvider>
    );
  },
];

/**
 * (thuang): This is a temporary fix for the Storybook addon to work with
 * `storybook-addon-pseudo-states` plugin
 * https://github.com/chromaui/storybook-addon-pseudo-states/issues/59#issuecomment-1498182067
 */
const preview = {
  globalTypes: {
    pseudo: {},
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        dynamicTitle: true,
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
      },
    },
  },

  parameters: {
    // Removes the change background button since it's controlled by the theme toggle
    backgrounds: { disable: true },
    badgesConfig: {
      [BADGE.BETA]: {
        styles: {
          backgroundColor: "#F4F0F9",
          borderColor: "#7A41CE",
          borderRadius: 2,
          color: "#703CBE",
        },
        title: "Beta",
      },
      [BADGE.DEPRECATED]: {
        styles: {
          backgroundColor: "#FEF2F2",
          borderColor: "#DC132C",
          borderRadius: 2,
          color: "#C61128",
        },
        title: "Deprecated",
      },
      [BADGE.NEEDS_REVISION]: {
        styles: {
          backgroundColor: "#F8F8F8",
          borderColor: "#999999",
          borderRadius: 2,
          color: "#767676",
        },
        title: "Needs Revision",
      },
      [BADGE.STABLE]: {
        styles: {
          backgroundColor: "#ECF5F0",
          borderColor: "#3CB371",
          borderRadius: 2,
          color: "#349A61",
        },
        title: "Stable",
      },
      [BADGE.WIP]: {
        styles: {
          backgroundColor: "#FCF6EC",
          borderColor: "#F5A623",
          borderRadius: 2,
          color: "#D8921F",
        },
        title: "Work in progress",
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Bases", "Components", "Data Viz", "Deprecated"],
      },
    },
  },

  tags: ["!autodocs"],
};
export default preview;
