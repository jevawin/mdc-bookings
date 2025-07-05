import type { EntryContext } from 'react-router';

import { ServerRouter } from 'react-router';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	routerContext: EntryContext,
	// _loadContext: AppLoadContext,
): Promise<Response> {
	let shellRendered = false;
	const userAgent = request.headers.get('user-agent');

	const body = await renderToReadableStream(
		<ServerRouter context={routerContext} url={request.url} />,
		{
			onError(error: unknown) {
				responseStatusCode = 500;
				// Log streaming rendering errors from inside the shell.  Don't log
				// errors encountered during initial shell rendering since they'll
				// reject and get logged in handleDocumentRequest.
				if (shellRendered) {
					console.error(error);
				}
			},
		},
	);
	shellRendered = true;

	// Ensure requests from bots and SPA Mode renders wait for all content to load before responding
	// https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
	if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
		await body.allReady;
	}

	// Set headers
	responseHeaders.set('Content-Type', 'text/html');
	if (process.env.NODE_ENV === 'development') {
		console.log('Setting no cache headers');
		responseHeaders.set(
			'Cache-Control',
			'no-store, no-cache, must-revalidate, max-age=0',
		);
		responseHeaders.set('Pragma', 'no-cache');
		responseHeaders.set('Expires', ' 0');
	}

	console.error({ error: 'yes' });

	return new Response(body, {
		headers: responseHeaders,
		status: responseStatusCode,
	});
}
