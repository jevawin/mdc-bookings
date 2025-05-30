import type { RouteConfig } from '@react-router/dev/routes';

import { index, layout, prefix, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('log-out', 'routes/log-out.tsx'),

	layout('components/04-layouts/authentication/authentication.tsx', [
		route('log-in', 'routes/log-in.tsx'),

		...prefix('password-reset', [
			index('routes/password-reset/home.tsx'),
			route('confirmation', 'routes/password-reset/confirmation.tsx'),
		]),

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

	...prefix('api', [
		route('apply', 'routes/api/apply.tsx'),
		route('revoke', 'routes/api/revoke.tsx'),
	]),

	layout('components/04-layouts/account/account.tsx', [
		route('account', 'routes/account.tsx'),
	]),
] satisfies RouteConfig;
