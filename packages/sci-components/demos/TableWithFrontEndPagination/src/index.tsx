import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "czifui";
import React from "react";
import ReactDOM from "react-dom";
import App from "./main";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <EmotionThemeProvider theme={defaultTheme}>
          <App />
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  rootElement
);
