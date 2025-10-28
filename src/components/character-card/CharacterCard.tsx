import React from 'react';
import type { CharacterWithLike } from '../../types/character.types.ts';
import { Link } from 'react-router-dom';
import { dateUtils } from '../../utils/dateUtils.ts';

interface CharacterCardProps {
	character: CharacterWithLike;
	onToggleLike: (id: number) => void;
	onDelete: (id: number) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
	character,
	onToggleLike,
	onDelete
}) => {
	const truncateDescription = (text: string, maxLength: number = 60) => {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	};
	
	const handleCardClick = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).closest('.action-button')) {
			e.preventDefault();
			e.stopPropagation();
		}
	};
	
	return (
		<Link to={`/character-page/${character.id}`}>
			<div
				className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 h-80 flex flex-col cursor-pointer border border-gray-200"
				onClick={handleCardClick}
			>
				<div className="relative h-40 mb-3">
					<img
						src={character.image}
						alt={character.name}
						className="w-full h-full object-cover rounded-md"
					/>
					
					<div className="absolute top-2 right-2 flex space-x-2">
						<button
							className={`action-button p-2 rounded-full transition-colors ${
								character.isLiked
									? 'bg-red-100 text-red-500'
									: 'bg-white text-gray-400 hover:text-red-500'
							}`}
							onClick={(e) => {
								e.preventDefault();
								onToggleLike(character.id);
							}}
						>
							<svg
								className="w-5 h-5"
								fill={character.isLiked ? "currentColor" : "none"}
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</button>
						
						<button
							className="action-button p-2 bg-white text-gray-400 rounded-full hover:text-red-600 transition-colors"
							onClick={(e) => {
								e.preventDefault();
								onDelete(character.id);
							}}
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</div>
				</div>
				
				<div className="flex-1 flex flex-col">
					<h3 className="font-semibold text-lg mb-2 line-clamp-2">{character.name}</h3>
					
					<p className="text-gray-600 text-sm mb-3 flex-1">
						{truncateDescription(character.episode.join(', '))}
					</p>
					
					<div className="flex justify-between items-center mt-auto">
						<div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">
                {character.species}
              </span>
						</div>
						
						<div className="flex items-center space-x-1">
							<svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
							</svg>
							<span className="text-sm text-gray-600">{dateUtils.formatDate(character.created)}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};