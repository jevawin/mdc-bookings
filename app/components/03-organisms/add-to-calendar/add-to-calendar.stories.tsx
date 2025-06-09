import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockAddToCalendarData } from './add-to-calendar.mock.ts';

import { AddToCalendar as AddToCalendarComponent } from './add-to-calendar.tsx';

const meta: Meta<typeof AddToCalendarComponent> = {
	title: '03-organisms/Add to calendar',
	component: AddToCalendarComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AddToCalendarComponent>;

export const AddToCalendar: Story = {
	args: mockAddToCalendarData,
};
