import type { Route } from './+types/book-interpreter.tsx';

import { BookInterpreterTemplate } from '~/components/05-templates/book-interpreter-template/book-interpreter-template.tsx';

type TBookeInterpreterData = {
	message: string;
};

export const loader = async ({
	context,
}: Route.LoaderArgs): Promise<TBookeInterpreterData> => {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
};

export default function BookInterpreter({
	actionData,
	loaderData,
}: Route.ComponentProps): React.ReactNode {
	console.log(actionData, 'actionData');
	console.log(loaderData, 'loaderData');

	return (
		<>
			<title>Book an interpreter</title>
			<meta
				name="description"
				content="Book a Manchester Deaf Centre interpreter here."
			/>

			<BookInterpreterTemplate />
		</>
	);
}
