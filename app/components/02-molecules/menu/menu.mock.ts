import type { TMenu } from './menu.tsx';

export const mockMenuData: TMenu = {
	items: [
		{
			icon: 'list',
			label: 'Open',
			href: '#',
			selected: true,
		},
		{
			icon: 'clipboard-check',
			label: 'Applied',
			href: '#',
		},
		{
			icon: 'calendar-plus',
			label: 'Approved',
			href: '#',
		},
	],
};
