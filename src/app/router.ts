import { createBrowserRouter, redirect } from "react-router-dom";
import App from './App.tsx';
import { ROUTES } from '../types/routes.ts';
import Products from '../pages/Products.tsx';
import ProductOne from '../pages/ProductOne.tsx';
import CreateForm from '../pages/CreateForm.tsx';

export const router = createBrowserRouter([
	{
		Component: App,
		children: [
			{
				path: ROUTES.PRODUCTS,
				Component: Products,
			},
			{
				path: ROUTES.PRODUCT,
				Component: ProductOne,
			},
			{
				path: ROUTES.CREATE,
				Component: CreateForm,
			},
			{
				path: ROUTES.HOME,
				loader: () => redirect(ROUTES.PRODUCTS),
			}
		],
	},
]);
