import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n";
import store from "./store";
//Theme
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/allThemes";
import GlobalStyle from "./theme/globalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as ReactDOM.Container
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
