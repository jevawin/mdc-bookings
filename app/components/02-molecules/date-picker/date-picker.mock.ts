import type { TDatePicker } from './date-picker.tsx';

export const mockDatePickerData: TDatePicker = {
	id: 'appointment-date',
	label: 'When is the appointment?',
	hint: 'If you need an appointment within 24 hours, please call 0161 273 3415',
	name: 'appointment-date',
	validationMessage: 'Please provide an appointment date, 24+ hours from now',
};
