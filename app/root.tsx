import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';

import styles from './styles/globals.css?url';
import fontFace from './styles/font-face.css?url';

export const links: Route.LinksFunction = () => [
	{
		rel: 'preload',
		href: styles,
		as: 'style',
	},
	{
		rel: 'preload',
		href: fontFace,
		as: 'style',
	},
	{
		rel: 'preload',
		href: '/assets/fonts/avenir-next-variable.woff2',
		as: 'font',
		type: 'font/woff2',
		crossOrigin: 'anonymous',
	},
	{ rel: 'stylesheet', href: fontFace },
	{ rel: 'stylesheet', href: styles },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,minimum-scale=1,user-scalable=yes,initial-scale=1,viewport-fit=cover"
				/>
				<Meta />
				<Links />
			</head>

			<body>
				{children}

				<ScrollRestoration />

				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Oops!';
	let details = 'An unexpected error occurred.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details =
			error.status === 404
				? 'The requested page could not be found.'
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
