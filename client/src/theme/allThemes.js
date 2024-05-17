import {createTheme} from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#EAEDED',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00A656',
            dark: '#171717',
            contrastText: '#EAEDED',
            light: '#EAEDED',
        },
    },
});