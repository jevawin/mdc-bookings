import type { RouteConfig } from '@react-router/dev/routes';

import { index, layout, prefix, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),

	...prefix('registration', [
		index('routes/registration/home.tsx'),
		route('confirmation', 'routes/registration/confirmation.tsx'),
		route('verify', 'routes/registration/verify.tsx'),
	]),
] satisfies RouteConfig;
