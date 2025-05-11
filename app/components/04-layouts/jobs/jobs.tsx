import type { LoaderFunctionArgs } from 'react-router';
import type { TMenuItem } from '~/components/02-molecules/menu/menu.tsx';

import {
	NavLink,
	Outlet,
	redirect,
	useLoaderData,
	useNavigation,
} from 'react-router';
import { getAirtableRecords } from '~/services/airtable.ts';
import { getUser } from '~/services/supabase.ts';
import { getSession } from '~/sessions.server.ts';

import { Container } from '../container/container.tsx';
import { Loader } from '~/components/01-atoms/loader/loader.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import {
	Button,
	ButtonContent,
} from '~/components/02-molecules/button/button.tsx';
import { Menu } from '~/components/02-molecules/menu/menu.tsx';

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
		lastUpdated: new Date().toLocaleString('en-GB'),
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
			<header className={styles.header}>
				<Container className={styles.headerContainer}>
					<Text
						tag="h2"
						weight="200"
						size="400"
						className={styles.title}
					>
						<img
							src="/assets/logo.svg"
							alt=""
							className={styles.logo}
						/>
						MDC
					</Text>

					<Text
						tag="p"
						size="200"
						weight="100"
						className={styles.userName}
					>
						<Icon
							name="user"
							size={19}
							className={styles.userIcon}
						/>

						{loaderData.name}
					</Text>

					<nav className={styles.nav} aria-label="Main">
						<ul className={styles.list}>
							<li className={styles.listItem}>
								<NavLink to="/jobs" className={styles.navLink}>
									<Text
										tag="span"
										size="200"
										weight="200"
										role="presentation"
									>
										Jobs
									</Text>
								</NavLink>
							</li>

							<li className={styles.listItem}>
								<NavLink
									to="/account"
									className={styles.navLink}
								>
									<Text
										tag="span"
										size="200"
										weight="200"
										role="presentation"
									>
										Account
									</Text>
								</NavLink>
							</li>
						</ul>
					</nav>
				</Container>
			</header>

			<main id="main" className={styles.main}>
				<Container className={styles.mainContainer}>
					<Menu items={menuItems} />

					<div className={styles.lastUpdated}>
						<Button
							size="small"
							variant="secondary"
							onClick={() => location.reload()}
						>
							<ButtonContent.Icon name="refresh" size={14} />
							<ButtonContent.Text>Refresh</ButtonContent.Text>
						</Button>

						<Text
							size="100"
							weight="100"
							tag="p"
							className={styles.updatedTime}
						>
							Last updated: {loaderData.lastUpdated}.
						</Text>
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
