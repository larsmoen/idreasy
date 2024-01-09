import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FileProvider } from "./utils/FileContext";
import reportWebVitals from "./reportWebVitals";
// import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./utils/LanguageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <FileProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FileProvider>
    </LanguageProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
