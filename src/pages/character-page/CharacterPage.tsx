import { CharactersList } from '../../components/character-list/CharactersList.tsx';
import { useCharactersStore } from '../../store/characters-store.ts';
import { useEffect } from 'react';

const CharacterPage = () => {
	const {fetchCharacters} = useCharactersStore();
	
	useEffect(() => {
		void fetchCharacters();
	}, [fetchCharacters]);
	
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm">
				<div className="container mx-auto px-4 py-6">
					<h1 className="text-3xl font-bold text-gray-800">Rick and Morty</h1>
					<p className="text-gray-600">Discover amazing adventure time Rick and Morty</p>
				</div>
			</header>
			
			<main>
				<CharactersList/>
			</main>
		</div>
	);
};

export default CharacterPage;