import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { Pokemons } from "./types/pokemons";
import { PokemonCard } from "./pokemonCard";
import { useState } from "react";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const pokemonsQuery = useQuery<Pokemons>({
    queryKey: ["pokemons"],
    queryFn: async () =>
      await ky
        .get("https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0")
        .json(),
  });

  if (pokemonsQuery.data) {
    const filtredPokemons = pokemonsQuery.data.results.filter((pokemon) =>
      pokemon.name.startsWith(pokemonName),
    );
    console.log(filtredPokemons);
    return (
      <main className="m-auto max-w-7xl p-4">
        <nav className="bg-red-200">
          <h1 className="my-5 text-5xl ">Pokédex</h1>
        </nav>
        <div className=" mx-auto my-5 max-w-lg">
          <label htmlFor="pokemon-filter">Find a pokemon :</label>
          <input
            className="border-black"
            type="search"
            id="site-search"
            name="pokemon input"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
          />
        </div>
        <ul className="flex flex-wrap gap-4">
          {filtredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
          ))}
        </ul>
      </main>
    );
  }
  return <div />;
}

export default App;
