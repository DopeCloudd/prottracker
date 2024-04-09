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
        green: {
            main: '#00A656',
            contrastText: '#000',
        },
    },
});