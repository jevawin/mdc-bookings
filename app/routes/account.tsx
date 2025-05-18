import { useOutletContext } from 'react-router';
import type { Route } from './+types/account';

type LayoutLoaderData = { name: string };

export default function Account(data: Route.ComponentProps) {
	const { name } = useOutletContext<LayoutLoaderData>();

	return (
		<>
			<p>{name}</p>
		</>
	);
}
