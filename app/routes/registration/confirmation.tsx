import type { Route } from './+types/confirmation';

import { RegistrationCompleteTemplate } from '~/components/05-templates/registration-complete-template/registration-complete-template.tsx';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Confirmation' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	console.log(loaderData, 'loaderData');

	return <RegistrationCompleteTemplate />;
}
