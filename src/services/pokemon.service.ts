// import { PokemonClient, EvolutionClient } from 'pokenode-ts'

// const pokemonClient = new PokemonClient()
// const evolutionClient = new EvolutionClient()
const URL = "https://pokeapi.co/api/v2/"

export const listPokemons = async (offset: number, limit: number) => {
    const response = await fetch(`${URL}pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data;
}

export const getPokemon = async (payload: string) => {
    const response = await fetch(`${URL}pokemon/${payload}`);
    const data = await response.json();
    return data;
}
  
export const getPokemonSpecies = async (payload: string) => {
    const response = await fetch(`${URL}pokemon-species/${payload}`);
    const data = await response.json();
    return data;
}
  
export const getEvolutionChain = async (payload: number) => {
    const response = await fetch(`${URL}evolution-chain/${payload}`);
    const data = await response.json();
    return data;
}

