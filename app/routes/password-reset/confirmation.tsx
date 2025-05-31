import type { Route } from './+types/confirmation';

export const loader = async (data: Route.LoaderArgs) => {
	return data;
};

export default function Confirmation(data: Route.ComponentProps) {
	console.log(data, 'data');

	return <>Add your components here</>;
}
