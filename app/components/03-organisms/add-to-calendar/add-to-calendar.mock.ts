import type { TAddToCalendar } from './add-to-calendar.tsx';

export const mockAddToCalendarData: TAddToCalendar = {
	isDisabled: false,
	event: {
		title: 'My Event',
		description: 'This is a cool event.',
		start: '2025-06-01T10:00:00.000Z',
		end: '2025-06-01T12:00:00.000Z',
		location: 'Online',
	},
};
