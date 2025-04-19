import type { TTextInput } from './text-input.tsx';

export const mockTextInputData: TTextInput = {
	id: 'name',
	label: 'Full name',
	type: 'text',
	autoComplete: 'name',
	inputMode: 'text',
	isInvalid: false,
	isRequired: true,
	validationMessage: 'Please enter a valid first name',
};
