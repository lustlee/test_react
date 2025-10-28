import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { CharacterFormErrors, CreateCharacterData } from '../../types/character.types.ts';
import { useCharactersStore } from '../../store/characters-store.ts';
import { hasErrors, validateCharacterForm } from '../../utils/validation.ts';

export const CreateCharacterPage: React.FC = () => {
	const navigate = useNavigate();
	const { createCharacter, loading } = useCharactersStore();
	
	const [formData, setFormData] = useState<CreateCharacterData>({
		name: '',
		status: 'Alive',
		species: 'Human',
		type: '',
		gender: 'Male',
		origin: 'Earth',
		location: 'Earth',
		image: ''
	});
	
	const [errors, setErrors] = useState<CharacterFormErrors>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	
	const handleInputChange = (field: keyof CreateCharacterData, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}));
		
		if (errors[field]) {
			setErrors(prev => ({
				...prev,
				[field]: undefined
			}));
		}
	};
	
	const handleBlur = (field: keyof CreateCharacterData) => {
		setTouched(prev => ({
			...prev,
			[field]: true
		}));
		
		const fieldErrors = validateCharacterForm({ ...formData });
		setErrors(prev => ({
			...prev,
			[field]: fieldErrors[field]
		}));
	};
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		const validationErrors = validateCharacterForm(formData);
		setErrors(validationErrors);
		
		if (hasErrors(validationErrors)) {
			setTouched({
				name: true, status: true, species: true, type: true,
				gender: true, origin: true, location: true, image: true
			});
			return;
		}
		
		try {
			await createCharacter(formData);
			navigate('/');
		} catch (error) {
			console.error('Failed to create character:', error);
		}
	};
	
	const handleReset = () => {
		setFormData({
			name: '',
			status: 'Alive',
			species: 'Human',
			type: '',
			gender: 'Male',
			origin: 'Earth',
			location: 'Earth',
			image: ''
		});
		setErrors({});
		setTouched({});
	};
	
	const getInputClassName = (field: keyof CreateCharacterData) => {
		const hasError = touched[field] && errors[field];
		return `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
			hasError
				? 'border-red-500 focus:ring-red-200 bg-red-50'
				: 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
		}`;
	};
	
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
			<div className="container mx-auto px-4 max-w-2xl">
				<div className="flex items-center justify-between mb-8">
					<Link
						to="/"
						className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-white text-gray-700 hover:text-gray-900 border border-gray-200"
					>
						<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
					</Link>
					
					<h1 className="text-2xl font-bold text-gray-900">Create New Character</h1>
				</div>
				
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
								Character Name *
							</label>
							<input
								type="text"
								id="name"
								value={formData.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
								onBlur={() => handleBlur('name')}
								className={getInputClassName('name')}
								placeholder="Enter character name..."
							/>
							{touched.name && errors.name && (
								<p className="mt-1 text-sm text-red-600">{errors.name}</p>
							)}
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
									Status *
								</label>
								<select
									id="status"
									value={formData.status}
									onChange={(e) => handleInputChange('status', e.target.value)}
									onBlur={() => handleBlur('status')}
									className={getInputClassName('status')}
								>
									<option value="Alive">Alive</option>
									<option value="Dead">Dead</option>
									<option value="unknown">Unknown</option>
								</select>
								{touched.status && errors.status && (
									<p className="mt-1 text-sm text-red-600">{errors.status}</p>
								)}
							</div>
							
							<div>
								<label htmlFor="species" className="block text-sm font-semibold text-gray-700 mb-2">
									Species *
								</label>
								<input
									type="text"
									id="species"
									value={formData.species}
									onChange={(e) => handleInputChange('species', e.target.value)}
									onBlur={() => handleBlur('species')}
									className={getInputClassName('species')}
									placeholder="Human, Alien, Robot..."
								/>
								{touched.species && errors.species && (
									<p className="mt-1 text-sm text-red-600">{errors.species}</p>
								)}
							</div>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
									Gender *
								</label>
								<select
									id="gender"
									value={formData.gender}
									onChange={(e) => handleInputChange('gender', e.target.value)}
									onBlur={() => handleBlur('gender')}
									className={getInputClassName('gender')}
								>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Genderless">Genderless</option>
									<option value="unknown">Unknown</option>
								</select>
								{touched.gender && errors.gender && (
									<p className="mt-1 text-sm text-red-600">{errors.gender}</p>
								)}
							</div>
							
							<div>
								<label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
									Type
								</label>
								<input
									type="text"
									id="type"
									value={formData.type}
									onChange={(e) => handleInputChange('type', e.target.value)}
									onBlur={() => handleBlur('type')}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
									placeholder="Genetic experiment, Superhuman..."
								/>
							</div>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="origin" className="block text-sm font-semibold text-gray-700 mb-2">
									Origin *
								</label>
								<input
									type="text"
									id="origin"
									value={formData.origin}
									onChange={(e) => handleInputChange('origin', e.target.value)}
									onBlur={() => handleBlur('origin')}
									className={getInputClassName('origin')}
									placeholder="Earth, Mars, Unknown dimension..."
								/>
								{touched.origin && errors.origin && (
									<p className="mt-1 text-sm text-red-600">{errors.origin}</p>
								)}
							</div>
							
							<div>
								<label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
									Current Location *
								</label>
								<input
									type="text"
									id="location"
									value={formData.location}
									onChange={(e) => handleInputChange('location', e.target.value)}
									onBlur={() => handleBlur('location')}
									className={getInputClassName('location')}
									placeholder="Citadel of Ricks, Earth..."
								/>
								{touched.location && errors.location && (
									<p className="mt-1 text-sm text-red-600">{errors.location}</p>
								)}
							</div>
						</div>
						
						<div>
							<label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
								Character Image URL *
							</label>
							<input
								type="url"
								id="image"
								value={formData.image}
								onChange={(e) => handleInputChange('image', e.target.value)}
								onBlur={() => handleBlur('image')}
								className={getInputClassName('image')}
								placeholder="https://example.com/character-image.jpg"
							/>
							{touched.image && errors.image && (
								<p className="mt-1 text-sm text-red-600">{errors.image}</p>
							)}
							
							{formData.image && !errors.image && (
								<div className="mt-3">
									<p className="text-sm text-gray-600 mb-2">Image Preview:</p>
									<div className="w-32 h-32 border rounded-lg overflow-hidden">
										<img
											src={formData.image}
											alt="Preview"
											className="w-full h-full object-cover"
											onError={(e) => {
												e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+URL';
											}}
										/>
									</div>
								</div>
							)}
						</div>
						
						<div className="flex space-x-4 pt-6">
							<button
								type="button"
								onClick={handleReset}
								className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
								disabled={loading}
							>
								Reset Form
							</button>
							
							<button
								type="submit"
								disabled={loading}
								className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors font-semibold flex items-center justify-center space-x-2"
							>
								{loading ? (
									<>
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										<span>Creating...</span>
									</>
								) : (
									<span>Create Character</span>
								)}
							</button>
						</div>
					</form>
				</div>
				
				<div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
					<div className="flex items-start space-x-3">
						<div className="text-blue-500 mt-1">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div>
							<h3 className="font-semibold text-blue-800 mb-2">Creating a New Character</h3>
							<p className="text-blue-700 text-sm">
								Fill out the form to create a new Rick and Morty character. All fields marked with * are required.
								The character will be added to your local storage and appear in the characters list.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};