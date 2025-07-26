import type { TSelectInputsGroup } from './select-inputs-group.tsx';

export const mockSelectInputsGroupData: TSelectInputsGroup = {
	label: 'When is the appointment?',
	description: 'This helps us to actually book your appointment.',
	isRequired: true,
	items: [
		{
			options: [
				{
					description: '',
					value: 0,
				},
				{
					description: '1',
					value: 1,
				},
				{
					description: '2',
					value: 2,
				},
				{
					description: '3',
					value: 3,
				},
			],
			label: 'Hours',
			labelPosition: 'bottom',
		},
		{
			options: [
				{
					description: '',
					value: 0,
				},
				{
					description: '1',
					value: 1,
				},
				{
					description: '2',
					value: 2,
				},
				{
					description: '3',
					value: 3,
				},
			],
			label: 'Minutes',
			labelPosition: 'bottom',
		},
	],
};
