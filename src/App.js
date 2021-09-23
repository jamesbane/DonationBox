import {Router} from "./router";
import React from "react";
import {Web3ReactProvider} from "@web3-react/core";
import * as ethers from "ethers";
import {ToastsProvider} from "./context/ToastsContext";
import {ThemeContextProvider} from "./context/ThemeProvider";

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library
};


function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastsProvider>
        <ThemeContextProvider>
          <Router/>
        </ThemeContextProvider>
      </ToastsProvider>
    </Web3ReactProvider>
  );
}

export default App;
