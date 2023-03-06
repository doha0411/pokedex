import { ChangeEvent, useEffect, useState, useCallback, useMemo } from 'react'
import { useOnScreen } from '@/hooks'
import { SimplePokemon } from '@/models/pokemon.model'
import { listPokemons } from '@/services/pokemon.service'
import { createListSimplePokemonAdapter } from '@/adapters/pokemon.adapter'
import { joinDataToSearch } from '@/utilities'
import { ReactComponent as PokeballIcon } from '@/assets/svg/pokeball.svg'
import classNames from 'classnames'
import AnimatePage from '@/components/AnimatePage'
import PokemonCard from '@/pages/Home/components/PokemonCard'
import PokemonIcon from '@/assets/svg/pokemon.svg'
import VirtualScroll from '@/components/VirtualScroll'
import Search from './searchStyles'

const Home = () => {
	const [pokemons, setPokemons] = useState<SimplePokemon[]>([])
	const [total, setTotal] = useState<number>(0)
	const [offset, setOffset] = useState<number>(0)
	const [limit, _setLimit] = useState<number>(24)
	const [search, setSearch] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [infiniteScrollRef, infiniteScrollRefOnScreen] =
		useOnScreen<HTMLDivElement>(-70)

	useEffect(() => {
		if (infiniteScrollRefOnScreen && search === '') fetchPokemons()
	}, [infiniteScrollRefOnScreen])

	const fetchPokemons = useCallback(async () => {
		try {
			setIsLoading(true);
			const { results, count } = await listPokemons(offset * limit, limit);
			console.log("results: ",results)
			const pokemonAdapted = createListSimplePokemonAdapter(results);
			setPokemons((prevPokemons) => [...prevPokemons, ...pokemonAdapted]);
			setOffset((prevOffset) => prevOffset + 1);
			setTotal(count);
			setIsLoading(false);
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}, [offset])

	const memorizedPokemons = useMemo(() => {
		return pokemons.map((pokemon) => {
		return { ...pokemon, name: pokemon.name };
		});
  	}, [pokemons]);

	// console.log(pokemons)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const searchLower = useMemo(() => joinDataToSearch(search), [search]);

	const searchFunction = (pokemon: SimplePokemon): boolean => {
		return pokemon.name.toLowerCase().includes(searchLower);
	}

	return (
		<AnimatePage>
			<div className='container mx-auto p-4'>
				<div
					className='flex flex-col items-center justify-center'
				>
					<img src={PokemonIcon} alt='pokemon-logo' className='h-32 mb-8' />
					<Search
						value={search}
						type='search'
						placeholder='Search an pokemon'
						className='input'
						onInput={handleSearch}
					/>
				</div>
			</div>
			<div className='container mx-auto p-4'>
				<div className='grid gap-4 grid-cols-12'>
					{memorizedPokemons.filter(searchFunction).map((pokemon) => (
						<VirtualScroll
							key={pokemon.name}
							minItemHeight={320}
							className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3'
						>
							<PokemonCard pokemon={pokemon.name} />
						</VirtualScroll>
					))}
				</div>
			</div>
			{(total === 0 || total > memorizedPokemons.length) && (
				<div
					ref={infiniteScrollRef}
					className='flex items-center justify-center py-8'
				>
					<div className='flex space-x-4'>
						{[0, 1, 2].map((item) => (
							<PokeballIcon
								key={item}
								className={classNames('w-8', 'h-8', 'fill-white/50', {
									'animate-bounce': isLoading,
								})}
								style={{
									animationDelay: `${item * 0.33}s`,
								}}
							/>
						))}
					</div>
				</div>
			)}
		</AnimatePage>
	)
}

export default Home
