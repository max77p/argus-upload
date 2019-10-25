import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./Redux/store/store";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const store = configureStore();
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
