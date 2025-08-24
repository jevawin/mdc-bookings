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
			maxAge: 60 * 60 * 24 * 7, // 1 week
		},
	});

export { getSession, commitSession, destroySession };
