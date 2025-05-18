import type { ActionFunctionArgs } from 'react-router';

import { redirect } from 'react-router';
import {
	getAirtableRecord,
	getAirtableRecords,
	updateAirtableRecords,
} from '~/services/airtable';
import { applyApiSchema } from '~/schemas/api-schema';
import { getUser } from '~/services/supabase';
import { getSession } from '~/sessions.server';

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
		if (!user.success) return redirect('/log-in');

		const email = user?.data?.email;

		// Send error if no email
		if (!email) {
			console.error('No email found for user');

			return new Response(
				JSON.stringify({ success: false, error: 'No email found' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}

		// Get record recordID
		const data = await request.json();
		const parsed = applyApiSchema.safeParse(data);
		const recordID = parsed?.data?.record;

		// Send error if no recordID
		if (!recordID) {
			console.error('No record recordID found');

			return new Response(
				JSON.stringify({
					success: false,
					error: 'No record recordID found',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
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
			console.error('Interpreter not found in Airtable');

			return new Response(
				JSON.stringify({
					success: false,
					error: 'Interpreter not found in Airtable',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}

		// Check if interpreter has already applied
		const listings = interpreterRecord.records[0].fields['Posted listings'];
		const alreadyApplied = listings?.includes(recordID);

		// Get interpreter's Airtable record ID
		const interpreterID = interpreterRecord.records[0].id;

		// If not already applied, apply
		if (!alreadyApplied && interpreterID) {
			// Get record to apply interpreter to
			const record = await getAirtableRecord('Jobs', env, recordID);

			// Get existing applications, if null set as empty array
			const applications = [
				...(record.data?.fields['Airtable: applications'] ?? []),
				interpreterID,
			];

			// Append Airtable
			const updated = await updateAirtableRecords('Jobs', env, [
				{
					id: recordID,
					fields: {
						'Status': 'Applications received',
						'Airtable: applications': applications,
					},
				},
			]);

			if (!updated.success) {
				console.error('Error updating Airtable with new record');

				return new Response(
					JSON.stringify({
						success: false,
						error: 'Error updating Airtable with new record',
					}),
					{
						status: 400,
						headers: { 'Content-Type': 'application/json' },
					},
				);
			}
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error }));
	}
};
