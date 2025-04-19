import type { Route } from './+types/registration';

export const loader = async (data: Route.LoaderArgs) => {
	return data;
};

export default function Registration(data: Route.ComponentProps) {
	return <>Add your components here</>;
}
