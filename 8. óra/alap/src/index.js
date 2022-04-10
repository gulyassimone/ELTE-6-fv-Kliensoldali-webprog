import React from "react";
import ReactDOM from "react-dom";

import App from "./view/App";
import "./index.css";
import PairNumberProvider from "./state/PairNumber";
import GameProgressProvider from "./state/GameProgress";

ReactDOM.render(
  <React.StrictMode>
    <PairNumberProvider>
      <GameProgressProvider>
        <App />
      </GameProgressProvider>
    </PairNumberProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
