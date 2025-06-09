---
to: "app/routes/<%= name.split('/').map(p => h.changeCase.paramCase(p)).join('/') %>.tsx"
---
import type { Route } from './+types/<%= h.changeCase.paramCase(name.split('/').slice(-1)[0]) %>.ts';

export const loader = async (data: Route.LoaderArgs): Promise<Route.LoaderArgs>  => {
	return data;
};

export default function <%= h.inflection.camelize(h.changeCase.camelCase(name.split('/').slice(-1)[0])) %>(data: Route.ComponentProps): React.ReactNode {
	console.log(data, 'data');
	
	return (
		<>
			<title><%= name %></title>
			<meta name="description" content="DESCRIPTION OF YOUR ROUTE." />

			Add your components here
		</>
	);
};
