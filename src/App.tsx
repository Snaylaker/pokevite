import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { Pokemons } from "./types/pokemons";
import { Pokemon } from "./types/pokemon";
import { useState } from "react";

export default function App() {
  const [pokemonName, setPokemonName] = useState("");
  const pokemonsQuery = useQuery<Pokemons>({
    queryKey: ["pokemons"],
    queryFn: async () =>
      await ky
        .get("https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0")
        .json(),
  });

  if (pokemonsQuery.data) {
    return (
      <main className="m-auto max-w-7xl rounded-lg border-2 bg-gradient-to-r from-purple-500 to-pink-500 p-4">
        <nav className="my-3 bg-red-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#2196F3"
            className="h-6 w-6 text-blue-500"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.46 3.43 1.32 4.9l1.43-1.43C4.53 14.21 4 13.15 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8c-1.15 0-2.21-.53-2.9-1.43l-1.43 1.43c1.47.86 3.16 1.32 4.9 1.32 5.52 0 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z" />
          </svg>

          <h1 className="px-5 text-5xl ">Pokédex</h1>
        </nav>
        <div className=" mx-auto my-5 max-w-lg">
          <label htmlFor="pokemon-filter">Find a pokemon :</label>
          <input
            className="rounded border border-gray-300 px-2 py-2"
            type="search"
            id="site-search"
            name="pokemon input"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
          />
        </div>
        <ul className="flex flex-wrap justify-center gap-4">
          {pokemonsQuery.data.results
            .filter((pokemon) => pokemon.name.startsWith(pokemonName))
            .map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
            ))}
        </ul>
      </main>
    );
  }
  return <div />;
}

function PokemonCard({ pokemonUrl }: { pokemonUrl: string }) {
  const pokemonQuery = useQuery({
    queryKey: [pokemonUrl],
    queryFn: async () => (await ky.get(pokemonUrl).json()) satisfies Pokemon,
  });

  if (pokemonQuery.data) {
    return (
      <li className="rounded-lg border-2 border-solid shadow-md  transition-transform hover:scale-105">
        <div>
          <img
            className="  h-40 w-40 overflow-hidden  bg-none p-2 hover:animate-bounce"
            src={pokemonQuery.data.sprites.front_default}
          />
        </div>

        <div className="border px-3">
          #{pokemonQuery.data.order}
          <div>{pokemonQuery.data.name}</div>
          {pokemonQuery.data.types.map((type) => (
            <PokemonType key={type.slot} type={type.type.name} />
          ))}
        </div>
      </li>
    );
  }
  return <div />;
}

const PokemonType = ({ type }: { type: string }) => {
  const typeColor = getTypeColor(type);
  return (
    <span
      className={`inline-block rounded-md px-2 py-1 text-sm font-medium ${typeColor} my-1 mr-1`}
    >
      {type}
    </span>
  );
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "normal":
      return "bg-gray-400 text-gray-900";
    case "fire":
      return "bg-red-500 text-white";
    case "water":
      return "bg-blue-500 text-white";
    case "electric":
      return "bg-yellow-400 text-gray-900";
    case "grass":
      return "bg-green-500 text-white";
    case "ice":
      return "bg-blue-200 text-gray-900";
    case "fighting":
      return "bg-red-700 text-white";
    case "poison":
      return "bg-purple-500 text-white";
    case "ground":
      return "bg-yellow-700 text-white";
    case "flying":
      return "bg-indigo-500 text-white";
    case "psychic":
      return "bg-pink-500 text-white";
    case "bug":
      return "bg-green-700 text-white";
    case "rock":
      return "bg-yellow-800 text-white";
    case "ghost":
      return "bg-indigo-800 text-white";
    case "dragon":
      return "bg-purple-700 text-white";
    case "dark":
      return "bg-gray-800 text-white";
    case "steel":
      return "bg-gray-500 text-gray-900";
    case "fairy":
      return "bg-pink-300 text-gray-900";
    default:
      return "bg-gray-500 text-gray-900";
  }
};
