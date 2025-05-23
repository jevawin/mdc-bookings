import type { LoaderFunctionArgs } from 'react-router';
import type { TMenuItem } from '~/components/02-molecules/menu/menu.tsx';

import { Outlet, redirect, useLoaderData, useNavigation } from 'react-router';
import { getAirtableRecords } from '~/services/airtable.ts';
import { getUser } from '~/services/supabase.ts';
import { getSession } from '~/sessions.server.ts';

import { Loader } from '~/components/01-atoms/loader/loader.tsx';
import { Menu } from '~/components/02-molecules/menu/menu.tsx';
import { Header } from '~/components/02-molecules/header/header.tsx';
import { RefreshStatus } from '~/components/03-organisms/refresh-status/refresh-status.tsx';
import { Container } from '../container/container.tsx';

import styles from './jobs.module.css';

const menuItems: TMenuItem[] = [
	{
		icon: 'list',
		label: 'Open',
		href: '/jobs/open',
	},
	{
		icon: 'clipboard-check',
		label: 'Applied',
		href: '/jobs/applied',
	},
	{
		icon: 'calendar-plus',
		label: 'Approved',
		href: '/jobs/approved',
	},
];

export async function loader({ request, context }: LoaderFunctionArgs) {
	const env = context.cloudflare.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');
	const user = await getUser(env, token);

	const date = new Date();
	const lastUpdated = date.toISOString();
	const lastUpdatedDisplay = date.toLocaleString('en-GB');

	// Redirect to login if not logged in
	if (!user.success) return redirect('/log-in');

	// Get interpreter ID and email from Supabase
	const userID = user?.data?.id;

	if (!userID) {
		console.error('No ID found for user');

		return {
			error: 'No ID found for user',
			lastUpdated,
			lastUpdatedDisplay,
		};
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

		return {
			error: 'Interpreter ID not found',
			lastUpdated,
			lastUpdatedDisplay,
		};
	}

	const name = airtableResponse?.records[0]?.fields['Name'] || '';

	return {
		name,
		lastUpdated: date.toISOString(),
		lastUpdatedDisplay: date.toLocaleString('en-GB'),
	};
}

export default function JobsLayout() {
	const loaderData = useLoaderData<typeof loader>();
	const navigation = useNavigation();

	const isNavigating = Boolean(navigation.location);

	if (loaderData.error) {
		return <div>Awww nahhh!!</div>;
	}

	return (
		<>
			<Header username={loaderData.name} />

			<main id="main" className={styles.main}>
				<Container className={styles.container}>
					<div className={styles.meta}>
						<Menu items={menuItems} />

						<RefreshStatus
							dateTime={loaderData.lastUpdated}
							displayDateTime={loaderData.lastUpdatedDisplay}
						/>
					</div>

					{isNavigating ? (
						<Loader size={150} className={styles.loader} />
					) : (
						<Outlet />
					)}
				</Container>
			</main>
		</>
	);
}
