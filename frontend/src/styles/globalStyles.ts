import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, body {
    font-family: 'Poppins', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: #dad6ca;
  }
`;

export default GlobalStyle;
