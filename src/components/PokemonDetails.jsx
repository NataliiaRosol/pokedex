import React, { useContext } from "react";
import defaultLogo from "./../assets/pokemon.png";
import { PokemonContext } from "../context/context";

function PokemonDetails({ img }) {
  const { setSelectedPokemonId, selectedPokemonData,loadingPokemonDetails } = useContext(PokemonContext);
  
  const handleClickOutside = (event) => {
    event.target.id === "overlay";
    setSelectedPokemonId(null);
  }

  return (
    
    <div id="overlay" className="fixed top-0 left-0 right-0 h-full sm:static bg-gray-200 sm:bg-transparent" onClick={handleClickOutside}>
      <div className="flex flex-col items-center ">
      <h2 className="text-center text-xl font-bold py-3">Selected Pokemon</h2>
      {
      loadingPokemonDetails ? <div className="">Loading...</div> : <div className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 max-w-[400px]">
      <img
        className="hidden sm:block sm:max-w-[200px] "
        src={img ? img : defaultLogo}
        alt="pokemon-image"
      />

      <p className="text-center text-2xl my-3">
        {selectedPokemonData?.name.charAt(0).toUpperCase() + selectedPokemonData?.name.slice(1)} #{selectedPokemonData?.id}
      </p>
      <table>
        <tbody>
        <tr className="">
          <th className="w-[80%] border border-gray-300 text-sm font-normal px-4 py-2">
            Type
          </th>
          <th className="border border-gray-300 text-sm font-normal px-4 py-2">
            {selectedPokemonData?.types.map((item) => <p key={item.type.name}>{item.type.name}</p>)}
          </th>
        </tr>
        <tr className="">
          <th className="w-[80%] border border-gray-300 text-sm font-normal px-4 py-2">
            Attack
          </th>
          <th className="border border-gray-300 text-sm font-normal px-4 py-2">
            {selectedPokemonData?.stats.find((item) => item.stat.name === "attack").base_stat}
          </th>
        </tr>
        <tr className="">
          <th className="w-[80%] border border-gray-300 text-sm font-normal px-4 py-2">
            Defense
          </th>
          <th className="border border-gray-300 text-sm font-normal px-4 py-2">
          {selectedPokemonData?.stats.find((item) => item.stat.name === "defense").base_stat}
          </th>
        </tr>
        <tr className="">
          <th className="w-[80%] border border-gray-300 text-sm font-normal px-4 py-2">
            HP
          </th>
          <th className="border border-gray-300 text-sm font-normal px-4 py-2">
          {selectedPokemonData?.stats.find((item) => item.stat.name === "hp").base_stat}
          </th>
        </tr>
        <tr className="">
          <th className="w-[80%] border border-gray-300 text-sm font-normal px-4 py-2">
          SP Attack
          </th>
          <th className="border border-gray-300 text-sm font-normal px-4 py-2">
          {selectedPokemonData?.stats.find((item) => item.stat.name === "special-attack").base_stat}
          </th>
        </tr>
        <tr className="">
          <th className="w-[80%] border border-gray-300 text-sm font-normal px-4 py-2">
            SP Defense
          </th>
          <th className="border border-gray-300 text-sm font-normal px-4 py-2">
          {selectedPokemonData?.stats.find((item) => item.stat.name === "special-defense").base_stat}
          </th>
        </tr>
        <tr className="">
          <th className="w-[80%] border border-gray-300 text-sm font-normal px-4 py-2">
            Speed
          </th>
          <th className="border border-gray-300 text-sm font-normal px-4 py-2">
          {selectedPokemonData?.stats.find((item) => item.stat.name === "speed").base_stat}
          </th>
        </tr>
        <tr className="">
          <th className="w-[80%] border border-gray-300 text-sm font-normal px-4 py-2">
            Weight
          </th>
          <th className="border border-gray-300 text-sm font-normal px-4 py-2">
          {selectedPokemonData?.weight}
          </th>
        </tr>
        <tr className="">
          <th className="w-[80%] border border-gray-300 text-sm font-normal px-4 py-2">
            Total moves
          </th>
          <th className="border border-gray-300 text-sm font-normal px-4 py-2">
          {selectedPokemonData?.moves.length}
          </th>
        </tr>
        </tbody>
      </table>
    </div>
      }
      
      </div>
    </div>
  );
}

export default PokemonDetails;
