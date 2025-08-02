import type { TSelect } from './select.tsx';

export const mockSelectData: TSelect = {
	id: 'select',
	label: 'Values',
	name: 'select',
	options: [
		{
			value: 1,
			description: 'One',
		},
		{
			value: 2,
			description: 'Two',
		},
		{
			value: 3,
			description: 'Three',
		},
		{
			value: 4,
			description: 'Something very long',
		},
	],
};
