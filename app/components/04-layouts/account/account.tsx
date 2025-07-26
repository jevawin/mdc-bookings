import type { LoaderFunctionArgs } from 'react-router';

import { NavLink, Outlet, redirect, useLoaderData } from 'react-router';

import { getAirtableRecords } from '~/.server/services/airtable.ts';
import { getUser } from '~/.server/services/supabase.ts';
import { getSession } from '~/.server/sessions.ts';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Header } from '~/components/02-molecules/header/header.tsx';
import { Container } from '../container/container.tsx';

import styles from './account.module.css';

export type TAccountLoaderData = {
	error?: string;
	fields: {
		record: string;
		email: string;
		jobPost?: boolean;
		jobSummary?: boolean;
		name: string;
		fullName: string;
		regNum: string;
		regOrg: string;
	} | null;
	greeting: string | null;
};

const getGreeting = (): 'Morning' | 'Afternoon' | 'Evening' => {
	// Morning, afternoon, evening greeting
	const today = new Date();
	const curHr = today.getHours();

	if (curHr < 12) return 'Morning';
	if (curHr < 18) return 'Afternoon';
	return 'Evening';
};

export async function loader({
	request,
	context,
}: LoaderFunctionArgs): Promise<Response | TAccountLoaderData> {
	const cookieHeader = request.headers.get('Cookie');
	const env = context.cloudflare.env;
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');
	const user = await getUser(env, token);

	// Redirect to login if not logged in
	if (!user.success) return redirect('/log-in');

	// Get interpreter ID and email from Supabase
	const userID = user?.data?.id;

	if (!userID) {
		console.error('No ID found for user');

		return {
			error: 'Interpreter ID not found in Supabase',
			fields: null,
			greeting: null,
		};
	}

	// Get user name from Airtable
	const airtableResponse = await getAirtableRecords(
		'Interpreters',
		env,
		[
			'Email',
			'Job post emails',
			'Job summary emails',
			'Preferred name',
			'Name',
			'Registration number',
			'Registration organisation',
		],
		`{User ID}="${userID}"`,
	);

	if (!airtableResponse || !airtableResponse.records) {
		console.error(`Interpreter ID not found in Airtable for ${userID}`);

		return {
			error: `Interpreter ID not found in Airtable for ${userID}`,
			fields: null,
			greeting: null,
		};
	}

	const fields = airtableResponse.records[0].fields;

	return {
		fields: {
			record: airtableResponse.records[0].id,
			email: fields['Email'],
			jobPost: fields['Job post emails'],
			jobSummary: fields['Job summary emails'],
			name: fields['Preferred name'],
			fullName: fields['Name'],
			regNum: fields['Registration number'],
			regOrg: fields['Registration organisation'],
		},
		greeting: getGreeting(),
	};
}

export default function AccountLayout(): React.ReactNode {
	const loaderData = useLoaderData<typeof loader>();

	if (!loaderData.fields) {
		// Log error
		if (loaderData.error) console.error(loaderData.error);

		// Tell user to call MDC
		return (
			<>
				<h1>Ooops, something's gone wrong.</h1>
				<p>Please call MDC.</p>
			</>
		);
	}

	return (
		<>
			<Header username={loaderData.fields.name} />

			<main id="main" className={styles.main}>
				<Container className={styles.container}>
					<div className={styles.greeting}>
						<Text
							tag="h1"
							size="400"
							weight="300"
							className={styles.cardTitle}
						>
							<Icon name="wave" />
							{loaderData.greeting}, {loaderData.fields.name}
						</Text>
						<NavLink to="/log-out" className={styles.logOut}>
							<Text size="200" weight="200">
								Log out
							</Text>
						</NavLink>
					</div>
					<div className={styles.cards}>
						<Outlet context={loaderData} />
					</div>
				</Container>
			</main>
		</>
	);
}
