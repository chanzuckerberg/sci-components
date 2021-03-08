# Components

2021 Create-a-thon Science Initiative Component Library

[Teams](https://docs.google.com/spreadsheets/d/1gxkz60L2e_oXHVyRS6G48ZwPPnuiYv92yh7pMZaD6BM/edit?ts=60467aab#gid=0)

## Default Theme

### Instructions

  To use the default theme, please do the following:

  1. Add the following HTML to your `index.html` at the `<head>` section:

    ```html
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400;1,600;1,700&display=swap" rel="stylesheet">
    ```

  1. Import the default theme object and use it in Material UI's `<ThemeProvider />`:

    ```tsx
      import { defaultTheme } from '@chanzuckerberg/sci-components/core/styles`
      import { ThemeProvider } from "@material-ui/core/styles";

      <ThemeProvider theme={defaultTheme}>
        <YourApp />
      </ThemeProvider>
    ```
