import { create } from 'zustand';
import type { CharacterWithLike } from '../types/character.types.ts';
import { getCharacters } from '../api/getCharacters.ts';

interface CharactersState {
	characters: CharacterWithLike[];
	loading: boolean;
	error: string | null;
	
	fetchCharacters: () => Promise<void>;
	toggleLike: (id: number) => void;
	deleteCharacters: (id: number) => void;
	getLikedCharacters: () => CharacterWithLike[];
}

export const useCharactersStore = create<CharactersState>(
	(set, get) => ({
	characters: [],
	loading: false,
	error: null,
	
	fetchCharacters: async () => {
		set({ loading: true, error: null });
		try {
			const response = await getCharacters.getAllCharacters();
			const data = response.data.results;
			
			const characterWithLikes: CharacterWithLike[] = data.map((item) => ({
				...item,
				isLiked: false
			}));
			
			set({ characters: characterWithLikes, loading: false });
		} catch (error) {
			set({ error: `Failed to fetch products ${error}`, loading: false });
			throw error;
		}
	},
	
	toggleLike: (id: number) => {
		set(state => ({
			characters: state.characters.map(item =>
				item.id === id
					? { ...item, isLiked: !item.isLiked }
					: item
			)
		}));
	},
	
	deleteCharacters: (id: number) => {
		set(state => ({
			characters: state.characters.filter(item => item.id !== id)
		}));
	},
	
	getLikedCharacters: () => {
		return get().characters.filter(item => item.isLiked);
	}
}));