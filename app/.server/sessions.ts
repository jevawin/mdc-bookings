import { createCookieSessionStorage } from 'react-router';

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage({
		cookie: {
			name: '__session',
			secure: true,
			secrets: ['your-secret'],
			sameSite: 'lax',
			path: '/',
			httpOnly: true,
		},
	});

export { getSession, commitSession, destroySession };
