import type { TJob } from '~/global-types.ts';
import type { TAirtableJobFields } from '~/services/airtable.ts';

import {
	addDurationToDateTime,
	getAddToCalendarData,
} from '~/utils/date-utils.ts';

type TJobFields = Required<TAirtableJobFields> & {};

type TJobMapperData = {
	id: string;
	fields: TJobFields;
};

export const jobMapper = (data: TJobMapperData): TJob => {
	const id = data.fields['Request ID'];
	const date = data.fields['Appointment: date'];
	const duration = data.fields['Appointment: duration'];
	const location = data.fields['Airtable: friendly address'];
	const description = data.fields['Appointment: details'];
	const service = data.fields['Appointment: service'];
	const specialism = data.fields['Appointment: specialism'];

	const dateTimeStart = new Date(date);
	const dateTimeEnd = addDurationToDateTime(dateTimeStart, duration);
	const isPast = dateTimeStart ? dateTimeStart < new Date() : false;

	const displayDate = dateTimeStart.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	const displayTime = dateTimeStart.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
	});

	const event = {
		title: `MDC Interpreting: ${id}`,
		description,
		location,
		start: dateTimeStart,
		end: dateTimeEnd,
		organizer: {
			name: 'Manchester Deaf Centre',
			email: 'bookings@manchesterdeafcentre.com',
		},
	};

	return {
		id,
		record: data.id,
		service,
		specialism,
		dateTimeStart,
		dateTimeEnd,
		displayDate,
		displayTime,
		location,
		description,
		isPast,
		calendarItems: getAddToCalendarData(event),
	};
};
