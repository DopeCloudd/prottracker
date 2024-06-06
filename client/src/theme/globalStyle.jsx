import {createGlobalStyle} from 'styled-components';
// Fonts
import Modernist from "./fonts/Sk-Modernist-Regular.otf";
import Integral from "./fonts/Fontspring-DEMO-integralcf-regular.otf";
import IntegralOblique from "./fonts/Fontspring-DEMO-integralcf-regularoblique.otf";
import LemonMilk from "./fonts/LEMONMILK-Regular.otf";
import LemonMilkLight from "./fonts/LEMONMILK-Light.otf";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "Modernist";
        src: url(${Modernist}) format('truetype');
    }

    @font-face {
        font-family: "Integral";
        src: url(${Integral}) format('truetype');
    }

    @font-face {
        font-family: "Integral Oblique";
        src: url(${IntegralOblique}) format('truetype');
    }

    @font-face {
        font-family: "Lemon Milk";
        src: url(${LemonMilk}) format('truetype');
    }

    @font-face {
        font-family: "Lemon Milk Light";
        src: url(${LemonMilkLight}) format('truetype');
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Inter", sans-serif;
    }

    html, body, #root {
        width: 100%;
        height: 100%;
        background-color: #121212;
    }

    body {
        display: flex;
        flex-direction: column;
    }

    #root {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
`;

export default GlobalStyle;