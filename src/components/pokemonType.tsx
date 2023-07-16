const PokemonType = ({ type }: { type: string }) => {
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

  const typeColor = getTypeColor(type);

  return (
    <span
      className={`inline-block rounded-md px-2 py-1 text-sm font-medium ${typeColor}`}
    >
      {type}
    </span>
  );
};

export default PokemonType;
