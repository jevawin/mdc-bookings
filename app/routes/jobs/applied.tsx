import type { Route } from './+types/open';
import type { Env } from '~/global-types.ts';

import { JobsPage } from '~/components/05-templates/jobs-page/jobs-page.tsx';
import { getAirtableRecords } from '~/services/airtable';
import { Text } from '~/components/01-atoms/text/text';
import { getSession } from '~/sessions.server';
import { getUser } from '~/services/supabase';
import { redirect } from 'react-router';
import type { TJobCard } from '~/components/02-molecules/job-card/job-card';

const getAvailableJobsFromAirtable = async (
	interpreterEmail: string,
	env: Env,
): Promise<{
	jobs: TJobCard[];
	error?: string;
}> => {
	try {
		const airtableResponse = await getAirtableRecords(
			'Jobs',
			env,
			[],
			`AND(
				{Status} = 'Applications received',
				FIND(
					"${interpreterEmail}",
					ARRAYJOIN(
						{Airtable: applications},
						","
					)
				) > 0
			)`,
		);

		if (!airtableResponse || !airtableResponse.records) {
			console.error('No jobs found in Airtable');
			return { error: 'No jobs found', jobs: [] };
		}

		const availableJobs = airtableResponse.records.map((job) => {
			return {
				id: job.fields['Request ID'],
				service: job.fields['Appointment: service'],
				specialism: job.fields['Appointment: specialism'],
				dateTime: job.fields['Appointment: date'],
				location: job.fields['Airtable: friendly address'],
				description: job.fields['Appointment: details'],
			};
		});

		return { jobs: availableJobs };
	} catch (error) {
		console.error('Error fetching jobs:', error);

		return { error: `Error fetching jobs: ${error}`, jobs: [] };
	}
};

export const meta: Route.MetaFunction = () => {
	return [
		{ title: 'Applied Interpreter Jobs' },
		{
			name: 'description',
			content: 'Applied interpreter jobs at Manchester Deaf Centre.',
		},
	];
};

export async function loader({ request, context }: Route.LoaderArgs) {
	const env = context.cloudflare.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');
	const user = await getUser(env, token);

	// Redirect to login if not logged in
	if (!user.success) return redirect('/log-in');

	// Get interpreter ID and email from Supabase
	const userID = user?.data?.id;
	if (!userID) {
		console.error('No ID found for user');
		return { error: 'No ID found for user', jobs: [] };
	}

	const email = user?.data?.email;
	if (!email) {
		console.error('No email found for user');
		return { error: 'No email found for user', jobs: [] };
	}

	// Get user name from Airtable
	const airtableResponse = await getAirtableRecords(
		'Interpreters',
		env,
		['Name'],
		`{User ID}="${userID}"`,
	);

	if (!airtableResponse || !airtableResponse.records) {
		console.error('Interpreter ID not found in Airtable');
		return { error: 'Interpreter ID not found', jobs: [] };
	}

	const interpreterName = airtableResponse?.records[0]?.fields['Name'] || '';

	// Query available jobs for the interpreter to apply for
	try {
		const availableJobs = await getAvailableJobsFromAirtable(
			email as string,
			env,
		);

		if (availableJobs.error) {
			return { error: availableJobs.error, jobs: [] };
		}

		return { jobs: availableJobs.jobs, name: interpreterName };
	} catch (error) {
		console.error(error);
		return { error, jobs: [] };
	}
}

export default function Jobs({ loaderData }: Route.ComponentProps) {
	if (loaderData.error) {
		return (
			<main>
				<Text size="100" weight="100" tag="h3" role="alert">
					Error loading jobs. Please contact MDC.
				</Text>
				<Text size="100" weight="100" tag="p">
					Error details: {loaderData.error}
				</Text>
			</main>
		);
	}

	return (
		<JobsPage
			userName={loaderData.name}
			jobs={loaderData.jobs}
			lastUpdated={new Date().toLocaleString('en-GB')}
			type="applied"
		/>
	);
}
