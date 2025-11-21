import type { Preview } from '@storybook/react-vite';

import '../app/styles/font-face.css';
import '../app/styles/globals.css';
import '../app/styles/storybook.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: 'centered',
		options: {
			storySort: {
				order: [
					'01-atoms',
					'02-molecules',
					'03-organisms',
					'04-layouts',
					'05-templates',
				],
			},
		},
		viewport: {
			options: {
				iPhoneSE: {
					name: 'iPhone SE',
					styles: {
						width: '375px',
						height: '667px',
					},
				},
				iPhone14Plus: {
					name: 'iPhone 14 Plus',
					styles: {
						width: '428px',
						height: '926px',
					},
				},
				nexus7: {
					name: 'Nexus 7',
					styles: {
						width: '600px',
						height: '960px',
					},
				},
				ipadMini: {
					name: 'iPad Mini',
					styles: {
						width: '768px',
						height: '1024px',
					},
				},
				ipadPro: {
					name: 'iPad Pro (11-inch)',
					styles: {
						width: '1024px',
						height: '1366px',
					},
				},
				laptopS: {
					name: 'Laptop-S',
					styles: {
						width: '1280px',
						height: '800px',
					},
				},
				macBookPro: {
					name: 'MacBook Pro (15.4-inch)',
					styles: {
						width: '1440px',
						height: '900px',
					},
				},
				desktopHIDPI: {
					name: 'Desktop HIDPI',
					styles: {
						width: '1920px',
						height: '1080px',
					},
				},
			},
		},
	},
};

export default preview;
