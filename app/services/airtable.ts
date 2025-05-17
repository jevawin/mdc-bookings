import type { Env, Prettify, TJob } from '~/global-types.ts';

import { record } from 'zod';

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
	'Airtable: applications'?: Array<string>;
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
	'Posted listings'?: Array<string>;
	'Name'?: string;
	'Registration number'?: string;
	'Job post emails'?: boolean;
	'Job summary emails'?: boolean;
	'Registration organisation'?: string;
	'Registration lookup'?: string;
	'Registration details'?: string;
	'User ID'?: string;
};

type TAirtableRecord<K extends keyof TAirtableFields> = {
	fields: Prettify<Pick<Required<TAirtableFields>, K>>;
	id?: string;
	createdTime?: string;
} & {};

type TAirtableResponse<K extends keyof TAirtableFields> = {
	success: boolean;
	records: TAirtableRecord<K>[];
	record?: TAirtableRecord<K>;
} & {};

/* UNOPINIONATED */

type TCreateAirtableRecord = {
	success: boolean;
};

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

export const getAirtableRecord = async <K extends keyof TAirtableFields>(
	table: string,
	env: Env,
	recordID: string,
): Promise<TAirtableResponse<K>> => {
	try {
		const url = `${env.AIRTABLE_URL}/${env.AIRTABLE_BASE_ID}/${table}/${recordID}`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
			},
		});

		if (!response.ok) {
			console.error('Airtable error:', await response.text());

			return {
				success: false,
				records: [],
			};
		}

		const record: TAirtableRecord<K> = await response.json();

		return { success: true, records: [], record: record ?? undefined };
	} catch (error) {
		console.error('Error fetching data from Airtable (raw fetch):', error);

		return {
			success: false,
			records: [],
		};
	}
};

export const getAirtableRecords = async <K extends keyof TAirtableFields>(
	table: string,
	env: Env,
	fields?: K[],
	filters?: string,
): Promise<TAirtableResponse<K>> => {
	try {
		const url = `${env.AIRTABLE_URL}/${env.AIRTABLE_BASE_ID}/${table}`;
		const params = new URLSearchParams();

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
				records: [],
			};
		}

		const data = (await response.json()) satisfies TAirtableResponse<K>;
		const records = data.records;

		return { success: true, records: records ?? [] };
	} catch (error) {
		console.error('Error fetching data from Airtable (raw fetch):', error);

		return {
			success: false,
			records: [],
		};
	}
};

type TUpdateAirtableRecords<T extends keyof TAirtableFields> = {
	success: boolean;
	response?: TAirtableResponse<T>;
};

export const updateAirtableRecords = async <K extends keyof TAirtableFields>(
	table: string,
	env: Env,
	records: TAirtableRecord<K>[],
): Promise<TUpdateAirtableRecords<K>> => {
	try {
		const url = `${env.AIRTABLE_URL}/${env.AIRTABLE_BASE_ID}/${table}`;
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${env.AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ records }),
		});

		if (!response.ok) {
			console.error('Airtable error:', await response.text());

			return {
				success: false,
			};
		}

		return { success: true, response: await response.json() };
	} catch (error) {
		console.error('Error updating Airtable record:', error);

		return {
			success: false,
		};
	}
};

/* OPINIONATED */

type TGetAvailableJobsFromAirtable = {
	jobs: TJob[];
	error?: string;
};

export const getAvailableJobsFromAirtable = async (
	filters: string,
	env: Env,
): Promise<TGetAvailableJobsFromAirtable> => {
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

		const availableJobs = airtableResponse?.records.map((job) => {
			const date = job.fields['Appointment: date'];
			const dateTimeD = date ? new Date(date) : null;
			const isPast = dateTimeD ? dateTimeD < new Date() : false;

			return {
				record: job.id,
				id: job.fields['Request ID'],
				service: job.fields['Appointment: service'],
				specialism: job.fields['Appointment: specialism'],
				dateTime: job.fields['Appointment: date'],
				location: job.fields['Airtable: friendly address'],
				description: job.fields['Appointment: details'],
				isPast,
			};
		});

		return { jobs: availableJobs };
	} catch (error) {
		console.error('Error fetching jobs:', error);

		return { error: `Error fetching jobs: ${error}`, jobs: [] };
	}
};
