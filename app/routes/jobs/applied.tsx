import type { Route } from './+types/applied';

import { redirect } from 'react-router';
import {
	getAirtableRecords,
	getAvailableJobsFromAirtable,
} from '~/services/airtable.ts';
import { getUser } from '~/services/supabase.ts';
import { getSession } from '~/sessions.server.ts';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { JobsPage } from '~/components/05-templates/jobs-page/jobs-page.tsx';
import type { TJobCard } from '~/components/02-molecules/job-card/job-card';

const getDefaultError = (error: string, lastUpdated: string) => ({
	error,
	jobs: [],
	currentJobs: [],
	pastJobs: [],
	lastUpdated,
});

export const meta: Route.MetaFunction = () => {
	return [
		{ title: 'Applied Interpreter Jobs' },
		{
			name: 'description',
			content:
				'Your applied jobs, pending approval by Manchester Deaf Centre.',
		},
	];
};

export async function loader({ request, context }: Route.LoaderArgs) {
	const env = context.cloudflare.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');
	const user = await getUser(env, token);
	const lastUpdated = new Date().toLocaleString('en-GB');

	// Redirect to login if not logged in
	if (!user.success) return redirect('/log-in');

	// Get interpreter ID and email from Supabase
	const userID = user?.data?.id;

	if (!userID) {
		console.error('No ID found for user');

		return getDefaultError('No ID found for user', lastUpdated);
	}

	const email = user?.data?.email;

	if (!email) {
		console.error('No email found for user');

		return getDefaultError('No email found for user', lastUpdated);
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

		return getDefaultError(
			'Interpreter ID not found in Airtable',
			lastUpdated,
		);
	}

	// Query available jobs for the interpreter to apply for
	try {
		const data = await getAvailableJobsFromAirtable(
			`AND(
				{Status} = 'Applications received',
				FIND(
					"${email}",
					ARRAYJOIN(
						{Airtable: applications},
						","
					)
				) > 0,
				{Appointment: date} > NOW()
			)`,
			env,
		);

		if (data.error) {
			return getDefaultError(data.error, lastUpdated);
		}

		const name = airtableResponse?.records[0]?.fields['Name'] || '';
		const currentJobs = data.jobs.filter((job) => !job.isPast);
		const pastJobs = data.jobs.filter((job) => job.isPast);

		return { currentJobs, pastJobs, lastUpdated, name, jobs: data.jobs };
	} catch (error) {
		console.error(error);

		return { error, currentJobs: [], pastJobs: [], jobs: [], lastUpdated };
	}
}

export default function AppliedJobs({ loaderData }: Route.ComponentProps) {
	if (loaderData.error) {
		return (
			<main id="main">
				<Text size="300" weight="300" tag="h3" role="alert">
					Error loading jobs. Please contact MDC.
				</Text>

				<Text size="200" weight="100" tag="p">
					Error details: {loaderData.error}
				</Text>
			</main>
		);
	}

	return <JobsPage jobs={loaderData.jobs as TJobCard[]} type="applied" />;
}
