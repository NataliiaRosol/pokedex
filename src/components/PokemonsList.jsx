import React, { useContext, useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonDetails from "./PokemonDetails";
import { PokemonContext } from "../context/context";

function PokemonsList() {
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [loadingPokemonsList, setLoadingPokemonsList] = useState(true);
  const [pokemonsTypes, setPokemonsTypes] = useState([]);


  const { selectedPokemonId, setSelectedPokemonId } =
    useContext(PokemonContext);

  const getUniqueTypes = async () => {
    const typesSet = new Set();
    await Promise.all(
      pokemons.map(async (item) => {
        const types = await item.types;
        types.forEach((type) => typesSet.add(type));
      })
    );
    const uniqueTypes = [...typesSet];
    setPokemonsTypes(uniqueTypes);
 
    
  };

  const fetchPokemonsData = async () => {
    try {
      setLoadingPokemonsList(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=12$&offset=${page * 12}`
      );
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            return {
              id: pokemonData.id,
              name: pokemon.name,
              types: pokemonData.types.map((item) => item.type.name),
            };
          }
        })
      );

      setPokemons(pokemonDetails);
    } catch (error) {
      setLoadingPokemonsList(true);
      console.log(error);
    } finally {
      setLoadingPokemonsList(false);
    }
  };



  useEffect(() => {
    setSelectedPokemonId(null);
    fetchPokemonsData();
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Додає плавну прокрутку
      });
    };
    handleScrollToTop();
  }, [page]);

  useEffect(() => {
    fetchPokemonsData();
    getUniqueTypes();
  }, []);

  console.log(pokemons);
  console.log(pokemonsTypes);

  return (
    <div className="container flex flex-col">
      {loadingPokemonsList && <div>Fetching data, please wait...</div>}
      <div className="grid place-items-center sm:grid-cols-[60%_35%] md:gap-5 grid-cols-1 gap-3 md:mt-10 mt-3 ">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
          {pokemons.map((item) => (
            <PokemonCard
              key={item.name}
              name={item.name}
              types={item.types}
              id={item.id}
            />
          ))}
        </div>
        <div className="self-start mb-5 w-[100%]">
          {selectedPokemonId && <PokemonDetails />}
        </div>
      </div>

      <button
        className="self-end bg-[#ffba00] rounded px-5 py-2 hover:scale-110 transition-all duration-500"
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        Load More
      </button>
    </div>
  );
}

export default PokemonsList;
