import type { Route } from './+types/confirmation.ts';

import { Authentication } from '~/components/04-layouts/authentication/authentication.tsx';
import { ResetPasswordTemplate } from '~/components/05-templates/reset-password-template/reset-password-template.tsx';

type TResetPassswordConfirmationData = {
	message: string;
};

export function loader({
	context,
}: Route.LoaderArgs): TResetPassswordConfirmationData {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Confirmation({
	loaderData,
}: Route.ComponentProps): React.ReactNode {
	console.log(loaderData, 'loaderData');

	return (
		<>
			<title>Confirmation</title>
			<meta name="description" content="DESCRIPTION OF YOUR ROUTE." />

			<Authentication.Header title="Reset password" />

			<ResetPasswordTemplate.Complete />
		</>
	);
}
