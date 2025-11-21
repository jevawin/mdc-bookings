import netlify from '@netlify/vite-plugin';
import netlifyReactRouter from '@netlify/vite-plugin-react-router';
import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
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
			reactRouter(),
			tsconfigPaths(),
			netlifyReactRouter(),
			netlify(),
		],
	};
});
