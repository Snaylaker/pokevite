import { useQuery } from "@tanstack/react-query"
import ky from "ky"
import { Pokemon } from "./pokemon"

export function PokemonCard ({pokemonUrl} :{pokemonUrl:string}) {
    const pokemonQuery = useQuery({ 
        queryKey: [pokemonUrl], 
        queryFn: async () => await ky.get(pokemonUrl).json() satisfies Pokemon
       })

       if(pokemonQuery.data){
        return <section>
            <div><img src={pokemonQuery.data.sprites.front_default}/></div>
            #{pokemonQuery.data.order}
        <div>{pokemonQuery.data.name}</div>
        {pokemonQuery.data.types.map(type =><a>  {type.type.name}</a>)}
     

        </section>
        

       }
       return <div/>
   
}