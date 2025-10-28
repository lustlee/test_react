import type { CharacterFormErrors, CreateCharacterData } from '../types/character.types.ts';

export const validateCharacterForm = (data: CreateCharacterData): CharacterFormErrors => {
	const errors: CharacterFormErrors = {};
	
	if (!data.name.trim()) {
		errors.name = 'Name is required';
	} else if (data.name.length < 2) {
		errors.name = 'Name must be at least 2 characters';
	} else if (data.name.length > 50) {
		errors.name = 'Name must be less than 50 characters';
	}
	
	if (!data.status) {
		errors.status = 'Status is required';
	}
	
	if (!data.species.trim()) {
		errors.species = 'Species is required';
	} else if (data.species.length < 2) {
		errors.species = 'Species must be at least 2 characters';
	}
	
	if (!data.gender) {
		errors.gender = 'Gender is required';
	}
	
	if (!data.origin.trim()) {
		errors.origin = 'Origin is required';
	}
	
	if (!data.location.trim()) {
		errors.location = 'Location is required';
	}
	
	if (!data.image.trim()) {
		errors.image = 'Image URL is required';
	} else if (!isValidUrl(data.image)) {
		errors.image = 'Please enter a valid URL';
	}
	
	return errors;
};

const isValidUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

export const hasErrors = (errors: CharacterFormErrors): boolean => {
	return Object.keys(errors).length > 0;
};