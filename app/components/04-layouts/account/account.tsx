import {
	NavLink,
	Outlet,
	redirect,
	useLoaderData,
	type LoaderFunctionArgs,
} from 'react-router';
import { Icon } from '~/components/01-atoms/icon/icon';
import { Text } from '~/components/01-atoms/text/text';
import { getAirtableRecords } from '~/services/airtable';
import { getUser } from '~/services/supabase';
import { getSession } from '~/sessions.server';
import { Container } from '../container/container';
import styles from './account.module.css';

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
								<NavLink
									to="/jobs/open"
									className={styles.navLink}
								>
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
					<Outlet context={loaderData} />
				</Container>
			</main>
		</>
	);
}
