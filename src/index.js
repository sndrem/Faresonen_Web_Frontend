import React from "react";
import ReactDOM from "react-dom";
import Raven from "raven-js";

import "./index.css";
import "./print.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

Raven.config(
  "https://6804db3180e14d51a1da9c443b1a288c@sentry.io/1280627"
).install();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
