
  import { useQuery } from '@tanstack/react-query'
  import ky from 'ky'
import { Pokemons } from './pokemons'
import { PokemonCard } from './pokemonCard'

  function App() {
    const pokemonsQuery = useQuery({ 
      queryKey: ['pokemons'], 
      queryFn: async () => await ky.get("https://pokeapi.co/api/v2/pokemon/").json() satisfies Pokemons
     })

    if(pokemonsQuery.data){
      return  (
        <>
            {/* pokemonsQuery.data.results.map( pokemon => <PokemonCard pokemonUrl={pokemon.url}/>)*/
               <PokemonCard pokemonUrl={pokemonsQuery.data.results[0].url}/>
            }
        </>
      )
    }
   
  }

  export default App
