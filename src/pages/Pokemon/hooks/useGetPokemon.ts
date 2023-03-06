import { useEffect, useState, useCallback } from 'react'
import { createPokemonAdapter } from '@/adapters/pokemon.adapter'
import { Pokemon } from '@/models/pokemon.model'
import { getPokemon } from '@/services/pokemon.service'

export function useGetPokemon(pokemon: string): [Pokemon, boolean, boolean] {
	const [hasError, setHasError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [pokemonData, setPokemonData] = useState<Pokemon>({} as Pokemon)

	const createAdapter = useCallback((data: any) => {
		return createPokemonAdapter(data)
	}, [])

	useEffect(() => {
		getPokemon(pokemon)
			.then((data) => createAdapter(data))
			.then((data) => setPokemonData(data))
			.catch(() => setHasError(true))
			.finally(() => setIsLoading(false))
	}, [pokemon, createAdapter])

	return [pokemonData, isLoading, hasError]
}
