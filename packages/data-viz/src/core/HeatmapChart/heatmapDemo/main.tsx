import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>
);
