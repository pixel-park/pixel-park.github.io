import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TextExplode from "./tools/TextExplode";
import { handleAnalytics } from "./tools/utilities";
const memory = {token: ""};

const isMobile = (() => {
  return (
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || 
      (navigator.maxTouchPoints > 0)
  );
})()
const dev = "http://localhost:4000";
const path = "https://presentor-server-159962184890.us-central1.run.app";
const {setAnalyticState} = handleAnalytics({
  app: "CV",
  serverPath: path,
  endpoints:{
    termination: { method: "POST", endpoint: "/close" },
    inactivity: { method: "POST", endpoint: "/activity" },
    register: {method: "POST", endpoint: "/ok"},
  }
})
setAnalyticState({isMobile});
console.log((isMobile))
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
