import { useQuery } from "@tanstack/react-query"
import ky from "ky"
import { Pokemons } from "./pokemons"
import { Pokemon } from "./pokemon"

export function PokemonCard ({pokemonUrl} :{pokemonUrl:string}) {
    const pokemonQuery = useQuery({ 
        queryKey: [pokemonUrl], 
        queryFn: async () => await ky.get(pokemonUrl).json() satisfies Pokemon
       })

       if(pokemonQuery.data){
        return <div>
             <h1 className="text-3xl font-bold underline bg-red">
      Hello world!
    </h1>
            <div><img src={pokemonQuery.data.sprites.front_default}/></div>
        <div>{pokemonQuery.data.name}</div>
        {pokemonQuery.data.types.map(type =><div> {type.type.name}</div>)}
        #{pokemonQuery.data.order}

        </div>
        

       }
   
}