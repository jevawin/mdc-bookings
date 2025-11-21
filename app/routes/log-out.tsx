import type { Route } from './+types/log-out.ts';

import { redirect } from 'react-router';
import { logOut } from '~/.server/services/supabase.ts';
import { destroySession, getSession } from '~/.server/sessions.ts';

export const loader = async ({
	request,
}: Route.LoaderArgs): Promise<Response> => {
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');

	try {
		// Attempt Supabase logout, but don’t block local session cleanup
		await logOut(token);
	} catch (error) {
		console.error('Supabase logout error:', error);
	}

	return redirect('/log-in', {
		headers: {
			'Set-Cookie': await destroySession(session),
		},
	});
};

export default function LogOut(data: Route.ComponentProps): React.ReactNode {
	return (
		<>
			<p>{data.loaderData}</p>
		</>
	);
}
