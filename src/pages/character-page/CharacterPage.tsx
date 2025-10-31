import React, { useState } from 'react';
import { useCharactersStore } from '../../store/characters-store.ts';
import { Link } from 'react-router-dom';
import { CharacterCard } from '../../components/character-card/CharacterCard.tsx';

type FilterType = 'all' | 'favorites';

export const CharacterPage: React.FC = () => {
	const { characters, toggleLike, deleteCharacter, getLikedCharacters, loading, error } = useCharactersStore();
	const [filter, setFilter] = useState<FilterType>('all');
	
	const filteredCharacters = filter === 'favorites'
		? getLikedCharacters()
		: characters;
	
	if (loading) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="text-lg">Loading products...</div>
			</div>
		);
	}
	
	if (error) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="text-red-500 text-lg">{error}</div>
			</div>
		);
	}
	
	return (
		<div className="container mx-auto px-4 py-8">
			
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Rick and Morty Characters</h1>
				<Link
					to="/create-character"
					className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center space-x-2"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
					</svg>
					<span>Create Character</span>
				</Link>
			</div>
			
			<div className="flex space-x-4 mb-8">
				<button
					className={`px-6 py-2 rounded-lg transition-colors ${
						filter === 'all'
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}
					onClick={() => setFilter('all')}
				>
					All Products ({characters.length})
				</button>
				<button
					className={`px-6 py-2 rounded-lg transition-colors ${
						filter === 'favorites'
							? 'bg-red-500 text-white'
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}
					onClick={() => setFilter('favorites')}
				>
					Favorites ({getLikedCharacters().length})
				</button>
			</div>
			
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredCharacters.map(item => (
					<CharacterCard
						key={item.id}
						character={item}
						onToggleLike={toggleLike}
						onDelete={deleteCharacter}
					/>
				))}
			</div>
			
			{filteredCharacters.length === 0 && (
				<div className="text-center py-12 text-gray-500">
					{filter === 'favorites'
						? 'No favorite character-page yet'
						: 'No character-page available'
					}
				</div>
			)}
		</div>
	);
};