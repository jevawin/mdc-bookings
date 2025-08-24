import type { Route } from './+types/confirmation.ts';

import { Authentication } from '~/components/04-layouts/authentication/authentication.tsx';
import { RegistrationTemplate } from '~/components/05-templates/registration-template/registration-template.tsx';

type TRegistrationConfirmationData = {
	message: string;
};

export function loader({
	context,
}: Route.LoaderArgs): TRegistrationConfirmationData {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Confirmation({
	loaderData,
}: Route.ComponentProps): React.ReactNode {
	console.log(loaderData, 'loaderData');

	return (
		<>
			<title>Confirmation | Manchester Deaf Centre booking system</title>
			<meta
				name="description"
				content="Your registration has been successfully submitted."
			/>

			<Authentication.Header title="Thank you for your registration" />

			<RegistrationTemplate.Complete />
		</>
	);
}
