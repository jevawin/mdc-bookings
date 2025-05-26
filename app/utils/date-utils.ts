import type { CalendarEvent } from 'calendar-link';
import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';

import { google, outlook, office365, ics } from 'calendar-link';

export const addDurationToDateTime = (startTime: Date, durarion: string) => {
	// Parse duration like "2h30m"
	const match = durarion.match(/(?:(\d+)h)?(?:(\d+)m)?/);

	if (!match) return null;

	const hours = parseInt(match[1] ?? 0, 10);
	const minutes = parseInt(match[2] ?? 0, 10);

	// Parse base date in UTC
	const date = new Date(startTime);

	date.setUTCHours(date.getUTCHours() + hours);
	date.setUTCMinutes(date.getUTCMinutes() + minutes);

	// Format the final date as "YYYY-MM-DD HH:mm:ss +0000"
	const pad = (n: number) => String(n).padStart(2, '0');

	const year = date.getUTCFullYear();
	const month = pad(date.getUTCMonth() + 1);
	const day = pad(date.getUTCDate());

	const hour = pad(date.getUTCHours());
	const minute = pad(date.getUTCMinutes());
	const second = pad(date.getUTCSeconds());

	return `${year}-${month}-${day} ${hour}:${minute}:${second} +0000`;
};

type TAddToCalendarItem = {
	name: string;
	icon: TIconName;
	url: string;
};

export const getAddToCalendarData = (
	event: CalendarEvent,
): TAddToCalendarItem[] => {
	const items = [
		{
			name: 'Apple (iCal)',
			icon: 'apple',
			url: ics(event),
		},
		{
			name: 'Google',
			icon: 'google',
			url: google(event),
		},
		{
			name: 'Office 365',
			icon: 'ms-office',
			url: office365(event),
		},
		{
			name: 'Outlook',
			icon: 'outlook',
			url: outlook(event),
		},
	] satisfies TAddToCalendarItem[];

	return items;
};
