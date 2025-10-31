import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacterDetailStore } from '../../store/character-detail-store.ts';
import { dateUtils } from '../../utils/dateUtils.ts';

export const CharacterDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { character, loading, error, fetchCharacterDetail } = useCharacterDetailStore();
	
	useEffect(() => {
		if (id) {
			const characterId = parseInt(id, 10);
			if (!isNaN(characterId)) {
				void fetchCharacterDetail(characterId);
			}
		}
	}, [id, fetchCharacterDetail]);
	
	const handleBack = () => {
		navigate('/');
	};
	
	const handleLocationClick = () => {
		if (character?.location.url) {
			console.log('Navigate to location:', character.location.url);
		}
	};
	
	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'alive': return 'bg-green-500';
			case 'dead': return 'bg-red-500';
			default: return 'bg-gray-500';
		}
	};
	
	const getGenderIcon = (gender: string) => {
		switch (gender.toLowerCase()) {
			case 'male': return '♂';
			case 'female': return '♀';
			case 'genderless': return '⚧';
			default: return '?';
		}
	};
	
	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
				<div className="container mx-auto px-4">
					<div className="animate-pulse">
						<div className="h-8 w-48 bg-gray-300 rounded mb-8"></div>
						<div className="grid md:grid-cols-2 gap-8">
							<div className="h-96 bg-gray-300 rounded-2xl"></div>
							<div className="space-y-6">
								<div className="h-10 bg-gray-300 rounded w-3/4"></div>
								<div className="space-y-3">
									<div className="h-4 bg-gray-300 rounded w-1/2"></div>
									<div className="h-4 bg-gray-300 rounded w-2/3"></div>
									<div className="h-4 bg-gray-300 rounded w-3/4"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
				<div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4">
					<div className="text-6xl mb-4">😵</div>
					<h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h1>
					<p className="text-gray-600 mb-6">{error}</p>
					<button
						onClick={handleBack}
						className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
					>
						Back to Characters
					</button>
				</div>
			</div>
		);
	}
	
	if (!character) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
				<div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4">
					<div className="text-6xl mb-4">🔍</div>
					<h1 className="text-2xl font-bold text-gray-800 mb-4">Character Not Found</h1>
					<p className="text-gray-600 mb-6">The character you're looking for doesn't exist.</p>
					<button
						onClick={handleBack}
						className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
					>
						Back to Characters
					</button>
				</div>
			</div>
		);
	}
	
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between mb-8">
					<button
						onClick={handleBack}
						className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-white text-gray-700 hover:text-gray-900 border border-gray-200"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						<span className="font-semibold">Back to Characters</span>
					</button>
					
					<div className="text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
						Created {dateUtils.formatDate((character.created))}
					</div>
				</div>
				
				<div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
					<div className="grid md:grid-cols-2 gap-0">
						<div className="relative">
							<img
								src={character.image}
								alt={character.name}
								className="w-full h-96 md:h-full object-cover"
							/>
							
							<div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/70 text-white px-3 py-2 rounded-full backdrop-blur-sm">
								<div className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`}></div>
								<span className="font-semibold text-sm">{character.status}</span>
							</div>
							
							<div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-full backdrop-blur-sm">
								<span className="font-semibold text-sm">{getGenderIcon(character.gender)} {character.gender}</span>
							</div>
						</div>
						
						<div className="p-8">
							<div className="space-y-6">
								<div>
									<h1 className="text-4xl font-bold text-gray-900 mb-2">{character.name}</h1>
									<div className="flex items-center space-x-2">
										<span className="text-xl text-gray-600">{character.species}</span>
										{character.type && (
											<>
												<span className="text-gray-400">•</span>
												<span className="text-lg text-gray-500">{character.type}</span>
											</>
										)}
									</div>
								</div>
								
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="bg-gray-50 rounded-xl p-4">
										<div className="flex items-center space-x-2 mb-2">
											<svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
											<span className="font-semibold text-gray-700">Origin</span>
										</div>
										<p className="text-gray-900 font-medium">{character.origin.name}</p>
									</div>
									
									<div
										className={`bg-gray-50 rounded-xl p-4 cursor-pointer transition-all hover:bg-blue-50 hover:shadow-md ${
											character.location.url ? 'hover:border-blue-200' : ''
										}`}
										onClick={handleLocationClick}
									>
										<div className="flex items-center space-x-2 mb-2">
											<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
											</svg>
											<span className="font-semibold text-gray-700">Location</span>
										</div>
										<p className="text-gray-900 font-medium">{character.location.name}</p>
										{character.location.url && (
											<p className="text-blue-500 text-sm mt-1">Click for details →</p>
										)}
									</div>
								</div>
								
								<div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6">
									<h3 className="font-semibold text-gray-800 mb-4">Character Details</h3>
									<div className="space-y-3">
										<div className="flex justify-between items-center py-2 border-b border-gray-200">
											<span className="text-gray-600">ID</span>
											<span className="font-mono text-gray-900 bg-white px-2 py-1 rounded">#{character.id}</span>
										</div>
										<div className="flex justify-between items-center py-2 border-b border-gray-200">
											<span className="text-gray-600">Episodes</span>
											<span className="font-semibold text-gray-900">{character.episode.length}</span>
										</div>
										<div className="flex justify-between items-center py-2">
											<span className="text-gray-600">Created</span>
											<span className="text-sm text-gray-700">{dateUtils.formatDate(character.created)}</span>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};