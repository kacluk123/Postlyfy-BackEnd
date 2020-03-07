import { createGlobalStyle } from "styled-components";
import globalColors from "./colors";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Roboto', sans-serif;
    width: 100%;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden;
    ${globalColors}
  }
`;

export default GlobalStyle;
