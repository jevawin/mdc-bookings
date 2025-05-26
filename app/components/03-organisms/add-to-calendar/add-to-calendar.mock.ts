import type { TAddToCalendar } from './add-to-calendar.tsx';

export const mockAddToCalendarData: TAddToCalendar = {
	isDisabled: false,
	items: [
		{
			name: 'Google',
			url: 'https://www.google.com/calendar/render?action=TEMPLATE&text=Event+Title&dates=20231001T120000Z/20231001T130000Z&details=Event+Details&location=Event+Location',
			icon: 'google',
		},
		{
			name: 'Apple (iCal)',
			url: 'https://calendar.apple.com/event?title=Event+Title&start=20231001T120000Z&end=20231001T130000Z&details=Event+Details&location=Event+Location',
			icon: 'apple',
		},
	],
};
