import { createBrowserRouter, redirect } from "react-router-dom";
import App from './App.tsx';
import CharacterPage from '../pages/character-page/CharacterPage.tsx';
import { ROUTES } from "../config/constants.ts";
import {
	CharacterDetailPage
} from '../pages/character-detail-page/CharacterDetailPage.tsx';
import {
	CreateCharacterPage
} from '../pages/create-character-page/CreateCharacterPage.tsx';

export const router = createBrowserRouter([
	{
		Component: App,
		children: [
			{
				path: ROUTES.CHARACTERS,
				Component: CharacterPage,
			},
			{
				path: ROUTES.CHARACTER,
				Component: CharacterDetailPage,
			},
			{
				path: ROUTES.CREATE,
				Component: CreateCharacterPage,
			},
			{
				path: ROUTES.HOME,
				loader: () => redirect(ROUTES.CHARACTERS),
			}
		],
	},
]);
