import type { Route } from './+types/verify';

import { verifySignUp } from '~/services/supabase.ts';

import { Authentication } from '~/components/04-layouts/authentication/authentication.tsx';
import { RegistrationTemplate } from '~/components/05-templates/registration-template/registration-template.tsx';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Registration verification' },
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
	const successTitle = isSuccess ? 'succesful' : 'unsuccesful';

	return (
		<>
			<Authentication.Header
				title={`Email verification ${successTitle}`}
			/>

			<RegistrationTemplate.Verification isSuccess={isSuccess} />
		</>
	);
}
