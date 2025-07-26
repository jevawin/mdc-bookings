import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	build: {
		outDir: 'build',
		manifest: true,
		ssrManifest: true,
	},
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
		cloudflare({ viteEnvironment: { name: 'server' } }),
		reactRouter(),
		tsconfigPaths(),
	],
});
