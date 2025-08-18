import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	// Load environment variables for the given mode
	const env = loadEnv(mode, process.cwd(), '');

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
		define: {
			// Example: make env vars available in code
			'__APP_ENV__': JSON.stringify(env.APP_ENV),
			'process.env.NODE_ENV': JSON.stringify(mode),
		},
	};
});
