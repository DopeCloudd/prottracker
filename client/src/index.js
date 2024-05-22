import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import App from './App';
import './i18n';
//Theme
import {CssBaseline, ThemeProvider} from "@mui/material";
import GlobalStyle from "./theme/globalStyle";
import {darkTheme} from "./theme/allThemes";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <GlobalStyle/>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);