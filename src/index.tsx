import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import GlobalStyles from "./globalStyles";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("example")
);
