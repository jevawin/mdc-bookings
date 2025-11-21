import { Authentication } from '~/components/04-layouts/authentication/authentication.tsx';
import { RegistrationTemplate } from '~/components/05-templates/registration-template/registration-template.tsx';

export default function Confirmation(): React.ReactNode {
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
