import { useState } from "react";

import "./App.css";
import PokemonsList from "./components/PokemonsList";
import Header from "./components/Header";
import ContextProvider from "./context/context";

function App() {
  return (
    <ContextProvider>
      <div className="container md:p-10 p-5 m-auto">
        <Header />
        <PokemonsList />
      </div>
    </ContextProvider>
  );
}

export default App;
