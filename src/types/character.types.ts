export interface Character {
	id: number;
	name: string;
	status: 'Alive' | 'Dead' | 'unknown';
	species: string;
	type: string;
	gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
}

export interface CharacterWithLike extends  Character {
	isLiked:boolean;
}

export interface CreateCharacterData {
	name: string;
	status: 'Alive' | 'Dead' | 'unknown';
	species: string;
	type: string;
	gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
	origin: string;
	location: string;
	image: string;
}

export interface CharacterFormErrors {
	name?: string;
	status?: string;
	species?: string;
	type?: string;
	gender?: string;
	origin?: string;
	location?: string;
	image?: string;
}