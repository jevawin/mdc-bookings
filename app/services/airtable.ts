import type { TJobCard } from '~/components/02-molecules/job-card/job-card';
import type { Env } from '~/global-types.ts';

type TAirtableBody = Record<string, any>;
type TCreateAirtableRecord = {
	success: boolean;
};
type TAirtableFields = Array<string>;
type TAirtableParams = Record<string, any>;
type TAirtableFilters = String;
type TAirtableRecord = {
	id: string;
	fields: Record<string, any>;
	createdTime: string;
};
type TAirtableResponse = {
	success: boolean;
	records?: Array<TAirtableRecord> | null;
};

export const createAirtableRecord = async (
	body: TAirtableBody,
	table: string,
	env: Env,
): Promise<TCreateAirtableRecord> => {
	try {
		const url = `${env.AIRTABLE_URL}/${env.AIRTABLE_BASE_ID}/${table}`;
		const payload = {
			records: [
				{
					fields: body,
				},
			],
		};

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${env.AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
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
	fields?: TAirtableFields,
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
			const dateTimeD = new Date(job.fields['Appointment: date']);
			const isPast = dateTimeD < new Date() ? true : false;

			return {
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
