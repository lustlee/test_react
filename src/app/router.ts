import { createBrowserRouter, redirect } from "react-router-dom";
import App from './App.tsx';
import CharacterPage from '../pages/character-page/CharacterPage.tsx';
import CharacterOnePage from '../pages/CharacterOnePage.tsx';
import CreateCharacterPage from '../pages/CreateCharacterPage.tsx';
import { ROUTES } from "../config/constants.ts";

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
				Component: CharacterOnePage,
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
