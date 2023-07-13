
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
        <main className='m-auto max-w-4xl p-4'>
          <h1>Pokédex</h1>
          <div className='flex justify-items-start flex-wrap'>
          { pokemonsQuery.data.results.map( pokemon => <PokemonCard pokemonUrl={pokemon.url}/>)}
          </div>
        </main>
      )
    }
    return <div/>

   
  }

  export default App
