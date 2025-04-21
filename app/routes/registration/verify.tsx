import type { Route } from './+types/verify';

import { verifySignUp } from '~/services/supabase.ts';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Registration verified' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export async function loader({ context, request }: Route.LoaderArgs) {
	const env = context.cloudflare.env;
	const searchParams = request.url.split('?')[1];
	const params = new URLSearchParams(searchParams);
	const token = params.get('token');
	const type = params.get('type');

	if (!token || !type) return { success: false };

	const response = await verifySignUp(token, type, env);

	return { success: response.success };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const isSuccess = loaderData.success;
	const successText = isSuccess ? 'succesful' : 'unsuccesful';

	return (
		<main>
			<h1>{`Verification ${successText}`}</h1>
		</main>
	);
}
