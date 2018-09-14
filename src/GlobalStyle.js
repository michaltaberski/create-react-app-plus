import { createGlobalStyle } from "styled-components";
import 'sanitize.css/sanitize.css';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif;
    font-size: 1rem;
    line-height: 1.5;
  }

  button:disabled {
    opacity: 0.5;
  }
`;

export default GlobalStyle;
