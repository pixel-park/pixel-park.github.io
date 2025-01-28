import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TextExplode from "./tools/TextExplode";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const reg = async () => {
  const register = await fetch("https://presentor-server-159962184890.us-central1.run.app/ok?app=cv");
  const text = await register.text();
  console.log(text)
};
reg();
root.render(
  // <React.StrictMode>
  <TextExplode>
    <App />
  </TextExplode>
  // </React.StrictMode>
);
