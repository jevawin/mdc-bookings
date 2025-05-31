import type { Route } from './+types/confirmation';

import { Authentication } from '~/components/04-layouts/authentication/authentication';
import { RegistrationTemplate } from '~/components/05-templates/registration-template/registration-template';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Confirmation' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Confirmation({ loaderData }: Route.ComponentProps) {
	console.log(loaderData, 'loaderData');

	return (
		<>
			<Authentication.Header title="Thank you for your registration" />

			<RegistrationTemplate.Complete />
		</>
	);
}
