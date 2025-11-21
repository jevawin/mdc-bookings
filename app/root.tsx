import type { Route } from './+types/root.tsx';

import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router';

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
	{
		rel: 'icon',
		href: '/assets/favicons/favicon.svg',
		type: 'image/svg+xml',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '48x48',
		href: '/assets/favicons/dark/favicon-48x48.png',
		media: '(prefers-color-scheme: dark)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '72x72',
		href: '/assets/favicons/dark/favicon-72x72.png',
		media: '(prefers-color-scheme: dark)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '96x96',
		href: '/assets/favicons/dark/favicon-96x96.png',
		media: '(prefers-color-scheme: dark)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '128x128',
		href: '/assets/favicons/dark/favicon-128x128.png',
		media: '(prefers-color-scheme: dark)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '192x192',
		href: '/assets/favicons/dark/favicon-192x192.png',
		media: '(prefers-color-scheme: dark)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '512x512',
		href: '/assets/favicons/dark/favicon-512x512.png',
		media: '(prefers-color-scheme: dark)',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '180x180',
		href: '/assets/favicons/light/favicon-180x180.png',
		media: '(prefers-color-scheme: light)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '48x48',
		href: '/assets/favicons/light/favicon-48x48.png',
		media: '(prefers-color-scheme: light)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '72x72',
		href: '/assets/favicons/light/favicon-72x72.png',
		media: '(prefers-color-scheme: light)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '96x96',
		href: '/assets/favicons/light/favicon-96x96.png',
		media: '(prefers-color-scheme: light)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '128x128',
		href: '/assets/favicons/dark/favicon-128x128.png',
		media: '(prefers-color-scheme: dark)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '192x192',
		href: '/assets/favicons/light/favicon-192x192.png',
		media: '(prefers-color-scheme: light)',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '512x512',
		href: '/assets/favicons/light/favicon-512x512.png',
		media: '(prefers-color-scheme: light)',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '180x180',
		href: '/assets/favicons/light/favicon-180x180.png',
		media: '(prefers-color-scheme: light)',
	},
	{
		rel: 'manifest',
		href: '/site.webmanifest',
	},
	{ rel: 'stylesheet', href: fontFace },
	{ rel: 'stylesheet', href: styles },
];

export function Layout({
	children,
}: {
	children: React.ReactNode;
}): React.ReactNode {
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

export default function App(): React.ReactNode {
	return <Outlet />;
}

export function ErrorBoundary({
	error,
}: Route.ErrorBoundaryProps): React.ReactNode {
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
