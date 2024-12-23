import { createContext, useState } from "react";

export const PokemonContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);
  const [loadingPokemonDetails, setloadingPokemonDetails] = useState(false);
  // const [loadingPokemonsList, setLoadingPokemonsList] = useState(false)
  // console.log(selectedPokemonId);

  async function fetchPokemonDetails(id) {
    try {
      setloadingPokemonDetails(true)
      setSelectedPokemonId(id);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await response.json();
    setSelectedPokemonData(pokemonData);
    } catch (error) {
      setloadingPokemonDetails(true);
      console.log(error);
      
    }
    finally {
      setloadingPokemonDetails(false)
    }
    
  }

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemonId,
        setSelectedPokemonId,
        selectedPokemonData,
        setSelectedPokemonData,
        fetchPokemonDetails,
        loadingPokemonDetails,
        
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default ContextProvider;
