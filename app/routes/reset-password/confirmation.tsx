import type { Route } from './+types/confirmation.ts';

import { Authentication } from '~/components/04-layouts/authentication/authentication.tsx';
import { ResetPasswordTemplate } from '~/components/05-templates/reset-password-template/reset-password-template.tsx';

export default function Confirmation(): React.ReactNode {
	return (
		<>
			<title>Confirmation | Manchester Deaf Centre booking system</title>
			<meta
				name="description"
				content="Your password has been successfully reset."
			/>

			<Authentication.Header title="Reset password" />

			<ResetPasswordTemplate.Complete />
		</>
	);
}
