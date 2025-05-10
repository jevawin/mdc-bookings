import type { Route } from './+types/open';

import { JobsPage } from '~/components/05-templates/jobs-page/jobs-page.tsx';
import { mockJobsPageData } from '~/components/05-templates/jobs-page/jobs-page.mock';
import { getAirtableRecords } from '~/services/airtable';
import type { Env } from '~/global-types';
import { Text } from '~/components/01-atoms/text/text';

const getInterpreterEmailFromAirtable = async (
	userID: string,
	env: Env,
): Promise<string | Error> => {
	try {
		const airtableResponse = await getAirtableRecords(
			'Interpreters',
			env,
			['Email'],
			`{User ID}="${userID}"`,
		);

		if (!airtableResponse || !airtableResponse.records) {
			console.error('Interpreter ID not found in Airtable');
			return new Error('Interpreter ID not found');
		}

		const interpreterEmail = airtableResponse.records[0].id;

		return interpreterEmail;
	} catch (error) {
		console.error('Error fetching interpreter ID:', error);
		return error as Error;
	}
};

const getAvailableJobsFromAirtable = async (
	interpreterEmail: string,
	env: Env,
): Promise<Array<any> | Error> => {
	try {
		const airtableResponse = await getAirtableRecords(
			'Jobs',
			env,
			[],
			`AND(
				OR(
					{Status} = 'Booking posted',
					AND(
						{Status} = 'Applications received',
						FIND(
							"${interpreterEmail}",
							ARRAYJOIN(
								{Airtable: applications},
								","
							)
						) = 0
					)
				),
				{Appointment: date} > NOW()
			)`,
		);

		if (!airtableResponse || !airtableResponse.records) {
			console.error('No jobs found in Airtable');
			return new Error('No jobs found');
		}

		const availableJobs = airtableResponse.records;

		return availableJobs;
	} catch (error) {
		console.error('Error fetching jobs:', error);
		return error as Error;
	}
};

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Interpreter Jobs' },
		{
			name: 'description',
			content: 'Open interpreter jobs at Manchester Deaf Centre.',
		},
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	// Get interpreter email from Airtable
	const email = await getInterpreterEmailFromAirtable(
		'52572c44-9d1f-4c66-a9f0-a676ef65e641',
		context.cloudflare.env,
	);

	// Query available jobs for the interpreter to apply for
	const availableJobs = await getAvailableJobsFromAirtable(
		email as string,
		context.cloudflare.env,
	);

	return { availableJobs };
}

export default function Jobs({ loaderData }: Route.ComponentProps) {
	console.log(loaderData, 'loaderData');

	if (loaderData instanceof Error) {
		return (
			<main>
				<Text size="100" weight="100" tag="h3" role="alert">
					Error finding interpreter ID. Please contact MDC.
				</Text>
				<Text size="100" weight="100" tag="p">
					Error details: {loaderData.toString()}
				</Text>
			</main>
		);
	} else {
		return (
			<main>
				<Text size="100" weight="100" tag="h3" role="alert">
					Interpreter ID: {loaderData.toString()}
				</Text>
			</main>
		);
	}
}
