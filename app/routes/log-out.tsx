import type { Route } from './+types/log-out';

import { redirect } from 'react-router';
import { logOut } from '~/services/supabase.ts';
import { destroySession, getSession } from '~/sessions.server.ts';

export const loader = async ({ context, request }: Route.LoaderArgs) => {
	const env = context.cloudflare.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');

	// Log out
	const loggedOut = await logOut(env, token);

	if (loggedOut.success)
		return redirect('/log-in', {
			headers: {
				'Set-Cookie': await destroySession(session),
			},
		});

	return 'Error logging you out.';
};

export default function LogOut(data: Route.ComponentProps) {
	return (
		<>
			<p>{data.loaderData}</p>
		</>
	);
}
