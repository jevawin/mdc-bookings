import type { Route } from './+types/account';

import { useOutletContext } from 'react-router';

type LayoutLoaderData = { name: string };

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'My account' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Account(data: Route.ComponentProps) {
	const { name } = useOutletContext<LayoutLoaderData>();

	return (
		<>
			<p>{name}</p>
		</>
	);
}
