import type { Route } from './+types/applied';

import { redirect } from 'react-router';
import { getAvailableAirtableJobs } from '~/services/airtable.ts';
import { getUser } from '~/services/supabase.ts';
import { getSession } from '~/sessions.server.ts';

import { useState } from 'react';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { JobsDisplay } from '~/components/03-organisms/jobs-display/jobs-display.tsx';

type TRevokeResponse = {
	success: boolean;
	error?: string;
};

const getDefaultError = (error: string, lastUpdated: string) => ({
	error,
	jobs: [],
	lastUpdated,
});

const revokeJob = async (record: string) => {
	try {
		const response = await fetch('/api/revoke', {
			method: 'POST',
			body: JSON.stringify({ record }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const data = (await response.json()) satisfies TRevokeResponse;

			throw new Error(`Response status: ${data.error}`);
		}

		window.location.reload();
	} catch (error) {
		console.error(error);
	}
};

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
	const email = user.data?.email;

	if (!email) {
		console.error(`No email found for user`);

		return getDefaultError(`No email found for user`, lastUpdated);
	}

	// Query available jobs for the interpreter to apply for
	try {
		const data = await getAvailableAirtableJobs(
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

export default function AppliedJobs({ loaderData }: Route.ComponentProps) {
	const error = loaderData.error;
	const jobs = loaderData.jobs;

	const [cardClicked, setCardClicked] = useState<string | undefined>(
		undefined,
	);

	const handleClick = async (record: string) => {
		setCardClicked(record);

		await revokeJob(record);

		setCardClicked(undefined);
	};

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
					cards={jobs}
					type="applied"
					isPast={false}
					handleClick={handleClick}
					cardClicked={cardClicked}
				/>
			</JobsDisplay.Root>
		</>
	);
}
