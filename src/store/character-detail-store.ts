import { create } from 'zustand';
import type { Character } from '../types/character.types.ts';
import { getCharacters } from '../api/getCharacters.ts';

interface CharacterDetailState {
	character: Character | null;
	loading: boolean;
	error: string | null;
	
	fetchCharacterDetail: (id: number) => Promise<void>;
	clearCharacter: () => void;
}

export const useCharacterDetailStore = create<CharacterDetailState>((set) => ({
	character: null,
	loading: false,
	error: null,
	
	fetchCharacterDetail: async (id: number) => {
		set({ loading: true, error: null, character: null });
		
		try {
			const response = await getCharacters.getOneCharacter(id);
			
			set({ character: response.data, loading: false });
		} catch (error) {
			set({
				error: `Failed to fetch character details: ${error}`,
				loading: false
			});
			throw error;
		}
	},
	
	clearCharacter: () => {
		set({ character: null, error: null });
	}
}));