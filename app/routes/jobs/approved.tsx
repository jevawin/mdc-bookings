import type { Route } from './+types/approved.ts';
import type { TJob } from '~/global-types.ts';

import { redirect } from 'react-router';
import { getAvailableAirtableJobs } from '~/services/airtable.ts';
import { getUser } from '~/services/supabase.ts';
import { getSession } from '~/sessions.server.ts';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { JobsDisplay } from '~/components/03-organisms/jobs-display/jobs-display.tsx';

type TGetDefaultError = {
	error: string;
	currentJobs: never[];
	pastJobs: never[];
	lastUpdated: string;
};

const getDefaultError = (
	error: string,
	lastUpdated: string,
): TGetDefaultError => ({
	error,
	currentJobs: [],
	pastJobs: [],
	lastUpdated,
});

type TApprovaedPageData = {
	currentJobs: TJob[];
	pastJobs: TJob[];
	lastUpdated: string;
	error?: string | unknown;
};

export async function loader({
	request,
	context,
}: Route.LoaderArgs): Promise<Response | TApprovaedPageData> {
	const env = context.cloudflare.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');
	const user = await getUser(env, token);
	const lastUpdated = new Date().toLocaleString('en-GB');

	// Redirect to login if not logged in
	if (!user.success) return redirect('/log-in');

	// Get interpreter ID and email from Supabase
	const email = user.data?.email;

	if (!email) {
		console.error(`No email found for user`);

		return getDefaultError(`No email found for user`, lastUpdated);
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

		const currentJobs = data.jobs.filter((job) => !job.isPast);
		const pastJobs = data.jobs.filter((job) => job.isPast);

		return {
			currentJobs,
			pastJobs,
			lastUpdated,
		};
	} catch (error) {
		console.error(error);

		return { error, currentJobs: [], pastJobs: [], lastUpdated };
	}
}

export default function Approved({
	loaderData,
}: Route.ComponentProps): React.ReactNode {
	const error = loaderData.error;
	const currentJobs = loaderData.currentJobs;
	const pastJobs = loaderData.pastJobs;

	if (error) {
		return (
			<>
				<title>Approved Interpreter Jobs</title>
				<meta
					name="description"
					content="Your upcoming and past jobs."
				/>

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
			<title>Approved Interpreter Jobs</title>
			<meta name="description" content="Your upcoming and past jobs." />

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
