import netlify from '@netlify/vite-plugin';
import netlifyReactRouter from '@netlify/vite-plugin-react-router';
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
	return {
		plugins: [
			reactRouter(),
			tsconfigPaths(),
			netlifyReactRouter(),
			netlify(),
		],
	};
});
