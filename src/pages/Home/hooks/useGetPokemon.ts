import { useEffect, useState } from 'react'
import { createPokemonAdapter } from '@/adapters/pokemon.adapter'
import { Pokemon } from '@/models/pokemon.model'
import { getPokemon } from '@/services/pokemon.service'

export function useGetPokemon(pokemon: string): [Pokemon, boolean] {
	const [isLoading, setIsLoading] = useState(true)
	const [pokemonData, setPokemonData] = useState<Pokemon>({} as Pokemon)

	useEffect(() => {
		getPokemon(pokemon)
			.then((data) => createPokemonAdapter(data))
			.then((data) => setPokemonData(data))
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false))
	}, [pokemon])

	return [pokemonData, isLoading]
}
