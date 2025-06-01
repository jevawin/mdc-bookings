---
to: "app/routes/<%= name.split('/').map(p => h.changeCase.paramCase(p)).join('/') %>.tsx"
---
import type { Route } from './+types/<%= h.changeCase.paramCase(name.split('/').slice(-1)[0]) %>';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'TITLE OF YOUR ROUTE' },
		{
			name: 'description',
			content: 'DESCRIPTION OF YOUR ROUTE.',
		},
	];
}

export const loader = async (data: Route.LoaderArgs) => {
	return data;
};

export default function <%= h.inflection.camelize(h.changeCase.camelCase(name.split('/').slice(-1)[0])) %>(data: Route.ComponentProps) {
	console.log(data, 'data');
	
	return (
		<>
			Add your components here
		</>
	);
};
