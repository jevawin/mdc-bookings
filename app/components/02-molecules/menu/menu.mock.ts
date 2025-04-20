import type { TMenu } from './menu.tsx';

export const mockMenuData: TMenu = {
	items: [
		{
			icon: 'cross',
			label: 'Open',
			href: '#',
			selected: true,
		},
		{
			icon: 'pencil',
			label: 'Applied',
			href: '#',
		},
		{
			icon: 'warning',
			label: 'Approved',
			href: '#',
		},
	],
};
