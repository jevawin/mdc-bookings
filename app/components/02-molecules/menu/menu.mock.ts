import type { TMenu } from './menu.tsx';

export const mockMenuData: TMenu = {
	items: [
		{
			icon: 'calendar-down',
			label: 'Open',
			href: '/jobs/open',
		},
		{
			icon: 'calendar-plus',
			label: 'Applied',
			href: '/jobs/applied',
		},
		{
			icon: 'calendar-tick',
			label: 'Approved',
			href: '/jobs/approved',
		},
	],
};
