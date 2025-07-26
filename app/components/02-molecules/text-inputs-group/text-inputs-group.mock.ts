import type { TTextInputsGroup } from './text-inputs-group.tsx';

export const mockTextInputsGroupData: TTextInputsGroup = {
	label: 'Where is the appointment?',
	description: 'Something something something description',
	isRequired: true,
	dataSharing: true,
	items: [
		{
			id: 'address_1',
			label: 'Address line 1',
		},
		{
			id: 'address_2',
			label: 'Address line 2',
			isRequired: false,
		},
	],
};
