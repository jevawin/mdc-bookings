import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	// Resolve custom mode based on Cloudflare environment variables
	let resolvedMode = mode;
	console.log(process?.env?.CF_PAGES_BRANCH || 'NO ENV VARS FROM CLOUDFLARE');
	if (
		typeof process !== 'undefined' &&
		process.env &&
		process.env.CF_PAGES_BRANCH &&
		process.env.CF_PAGES_BRANCH !== 'main'
	) {
		resolvedMode = 'development';
	}
	// Load environment variables for the resolved mode
	process.env.NOVE_ENV = resolvedMode;
	process.env.CLOUDFLARE_ENV = resolvedMode;

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
			tsconfigPaths(),
		],
	};
});
