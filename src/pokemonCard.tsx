import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { Pokemon } from "./types/pokemon";

export function PokemonCard({ pokemonUrl }: { pokemonUrl: string }) {
  const pokemonQuery = useQuery({
    queryKey: [pokemonUrl],
    queryFn: async () => (await ky.get(pokemonUrl).json()) satisfies Pokemon,
  });

  if (pokemonQuery.data) {
    return (
      <li className="border-solid border-2 border-red-500 rounded-lg">
        <div>
          <img
            src={pokemonQuery.data.sprites.front_default}
            width={150}
            height={200}
          />
        </div>

        <div className="bg-red-200 px-3">
          #{pokemonQuery.data.order}
          <div>{pokemonQuery.data.name}</div>
          {pokemonQuery.data.types.map((type) => (
            <a key={type.slot}> {type.type.name}</a>
          ))}
        </div>
      </li>
    );
  }
  return <div />;
}
