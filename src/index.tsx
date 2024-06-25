import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportwebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import {store} from "./Redux/store"
import "./index.css"

const rootElement = document.getElementById("root")as Element;
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <ChakraProvider>    
    <Provider store={store}>
        <App />
        </Provider >
    </ChakraProvider>

  </BrowserRouter>
);

reportWebVitals((metrics: any) => {
  console.log(metrics);
});