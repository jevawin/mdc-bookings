import type { Route } from './+types/password-reset';

import { getSession } from '~/sessions.server.ts';

export const loader = async ({
	context,
	request,
}: Route.LoaderArgs): Promise<Response | undefined> => {
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');

	if (token) {
		return new Response(null, {
			status: 301,
			headers: {
				Location: '/jobs/open',
			},
		});
	}
};

export default function PasswordReset({ actionData }: Route.ComponentProps) {
	return <p>Reset password</p>;
}
