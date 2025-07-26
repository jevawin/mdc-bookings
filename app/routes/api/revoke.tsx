import type { ActionFunctionArgs } from 'react-router';

import { applyApiSchema } from '~/.server/schemas/api-schema.ts';
import {
	getAirtableRecord,
	getAirtableRecords,
	updateAirtableRecords,
} from '~/.server/services/airtable.ts';
import { getUser } from '~/.server/services/supabase.ts';
import { getSession } from '~/.server/sessions.ts';

export type TAPIResponse = {
	success: boolean;
	error?: string;
	redirect?: string;
};

const respond = (data: TAPIResponse, status: number): Response => {
	if (data.error) console.error(data.error);

	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
};

export const action = async ({
	request,
	context,
}: ActionFunctionArgs): Promise<Response> => {
	try {
		const env = context.cloudflare.env;
		const cookieHeader = request.headers.get('Cookie');
		const session = await getSession(cookieHeader);
		const token = session.get('access_token');
		const user = await getUser(env, token);

		// Redirect to login if not logged in
		if (!user.success)
			return respond(
				{
					success: false,
					error: 'User is not logged in',
					redirect: '/log-in',
				},
				400,
			);

		const email = user?.data?.email;

		// Send error if no email
		if (!email) {
			return respond({ success: false, error: 'No email found' }, 400);
		}

		// Get record recordID
		const data = await request.json();
		const parsed = applyApiSchema.safeParse(data);
		const recordID = parsed?.data?.record;

		// Send error if no recordID
		if (!recordID) {
			return respond(
				{
					success: false,
					error: 'No record recordID found',
				},
				400,
			);
		}

		// Get intpreter recordID from Airtable
		const interpreterRecord = await getAirtableRecords(
			'Interpreters',
			env,
			['Posted listings'],
			`{Email} = '${email}'`,
		);

		// Send error if interpreter not found
		if (!interpreterRecord || !interpreterRecord.records) {
			return respond(
				{
					success: false,
					error: 'Interpreter not found in Airtable',
				},
				400,
			);
		}

		// Check if interpreter has already applied
		const listings = interpreterRecord.records[0].fields['Posted listings'];
		const alreadyApplied = listings?.includes(recordID);

		// Get interpreter's Airtable record ID
		const interpreterID = interpreterRecord.records[0].id;

		// If applied, revoke
		if (alreadyApplied && interpreterID) {
			// Get record to apply interpreter to
			const record = await getAirtableRecord('Jobs', env, recordID);

			// Error if no record retrived
			if (!record.success) {
				return respond(
					{ success: false, error: 'Error retreiving record' },
					400,
				);
			}

			// Get existing applications (should not be null)
			const applications = record.data?.fields[
				'Airtable: applications'
			].filter((application) => application !== interpreterID);

			// Set status
			const status =
				applications?.length === 0
					? 'Booking posted'
					: 'Applications received';

			// Append Airtable
			const updated = await updateAirtableRecords('Jobs', env, [
				{
					id: recordID,
					fields: {
						'Status': status,
						'Airtable: applications': applications,
					},
				},
			]);

			if (!updated.success) {
				return respond(
					{
						success: false,
						error: 'Error updating Airtable with new record',
					},
					400,
				);
			}
		}

		return respond({ success: true }, 200);
	} catch (error) {
		return respond({ success: false, error: `${error}` }, 400);
	}
};
