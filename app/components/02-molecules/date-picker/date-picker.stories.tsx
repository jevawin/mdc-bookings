import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockDatePickerData } from './date-picker.mock.ts';

import { DatePicker as DatePickerComponent } from './date-picker.tsx';

const meta: Meta<typeof DatePickerComponent> = {
	title: '02-molecules/Date picker',
	component: DatePickerComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DatePickerComponent>;

export const DatePicker: Story = {
	args: mockDatePickerData,
};
