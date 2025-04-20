import type { TMenu } from './menu.tsx';

export const mockMenuData: TMenu = {
	items: [
		{
			icon: 'cross',
			label: 'Home',
			href: '/',
			selected: true,
		},
		{
			icon: 'pencil',
			label: 'Search',
			href: '/search',
		},
		{
			icon: 'warning',
			label: 'Settings',
			href: '/settings',
		},
	],
};
