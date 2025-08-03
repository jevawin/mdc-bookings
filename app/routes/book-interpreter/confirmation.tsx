import type { Route } from './+types/confirmation.ts';

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
			<title>Confirmation</title>
			<meta name="description" content="DESCRIPTION OF YOUR ROUTE." />
		</>
	);
}
