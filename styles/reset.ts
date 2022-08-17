import { css } from "@emotion/react";

const resetCss = css`
  body {
    margin: 0;
  }

  a,
  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    outline: 0;
  }

  button:focus,
  button:active,
  canvas:focus,
  canvas:active {
    outline: none;
  }
`;

export default resetCss;
