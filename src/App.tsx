import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { Pokemons } from "./types/pokemons";
import { Pokemon } from "./types/pokemon";
import PokeBallImg from "./assets/Pokeball.webp";
import { ChangeEvent, useState } from "react";
import { pokemonTypes } from "./types/pokemonType";

const AllTypes = "All"
export default function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [selectedType, setSelectedType] = useState(AllTypes);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

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
        <nav className="my-3 flex bg-white ">
          <img src={PokeBallImg} alt="pokeball image" className="h-20 w-20" />
          <h1 className="px-5 text-5xl ">Pokédex</h1>
        </nav>
        <div className="my-6 flex justify-center space-x-3">
          <div>
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
          <select value={selectedType} onChange={handleChange}>
            <option selected  value="All">All Types</option>
            {" "}
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <ul className="flex flex-wrap justify-center gap-4">
          {pokemonsQuery.data.results
            .filter((pokemon) => pokemon.name.startsWith(pokemonName))
            .map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemonUrl={pokemon.url}
                selectedType={selectedType}
              />
            ))}
        </ul>
      </main>
    );
  }
  return <div />;
}

function PokemonCard({
  pokemonUrl,
  selectedType,
}: {
  pokemonUrl: string;
  selectedType: string;
}) {
  const pokemonQuery = useQuery({
    queryKey: [pokemonUrl],
    queryFn: async () => (await ky.get(pokemonUrl).json()) satisfies Pokemon,
  });

  const [isShinyVisible, setIsShinyVisible] = useState(false);

  if (pokemonQuery.data) {
    return pokemonQuery.data.types.some(
      (type) => type.type.name === selectedType,
    ) || selectedType === AllTypes? (
      <li className="rounded-lg border-2 border-solid shadow-md  transition-transform hover:scale-105">
        <div>
          <img
            className={`h-40 w-40 bg-none p-2 hover:animate-bounce `}
            src={
              isShinyVisible
                ? pokemonQuery.data.sprites.front_shiny
                : pokemonQuery.data.sprites.front_default
            }
            onClick={() => setIsShinyVisible(!isShinyVisible)}
          />
        </div>

        <div className="border px-3">
          #{pokemonQuery.data.order}
          <div className="text-lg font-medium">{pokemonQuery.data.name}</div>
          {pokemonQuery.data.types.map((type) => (
            <PokemonType key={type.slot} type={type.type.name} />
          ))}
        </div>
      </li>
    ) : (
      <></>
    );
  }
  return <></>;
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
