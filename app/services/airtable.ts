import type { Env } from '~/global-types.ts';

type TAirtableBody = Record<string, any>;
type TCreateAirtableRecord = {
	success: boolean;
};

const AIRTABLE_BASE_ID = 'appVvBBcXMR0P1Lo6';

export const createAirtableRecord = async (
	body: TAirtableBody,
	table: string,
	env: Env,
): Promise<TCreateAirtableRecord> => {
	try {
		const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}`;
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
