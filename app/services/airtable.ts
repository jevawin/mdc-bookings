import type { Env, Prettify, TJob } from '~/global-types.ts';

import { jobMapper } from '~/mappers/job-mapper.ts';

export type TAirtableInterpreterFields = {
	'Email'?: string;
	'Posted listings'?: string[];
	'Name'?: string;
	'Preferred name'?: string;
	'Registration number'?: string;
	'Job post emails'?: boolean;
	'Job summary emails'?: boolean;
	'Registration organisation'?: string;
	'Registration lookup'?: string;
	'Registration details'?: string;
	'User ID'?: string;
};

export type TAirtableJobFields = {
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
	'Airtable: applications'?: string[];
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
};

type TAirtableFields = TAirtableInterpreterFields & TAirtableJobFields;

type TAirtableTable = 'Interpreters' | 'Jobs';

type TableFieldMap = {
	Jobs: TAirtableJobFields;
	Interpreters: TAirtableInterpreterFields;
};

type TAirtableFieldsMap<T extends TAirtableTable> = TableFieldMap[T];

type TAirtableRecordAll<T extends TAirtableTable> = {
	fields: Prettify<Required<TAirtableFieldsMap<T>>>;
	id: string;
	createdTime: string;
} & {};

type TAirtableRecordPartial<T extends TAirtableTable> = {
	fields: Prettify<TAirtableFieldsMap<T>>;
	id: string;
	createdTime?: string;
} & {};

type TAirtableResponse<T extends TAirtableTable> = {
	records: TAirtableRecordAll<T>[];
} & {};

/* UNOPINIONATED */

type TCreateAirtableRecord = {
	success: boolean;
};

export const createAirtableRecord = async (
	fields: TAirtableFields,
	table: TAirtableTable,
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

type TGetAirtableRecord<T extends TAirtableTable> = {
	success: boolean;
	data?: TAirtableRecordAll<T>;
};

export const getAirtableRecord = async <T extends TAirtableTable>(
	table: T,
	env: Env,
	recordID: string,
): Promise<Prettify<TGetAirtableRecord<T>>> => {
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
			};
		}

		const data = (await response.json()) satisfies TAirtableRecordAll<T>;

		return { success: true, data: data ?? undefined };
	} catch (error) {
		console.error('Error fetching data from Airtable (raw fetch):', error);

		return {
			success: false,
		};
	}
};

type TGetAirtableRecords<T extends TAirtableTable> = {
	success: boolean;
	records: TAirtableRecordAll<T>[];
} & {};

export const getAirtableRecords = async <T extends TAirtableTable>(
	table: T,
	env: Env,
	fields?: (keyof TableFieldMap[T])[],
	filters?: string,
): Promise<TGetAirtableRecords<T>> => {
	try {
		const url = `${env.AIRTABLE_URL}/${env.AIRTABLE_BASE_ID}/${table}`;
		const params = new URLSearchParams();

		// Add fields to the params
		fields?.map((field) => {
			params.append('fields[]', field.toString());
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

		const data = (await response.json()) satisfies TAirtableResponse<T>;
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

type TUpdateAirtableRecords = {
	success: boolean;
};

export const updateAirtableRecords = async <T extends TAirtableTable>(
	table: T,
	env: Env,
	records: TAirtableRecordPartial<T>[],
): Promise<TUpdateAirtableRecords> => {
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

		return { success: true };
	} catch (error) {
		console.error('Error updating Airtable record:', error);

		return {
			success: false,
		};
	}
};

/* OPINIONATED */

type TGetAvailableAirtableJobs = {
	jobs: TJob[];
	error?: string;
};

export const getAvailableAirtableJobs = async (
	filters: string,
	env: Env,
): Promise<TGetAvailableAirtableJobs> => {
	try {
		const response = await getAirtableRecords(
			'Jobs',
			env,
			[
				'Request ID',
				'Appointment: service',
				'Appointment: specialism',
				'Appointment: date',
				'Appointment: duration',
				'Airtable: friendly address',
				'Appointment: details',
			],
			filters,
		);

		if (!response || !response.records) {
			console.error('No jobs found in Airtable');

			return { error: 'No jobs found', jobs: [] };
		}

		const jobs = response?.records.map(jobMapper) ?? [];

		return { jobs };
	} catch (error) {
		console.error('Error fetching jobs:', error);

		return { error: `Error fetching jobs: ${error}`, jobs: [] };
	}
};
