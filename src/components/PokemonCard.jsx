import React, { useContext } from 'react'
import defaultLogo from './../assets/pokemon.png'
import { PokemonContext } from '../context/context';
import TypeLabel from './TypeLabel';

function PokemonCard({img, name, types, id}) {

  const {selectedPokemonId, fetchPokemonDetails} = useContext(PokemonContext);
  // console.log(types);
  

  return (
    <div className='bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 max-w-[400px]'>
      <img className='max-w-[200px]' src={img ? img : defaultLogo} alt="pokemon-image" />
      <p className='text-center text-2xl my-3'>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
      <div className="flex gap-2">
        {
          types.map(type => (
            <TypeLabel key={type} type={type} />
            // <div className="bg-red-200 min-w-[100px] rounded text-center" key={type}>{type}</div>
          ))
        }
        
      </div>
      <button onClick={()=> fetchPokemonDetails(id)} className='bg-[#ffba00] mt-2 rounded text-center hover:bg-[#df9725] px-5 py-1'>More...</button>
    </div>
  )
}

export default PokemonCard