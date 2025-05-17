import type { TJobCard } from '~/components/02-molecules/job-card/job-card';
import type { Env } from '~/global-types.ts';

type TAirtableBody = {
	records: TAirtableRecord[];
};
type TCreateAirtableRecord = {
	success: boolean;
};
type TAirtableParams = Record<string, any>;
type TAirtableFilters = String;
export type TAirtableFields = {
	/* Jobs */
	'Request ID'?: string;
	'Status'?: string;
	'Booker: name'?: string;
	'Appointment: service'?: string;
	'Appointment: specialism'?: string;
	'Appointment: organisation'?: string;
	'Appointment: details'?: string;
	'Appointment: client name'?: string;
	'Appointment: contact name'?: string;
	'Appointment: contact number'?: string;
	'Appointment: access to work'?: string;
	'Appointment: interpreter gender'?: string;
	'Appointment: date'?: string;
	'Appointment: duration'?: string;
	'Appointment: address 1'?: string;
	'Appointment: address 2'?: string;
	'Appointment: city'?: string;
	'Appointment: post code'?: string;
	'Booker: number'?: string;
	'Booker: email'?: string;
	'Airtable: request last updated'?: string;
	'Airtable: request number'?: number;
	'Airtable: name and ID'?: string;
	'Airtable: request received'?: string;
	'Airtable: appointment start'?: string;
	'Airtable: appointment end'?: string;
	'Finance: department'?: string;
	'Airtable: post email sent'?: boolean;
	'Airtable: friendly address'?: string;
	'Airtable: Google Maps link'?: string;
	/* Interpreters */
	'Email'?: string;
	'Name'?: string;
	'Registration number'?: string;
	'Job post emails'?: boolean;
	'Job summary emails'?: boolean;
	'Registration organisation'?: string;
	'Registration lookup'?: string;
	'Registration details'?: string;
	'User ID'?: string;
};
type TAirtableRecord = {
	id?: string;
	fields: TAirtableFields;
	createdTime?: string;
};
type TAirtableResponse = {
	success: boolean;
	records?: Array<TAirtableRecord> | null;
};

/* UNOPINIONATED */

export const createAirtableRecord = async (
	fields: TAirtableFields,
	table: string,
	env: Env,
): Promise<TCreateAirtableRecord> => {
	try {
		const url = `${env.AIRTABLE_URL}/${env.AIRTABLE_BASE_ID}/${table}`;
		const body = {
			records: [
				{
					fields,
				},
			],
		};

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${env.AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			console.error('Airtable error:', await response.text());

			return {
				success: false,
			};
		}

		return { success: true };
	} catch (error) {
		console.error('Error sending user to Airtable (raw fetch):', error);

		return {
			success: false,
		};
	}
};

export const getAirtableRecords = async (
	table: string,
	env: Env,
	fields?: Array<keyof TAirtableFields>,
	filters?: TAirtableFilters,
): Promise<TAirtableResponse> => {
	try {
		const url = `${env.AIRTABLE_URL}/${env.AIRTABLE_BASE_ID}/${table}`;
		const params: TAirtableParams = new URLSearchParams();

		// Add fields to the params
		fields?.map((field) => {
			params.append('fields[]', field);
		});

		// Add filters to the params
		if (filters) {
			params.append('filterByFormula', filters);
		}

		const urlWithParams = `${url}?${params.toString()}`;
		const response = await fetch(urlWithParams, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
			},
		});

		if (!response.ok) {
			console.error('Airtable error:', await response.text());

			return {
				success: false,
			};
		}

		const responseJSON: TAirtableResponse = await response.json();
		const records = responseJSON.records;

		return { success: true, records: records ? records : null };
	} catch (error) {
		console.error('Error fetching data from Airtable (raw fetch):', error);

		return {
			success: false,
		};
	}
};

export const updateAirtableRecords = async (
	table: string,
	env: Env,
	records: TAirtableRecord[],
): Promise<object> => {
	try {
		const url = `${env.AIRTABLE_URL}/${env.AIRTABLE_BASE_ID}/${table}`;
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
			},
			body: JSON.stringify({ records } as TAirtableBody),
		});

		if (!response.ok) {
			console.error('Airtable error:', await response.text());

			return {
				success: false,
			};
		}

		return { success: true };
	} catch (error) {
		console.error('Error updating Airtable record:', error);

		return {
			success: false,
		};
	}
};

/* OPINIONATED */

export const getAvailableJobsFromAirtable = async (
	filters: TAirtableFilters,
	env: Env,
): Promise<{
	jobs: TJobCard[];
	error?: string;
}> => {
	try {
		const airtableResponse = await getAirtableRecords(
			'Jobs',
			env,
			[
				'Request ID',
				'Appointment: service',
				'Appointment: specialism',
				'Appointment: date',
				'Airtable: friendly address',
				'Appointment: details',
			],
			filters,
		);

		if (!airtableResponse || !airtableResponse.records) {
			console.error('No jobs found in Airtable');
			return { error: 'No jobs found', jobs: [] };
		}

		const availableJobs = airtableResponse.records.map((job) => {
			// Mark past jobs
			const dateTimeD = job.fields['Appointment: date']
				? new Date(job.fields['Appointment: date'])
				: null;
			const isPast = dateTimeD
				? dateTimeD < new Date()
					? true
					: false
				: null;

			return {
				record: job.id,
				id: job.fields['Request ID'],
				service: job.fields['Appointment: service'],
				specialism: job.fields['Appointment: specialism'],
				dateTime: job.fields['Appointment: date'],
				location: job.fields['Airtable: friendly address'],
				description: job.fields['Appointment: details'],
				isPast,
			} as TJobCard;
		});

		return { jobs: availableJobs };
	} catch (error) {
		console.error('Error fetching jobs:', error);

		return { error: `Error fetching jobs: ${error}`, jobs: [] };
	}
};
