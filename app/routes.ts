import type { RouteConfig } from '@react-router/dev/routes';

import { index, layout, prefix, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),

	route('log-out', 'routes/log-out.tsx'),
	route('book-interpreter', 'routes/book-interpreter.tsx'),

	layout('components/04-layouts/account/account.tsx', [
		route('account', 'routes/account.tsx'),
	]),

	layout('components/04-layouts/authentication/authentication.tsx', [
		route('log-in', 'routes/log-in.tsx'),

		...prefix('reset-password', [
			index('routes/reset-password/home.tsx'),
			route('confirmation', 'routes/reset-password/confirmation.tsx'),
			route('new', 'routes/reset-password/new.tsx'),
		]),

		...prefix('registration', [
			index('routes/registration/home.tsx'),
			route('confirmation', 'routes/registration/confirmation.tsx'),
		]),
	]),

	...prefix('jobs', [
		layout('components/04-layouts/jobs/jobs.tsx', [
			route('open', 'routes/jobs/open.tsx'),
			route('applied', 'routes/jobs/applied.tsx'),
			route('approved', 'routes/jobs/approved.tsx'),
		]),
	]),

	...prefix('auth', [route('callback', 'routes/auth/callback.tsx')]),

	...prefix('api', [
		route('apply', 'routes/api/apply.tsx'),
		route('revoke', 'routes/api/revoke.tsx'),
	]),
] satisfies RouteConfig;
