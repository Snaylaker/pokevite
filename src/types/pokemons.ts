export interface Pokemons {
  count: number;
  next: string;
  previous: any;
  results: Result[];
}

interface Result {
  name: string;
  url: string;
}
