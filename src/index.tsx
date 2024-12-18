import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// 영어 폰트
import "@fontsource/lilita-one";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/300.css";
// 일본어 폰트
import "@fontsource/mochiy-pop-one";
import "@fontsource/noto-sans-jp/600.css";
import "@fontsource/noto-sans-jp/300.css";
// 한국어 폰트
import "@fontsource/black-han-sans";
import "@fontsource/noto-sans-kr/600.css";
import "@fontsource/noto-sans-kr/300.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
