import type { Route } from './+types/approved';

import { redirect } from 'react-router';
import {
	getAirtableRecords,
	getAvailableAirtableJobs,
} from '~/services/airtable.ts';
import { getUser } from '~/services/supabase.ts';
import { getSession } from '~/sessions.server.ts';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { JobsDisplay } from '~/components/03-organisms/jobs-display/jobs-display.tsx';

const getDefaultError = (error: string, lastUpdated: string) => ({
	error,
	jobs: [],
	currentJobs: [],
	pastJobs: [],
	lastUpdated,
});

export const meta: Route.MetaFunction = () => {
	return [
		{ title: 'Approved Interpreter Jobs' },
		{
			name: 'description',
			content: 'Your upcoming and past jobs.',
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
	const userID = user.data?.id;
	const email = user.data?.email;

	if (!userID || !email) {
		const errorType = !userID ? 'ID' : 'email';

		console.error(`No ${errorType} found for user`);

		return getDefaultError(`No ${errorType} found for user`, lastUpdated);
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
		const data = await getAvailableAirtableJobs(
			`AND(
				{Status} = 'Appointment booked',
				FIND(
					"${email}",
					ARRAYJOIN(
						{Airtable: applications},
						","
					)
				) > 0,
				DATETIME_DIFF({Appointment: date}, TODAY(), "days") > -90
			)`,
			env,
		);

		if (data.error) {
			return getDefaultError(data.error, lastUpdated);
		}

		const name = airtableResponse?.records[0]?.fields['Name'] || '';
		const currentJobs = data.jobs.filter((job) => !job.isPast);
		const pastJobs = data.jobs.filter((job) => job.isPast);

		return {
			name,
			jobs: data.jobs,
			currentJobs,
			pastJobs,
			lastUpdated,
		};
	} catch (error) {
		console.error(error);

		return { error, currentJobs: [], pastJobs: [], jobs: [], lastUpdated };
	}
}

export default function ApprovedJobs({ loaderData }: Route.ComponentProps) {
	const error = loaderData.error;
	const currentJobs = loaderData.currentJobs;
	const pastJobs = loaderData.pastJobs;

	if (error) {
		return (
			<>
				<Text size="300" weight="300" tag="h3" role="alert">
					Error loading jobs. Please contact MDC.
				</Text>

				<Text size="200" weight="100" tag="p">
					Error details: {error}
				</Text>
			</>
		);
	}

	return (
		<>
			<JobsDisplay.Root id="upcoming-jobs">
				<JobsDisplay.Title id="upcoming-jobs" title="Upcoming jobs" />

				<JobsDisplay.Cards
					cards={currentJobs}
					type="approved"
					isPast={false}
				/>
			</JobsDisplay.Root>

			<JobsDisplay.Root id="past-jobs">
				<JobsDisplay.Title id="past-jobs" title="Past jobs" />

				<JobsDisplay.Cards
					cards={pastJobs}
					type="approved"
					isPast={true}
				/>
			</JobsDisplay.Root>
		</>
	);
}
