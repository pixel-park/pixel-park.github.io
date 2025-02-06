import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TextExplode from "./tools/TextExplode";
const memory = {token: ""};

const path = "https://presentor-server-159962184890.us-central1.run.app/";
let closed = true;
window.addEventListener("unload", (e) => {
  if (closed) return;
  navigator.sendBeacon(
    path + "close",
    JSON.stringify({ token: memory.token })
  );
  closed = true;
});

window.addEventListener("beforeunload", (e) => {
  if (closed) return;
  navigator.sendBeacon(
    path + "close",
    JSON.stringify({ token: memory.token })
  );
  closed = true;
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const reg = async () => {
  const register = await fetch(path + "ok?app=cv");
  const {token} = await register.json();
      memory.token = token;
      closed = false;
};
reg();
root.render(
  // <React.StrictMode>
  <TextExplode>
    <App />
  </TextExplode>
  // </React.StrictMode>
);
