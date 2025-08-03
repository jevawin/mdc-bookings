import type { TTextarea } from './textarea.tsx';

export const mockTextareaData: TTextarea = {
	id: 'textarea-1',
	label: 'Textarea Label',
	hint: 'This is an optional hint for the textarea.',
	isDataShared: false,
	isInvalid: false,
	isRequired: true,
	showRequired: true,
	validationMessage: 'Please fill out this field.',
};
