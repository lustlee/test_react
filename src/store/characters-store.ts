import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character, CharacterWithLike, CreateCharacterData } from '../types/character.types';
import { getCharacters } from '../api/getCharacters';

interface CharactersState {
	characters: CharacterWithLike[];
	loading: boolean;
	error: string | null;
	hasFetchedFromAPI: boolean; // ✅ Новое поле для отслеживания
	
	// Действия
	fetchCharacters: () => Promise<void>;
	createCharacter: (characterData: CreateCharacterData) => Promise<CharacterWithLike>;
	toggleLike: (id: number) => void;
	deleteCharacter: (id: number) => void;
	getLikedCharacters: () => CharacterWithLike[];
	clearCharacters: () => void; // ✅ Новая функция для очистки
}

export const useCharactersStore = create<CharactersState>()(
	persist(
		(set, get) => ({
			characters: [],
			loading: false,
			error: null,
			hasFetchedFromAPI: false,
			
			fetchCharacters: async () => {
				const state = get();
				
				if (state.hasFetchedFromAPI && state.characters.length > 0) {
					return;
				}
				
				set({ loading: true, error: null });
				try {
					const response = await getCharacters.getAllCharacters();
					const data = response.data.results;
					
					const charactersWithLikes: CharacterWithLike[] = data.map((character: Character) => ({
						...character,
						isLiked: false
					}));
					
					set({
						characters: charactersWithLikes,
						loading: false,
						hasFetchedFromAPI: true
					});
				} catch (error) {
					set({ error: `Failed to fetch characters: ${error}`, loading: false });
				}
			},
			
			createCharacter: async (characterData: CreateCharacterData) => {
				set({ loading: true, error: null });
				
				try {
					await new Promise(resolve => setTimeout(resolve, 1000));
					
					const newCharacter: CharacterWithLike = {
						id: Date.now(),
						name: characterData.name,
						status: characterData.status,
						species: characterData.species,
						type: characterData.type,
						gender: characterData.gender,
						origin: {
							name: characterData.origin,
							url: ''
						},
						location: {
							name: characterData.location,
							url: ''
						},
						image: characterData.image,
						episode: [],
						url: '',
						created: new Date().toISOString(),
						isLiked: false
					};
					
					set(state => ({
						characters: [newCharacter, ...state.characters],
						loading: false
					}));
					
					return newCharacter;
				} catch (error) {
					set({ error: `Failed to create character: ${error}`, loading: false });
					throw error;
				}
			},
			
			toggleLike: (id: number) => {
				set(state => ({
					characters: state.characters.map(character =>
						character.id === id
							? { ...character, isLiked: !character.isLiked }
							: character
					)
				}));
			},
			
			deleteCharacter: (id: number) => {
				set(state => ({
					characters: state.characters.filter(character => character.id !== id)
				}));
			},
			
			getLikedCharacters: () => {
				return get().characters.filter(character => character.isLiked);
			},
			
			clearCharacters: () => {
				set({
					characters: [],
					hasFetchedFromAPI: false
				});
			}
		}),
		{
			name: 'characters-storage',
			partialize: (state) => ({
				characters: state.characters,
				hasFetchedFromAPI: state.hasFetchedFromAPI
			})
		}
	)
);