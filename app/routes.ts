import type { RouteConfig } from '@react-router/dev/routes';

import { index, layout, prefix, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),

	layout('components/04-layouts/authentication/authentication.tsx', [
		route('log-in', 'routes/log-in.tsx'),

		...prefix('registration', [
			index('routes/registration/home.tsx'),
			route('confirmation', 'routes/registration/confirmation.tsx'),
			route('verify', 'routes/registration/verify.tsx'),
		]),
	]),

	...prefix('jobs', [
		layout('components/04-layouts/jobs/jobs.tsx', [
			route('open', 'routes/jobs/open.tsx'),
			route('applied', 'routes/jobs/applied.tsx'),
			route('approved', 'routes/jobs/approved.tsx'),
		]),
	]),
] satisfies RouteConfig;
