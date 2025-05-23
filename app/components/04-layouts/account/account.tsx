import type { LoaderFunctionArgs } from 'react-router';

import { NavLink, Outlet, redirect, useLoaderData } from 'react-router';

import { getAirtableRecords } from '~/services/airtable';
import { getUser } from '~/services/supabase';
import { getSession } from '~/sessions.server';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Container } from '../container/container.tsx';

import styles from './account.module.css';
import { Header } from '~/components/02-molecules/header/header.tsx';

export type TAccount = React.PropsWithChildren;

export async function loader({ request, context }: LoaderFunctionArgs) {
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

		return { error: 'No ID found for user' };
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

		return { error: 'Interpreter ID not found' };
	}

	const name = airtableResponse?.records[0]?.fields['Name'] || '';

	return {
		name,
	};
}

export default function AccountLayout() {
	const loaderData = useLoaderData<typeof loader>();

	return (
		<>
			<Header username={loaderData.name} />

			<main id="main" className={styles.main}>
				<Container className={styles.container}>
					<Outlet context={loaderData} />
				</Container>
			</main>
		</>
	);
}
