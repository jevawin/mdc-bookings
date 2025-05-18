import type { Route } from './+types/account';

export const loader = async (data: Route.LoaderArgs) => {
	return data;
};

export default function Account(data: Route.ComponentProps) {
	return <>Add your components here</>;
}
