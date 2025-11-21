import type { Route } from './+types/log-out.ts';

import { redirect } from 'react-router';
import { logOut } from '~/.server/services/supabase.ts';
import { destroySession, getSession } from '~/.server/sessions.ts';

export const loader = async ({
	request,
}: Route.LoaderArgs): Promise<Response | 'Error logging you out.'> => {
	const env = process.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');

	// Log out
	const loggedOut = await logOut(token);

	if (loggedOut.success)
		return redirect('/log-in', {
			headers: {
				'Set-Cookie': await destroySession(session),
			},
		});

	return 'Error logging you out.';
};

export default function LogOut(data: Route.ComponentProps): React.ReactNode {
	return (
		<>
			<p>{data.loaderData}</p>
		</>
	);
}
