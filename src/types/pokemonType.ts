export type PokemonType = (typeof pokemonTypes)[number];
export const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",

  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export function isPokemonType(type: string): type is PokemonType {
  return pokemonTypes.includes(type);
}

