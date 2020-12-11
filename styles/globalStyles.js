import { createGlobalStyle } from 'styled-components'
 
const GlobalStyle = createGlobalStyle`
    body {
        background: #111;
    }

    body::-webkit-scrollbar {
        width: 0.15rem;
    }

    body::-webkit-scrollbar-thumb {
        background: #dc3545;
    }

    body::-webkit-scrollbar-track {
        background: #111;
    }

    hr {
        background: radial-gradient(ellipse at center,hsla(0,0%,100%,.2) 0,hsla(0,0%,100%,0) 75%);
    }

    img {
        filter: grayscale(100%);
    }

    figure img {
        width: 100%;
    }

    blockquote {
        color: #dc3545;
        font-family: 'Roboto', sans-serif;
        font-size: 2em;
        font-weight: 700;
        position: relative;
        margin: 1em 0;
    }

    blockquote::before {
        content: "“";
        font-size: 3em;
        line-height: 0;
        left: -0.2rem;
        top: 1.4rem;
        position: absolute;
        text-align: center;
    }

    .site-title {
        font-family: 'Cinzel', serif;
    }
`
    
export default GlobalStyle;