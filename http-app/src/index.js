import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as Sentry from "@sentry/browser";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Sentry.init({
  dsn: "https://740d2a36f4434e868ce741a40f6def4a@sentry.io/1294631"
});

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
