import type { Route } from './+types/callback';

import { redirect } from 'react-router';
import { verifyAuth } from '~/services/supabase';
import { commitSession, getSession } from '~/sessions.server';

export const loader = async ({ context, request }: Route.LoaderArgs) => {
	try {
		const env = context.cloudflare.env;
		const url = new URL(request.url);
		const params = url.searchParams;
		const token = params.get('token');
		const type = params.get('type');
		const isEmail = type === 'email';
		const isRecovery = type === 'recovery';

		if (!token || (!isEmail && !isRecovery)) {
			return redirect('/log-in');
		}

		const response = await verifyAuth(token, type, env);

		if (!response.success) {
			return redirect('/log-in?error=invalid_token');
		}

		const cookieHeader = request.headers.get('Cookie');
		const session = await getSession(cookieHeader);

		const access_token = response.data.access_token;
		const refresh_token = response.data.refresh_token;
		const expires_at = response.data.expires_at;
		const location = isEmail ? '/jobs/open' : '/reset-password/new';

		session.set('access_token', access_token);
		session.set('refresh_token', refresh_token);
		session.set('expires_at', expires_at);

		return redirect(location, {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	} catch (error) {
		console.error('Callback loader error:', error);

		return redirect('/log-in?error=callback_failed');
	}
};
