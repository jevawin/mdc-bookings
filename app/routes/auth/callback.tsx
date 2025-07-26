import type { Route } from './+types/callback.ts';

import { redirect } from 'react-router';
import { verifyAuth } from '~/.server/services/supabase.ts';
import { commitSession, getSession } from '~/.server/sessions.ts';

export const loader = async ({
	context,
	request,
}: Route.LoaderArgs): Promise<Response> => {
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
			console.error('Supabase error:', response);

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
