import type { TMenu } from './menu.tsx';

export const mockMenuData: TMenu = {
	items: [
		{
			icon: 'list',
			label: 'Open',
			href: '/jobs/open',
		},
		{
			icon: 'clipboard-check',
			label: 'Applied',
			href: '/jobs/applied',
		},
		{
			icon: 'calendar-plus',
			label: 'Approved',
			href: '/jobs/approved',
		},
	],
};
