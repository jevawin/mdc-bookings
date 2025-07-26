import type { SentryReactRouterBuildOptions } from '@sentry/react-router';

import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import { sentryReactRouter } from '@sentry/react-router';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const sentryConfig: SentryReactRouterBuildOptions = {
	org: 'alex-clapperton',
	project: 'manchester-deaf-centre',
	authToken: process.env.SENTRY_AUTH_TOKEN,
};

export default defineConfig((config) => {
	return {
		css: {
			postcss: {
				plugins: [
					autoprefixer(),
					postcssPresetEnv({
						browsers: 'last 2 versions',
						stage: 3,
						features: {
							'custom-properties': false,
							'nesting-rules': true,
						},
					}),
				],
			},
		},
		plugins: [
			cloudflare({ viteEnvironment: { name: 'ssr' } }),
			reactRouter(),
			sentryReactRouter(sentryConfig, config),
			tsconfigPaths(),
		],
	};
});
