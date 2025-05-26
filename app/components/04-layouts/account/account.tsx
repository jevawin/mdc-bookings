import type { LoaderFunctionArgs } from 'react-router';

import { Outlet, redirect, useLoaderData } from 'react-router';

import { getAirtableRecords } from '~/services/airtable';
import { getUser } from '~/services/supabase';
import { getSession } from '~/sessions.server';

import { Container } from '../container/container.tsx';

import { Header } from '~/components/02-molecules/header/header.tsx';
import styles from './account.module.css';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';

export type TAccountLoaderData = {
	error?: string;
	fields: {
		email: string;
		jobPost?: boolean;
		jobSummary?: boolean;
		name: string;
		regNum: string;
		regOrg: string;
	} | null;
	greeting: string | null;
};

const getGreeting = () => {
	// Morning, afternoon, evening greeting
	var today = new Date();
	var curHr = today.getHours();

	if (curHr < 12) return 'morning';
	if (curHr < 18) return 'afternoon';
	return 'evening';
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
			email: fields['Email'],
			jobPost: fields['Job post emails'],
			jobSummary: fields['Job summary emails'],
			name: fields['Name'],
			regNum: fields['Registration number'],
			regOrg: fields['Registration organisation'],
		},
		greeting: getGreeting(),
	};
}

export default function AccountLayout() {
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
					<Text
						tag="h1"
						size="400"
						weight="300"
						className={styles.cardTitle}
					>
						<Icon name="wave" />
						Good {loaderData.greeting}, {loaderData.fields.name}
					</Text>
					<div className={styles.cards}>
						<Outlet context={loaderData} />
					</div>
				</Container>
			</main>
		</>
	);
}
