# Components

2021 Create-a-thon Science Initiative Component Library

[Teams](https://docs.google.com/spreadsheets/d/1gxkz60L2e_oXHVyRS6G48ZwPPnuiYv92yh7pMZaD6BM/edit?ts=60467aab#gid=0)

## Get Started

### Peer dependencies

In order to avoid installing multiple versions of the same library in the host project, which could cause bugs, the component library does not have its own dependencies.

Therefore, please kindly ensure your project includes the following dependencies in your `package.json`:

```json
  "@emotion/react"
  "@emotion/styled"
  "@material-ui/core"
  "react"
  "react-dom"
```

## Default Theme

### Instructions

To use the default theme, please do the following:

1. Add the following HTML to your `index.html` at the `<head>` section:

   ```html
   <link rel="preconnect" href="https://fonts.gstatic.com" />
   <link
     href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"
     rel="stylesheet"
   />
   ```

1. Import the default theme object and use it in Material UI's `<ThemeProvider />`:

   ```tsx
     import { defaultTheme } from '@chanzuckerberg/czifui/core/styles`
     import { ThemeProvider } from "@material-ui/core/styles";

     <ThemeProvider theme={defaultTheme}>
       <YourApp />
     </ThemeProvider>
   ```

1. Optional: If you want to override the default theme, please use `defaultThemeOptions`, override the options, and then call `createMuiTheme` to generate
   the full theme object like below. This is needed because `createMuiTheme` generates
   extra theme variables based on the themeOptions provided, so if you override `defaultTheme` directly, some auxillary theme variables will be based on `defaultThemeOptions` instead of your own custom options

```tsx
  import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
  import { defaultAppTheme, makeThemeOptions } from '@chanzuckerberg/czifui/core/styles`
  import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
  import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

  const customTheme = {
    ...
  }

  const appTheme = makeThemeOptions({ ...defaultThemeOptions, ...customTheme })

  const theme = createMuiTheme(appTheme)

    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={defaultTheme}>
          <YourApp />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StylesProvider>
```
