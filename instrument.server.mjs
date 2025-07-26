import * as Sentry from '@sentry/react-router';

Sentry.init({
	dsn: process.env.SENTRY_DSN_URL,

	// Adds request headers and IP for users, for more info visit:
	// https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
	sendDefaultPii: true,
});
