import type { Route } from './+types/open.ts';
import type { TJob } from '~/global-types.ts';

import { useState } from 'react';
import { redirect } from 'react-router';
import { getAvailableAirtableJobs } from '~/.server/services/airtable.ts';
import { getUser } from '~/.server/services/supabase.ts';
import { getSession } from '~/.server/sessions.ts';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { JobsDisplay } from '~/components/03-organisms/jobs-display/jobs-display.tsx';

type TApplyResponse = {
	success: boolean;
	error?: string;
};

type TGetDefaultError = {
	error: string;
	jobs: never[];
	lastUpdated: string;
};

const getDefaultError = (
	error: string,
	lastUpdated: string,
): TGetDefaultError => ({
	error,
	jobs: [],
	lastUpdated,
});

const applyForJob = async (record: string): Promise<void> => {
	try {
		const response = await fetch('/api/apply', {
			method: 'POST',
			body: JSON.stringify({ record }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const data = (await response.json()) satisfies TApplyResponse;

			throw new Error(`Response status: ${data.error}`);
		}

		window.location.reload();
	} catch (error) {
		console.error(error);
	}
};

type TOpenJobsPageData = {
	jobs: TJob[];
	lastUpdated: string;
	error?: unknown;
};

export async function loader({
	request,
	context,
}: Route.LoaderArgs): Promise<Response | TOpenJobsPageData> {
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
				OR(
					{Status} = 'Booking posted',
					AND(
						{Status} = 'Applications received',
						FIND(
							"${email}",
							ARRAYJOIN(
								{Airtable: applications},
								","
							)
						) = 0
					)
				),
				{Appointment: date} > NOW()
			)`,
			env,
		);

		if (data.error) {
			return getDefaultError(data.error, lastUpdated);
		}

		return {
			jobs: data.jobs,
			lastUpdated,
		};
	} catch (error) {
		console.error(error);

		return {
			error,
			jobs: [],
			lastUpdated,
		};
	}
}

export default function Open({
	loaderData,
}: Route.ComponentProps): React.ReactNode {
	const error = loaderData.error;
	const jobs = loaderData.jobs;
	const [cardClicked, setCardClicked] = useState<string | undefined>(
		undefined,
	);

	const handleClick = async (record: string): Promise<void> => {
		setCardClicked(record);

		await applyForJob(record);

		setCardClicked(undefined);
	};

	if (error) {
		return (
			<>
				<title>📋 Open Interpreter Jobs</title>
				<meta
					name="description"
					content="Open interpreter jobs at Manchester Deaf Centre."
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
			<title>
				📋 Open interpreter jobs | Manchester Deaf Centre booking system
			</title>
			<meta
				name="description"
				content="Open interpreter jobs at Manchester Deaf Centre."
			/>

			<JobsDisplay.Root id="upcoming-jobs">
				<JobsDisplay.Title id="upcoming-jobs" title="Upcoming jobs" />

				<JobsDisplay.Cards
					cards={jobs}
					type="open"
					isPast={false}
					onCardClick={handleClick}
					cardClicked={cardClicked}
				/>
			</JobsDisplay.Root>
		</>
	);
}
