import type { ApiResponse } from '../types/api-response.types.ts';
import apiClient from '../utils/axios.base.ts';
import type { CharacterWithLike } from '../types/character.types.ts';

export const getCharacters = {
	getAllCharacters: () =>
		apiClient.get<ApiResponse<CharacterWithLike>>(`/character`),
	
	getOneCharacter: (id: number) =>
		apiClient.get<CharacterWithLike>(`/character/${id}`),
	
};