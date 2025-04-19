---
to: "app/routes/<%= h.changeCase.paramCase(name) %>.tsx"
---
import type { Route } from "./+types/<%= h.changeCase.paramCase(name) %>";

export const loader = async (data: Route.LoaderArgs) => {
	return data;
};

export default function <%= h.inflection.camelize(h.changeCase.camelCase(name)) %> (data: Route.ComponentProps) {
	return (
		<>
			Add your components here
		</>
	);
};

