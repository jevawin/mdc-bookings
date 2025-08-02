import type { TFormInputsGroup } from './form-inputs-group.tsx';

export const mockFormInputsGroupData: TFormInputsGroup = {
	id: 'booking',
	title: 'Are you booking from either SIU or SFT?',
	hint: 'Choose "No" if you\'re unsure.',
	validationMessage: 'Please select an option',
	isDataShared: false,
	isInvalid: false,
	isRequired: true,
	type: 'radio',
	items: [
		{
			id: 'no',
			label: 'No',
			value: 'none',
			name: 'booking',
		},
		{
			id: 'siu',
			label: 'Stockport Interpreting Unit (SIU)',
			value: 'SIU',
			name: 'booking',
		},
		{
			id: 'sft',
			label: 'Stockport NHS Foundation Trust (SFT)',
			value: 'SFT',
			name: 'booking',
		},
	],
};
