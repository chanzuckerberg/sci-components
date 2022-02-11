If you want to override the default theme, please use `defaultAppTheme`, override the options, and then call `createTheme` to generate
the full theme object like below. This is needed because `createTheme` generates
extra theme variables based on the themeOptions provided, so if you override `defaultTheme` directly, some auxillary theme variables will be based on `defaultAppTheme` instead of your own custom options

```tsx
  import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
  import { defaultAppTheme, makeThemeOptions } from "czifui";
  import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
  import createTheme from "@material-ui/core/styles/createTheme";

  const customTheme = {
    ...
  }

  const appTheme = makeThemeOptions({ ...defaultAppTheme, ...customTheme })

  const theme = createTheme(appTheme)

    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <YourApp />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StylesProvider>
```

💡 Aspen example available [here](https://github.com/chanzuckerberg/aspen/blob/trunk/src/frontend/pages/_app.tsx).

💡 Material UI docs for custom theming available [here](https://v4.mui.com/customization/theming/).
