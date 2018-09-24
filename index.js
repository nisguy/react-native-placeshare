import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import App from "./App";

import configStore from "./src/store/storeConfig";

const store = configStore();

const reactNativeRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent("rncourse", () => reactNativeRedux);
