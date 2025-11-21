import type { Route } from './+types/account.ts';
import type { TGetUser } from '~/.server/services/supabase.ts';
import type { TAccountLoaderData } from '~/components/04-layouts/account/account.tsx';

import { clsx } from 'clsx';
import { redirect, useNavigation, useOutletContext } from 'react-router';
import { updateAirtableRecords } from '~/.server/services/airtable.ts';
import {
	commitSession,
	destroySession,
	getSession,
} from '~/.server/sessions.ts';
import { getUser, refreshAccessToken } from '~/.server/services/supabase.ts';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Card } from '~/components/02-molecules/card/card.tsx';
import { InlineCheckbox } from '~/components/02-molecules/inline-checkbox/inline-checkbox.tsx';
import { Form } from '~/components/03-organisms/form/form.tsx';

import styles from '../components/04-layouts/account/account.module.css';

type TAccountAction = {
	success: boolean;
	message: string;
};

export const action = async ({
	request,
}: Route.ActionArgs): Promise<TAccountAction> => {
	const env = process.env;
	const formData = await request.formData();

	// Get form fields
	const isJobPostSelected = formData.get('jobPostEmails') !== null;
	const isJobSummarySelected = formData.get('jobSummaryEmails') !== null;
	const record = formData.get('record')?.toString();

	// Error if no record
	if (!record) {
		return {
			success: false,
			message: 'Something went wrong, please call MDC!',
		};
	}

	// Prep for airtable
	const airtableData = [
		{
			id: record,
			fields: {
				'Job post emails': isJobPostSelected,
				'Job summary emails': isJobSummarySelected,
			},
		},
	];

	// Update airtable
	try {
		await updateAirtableRecords('Interpreters', airtableData);

		return {
			success: true,
			message: 'Saved!',
		};
	} catch (error) {
		console.error('updateAirtableRecords error:', error);

		return {
			success: false,
			message: 'Something went wrong, please call MDC!',
		};
	}
};

export const loader = async ({
	request,
}: Route.LoaderArgs): Promise<TGetUser | Response> => {
	const env = process.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);

	const access_token = session.get('access_token');
	const refresh_token = session.get('refresh_token');
	const expires_at = session.get('expires_at');
	const now = Math.floor(Date.now() / 1000);
	const isExpired = !expires_at || now > expires_at;

	// If no token at all → force login
	if (!access_token && !refresh_token) {
		return redirect('/log-in');
	}

	let tokenToUse = access_token;

	// Try refresh if expired
	if (isExpired && refresh_token) {
		const refreshResult = await refreshAccessToken(refresh_token);

		if (refreshResult.success) {
			const newTokens = refreshResult.data;
			session.set('access_token', newTokens.access_token);
			session.set('refresh_token', newTokens.refresh_token);
			session.set('expires_at', newTokens.expires_at);

			tokenToUse = newTokens.access_token;

			// Important: commit updated session
			return redirect(request.url, {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});
		} else {
			return redirect('/log-in', {
				headers: {
					'Set-Cookie': await destroySession(session),
				},
			});
		}
	}

	// Validate user with Supabase
	const user = await getUser(tokenToUse);
	if (!user.success) {
		return redirect('/log-in', {
			headers: {
				'Set-Cookie': await destroySession(session),
			},
		});
	}

	return user;
};

export default function Account({
	actionData,
}: Route.ComponentProps): React.ReactNode {
	const loaderData = useOutletContext<TAccountLoaderData>();
	const navigation = useNavigation();
	const fields = loaderData.fields;
	const isSubmitting = navigation.state === 'submitting';

	if (!fields) return null;

	return (
		<>
			<title>My account | Manchester Deaf Centre booking system</title>
			<meta
				name="description"
				content="Manage your account settings and preferences."
			/>

			<Card.Root id="personal">
				<Card.Content>
					<Text
						tag="h2"
						weight="300"
						size="300"
						className={styles.cardTitle}
					>
						<Icon name="user" />
						Personal
					</Text>

					<Card.DescriptionList
						items={[
							{
								title: 'Name',
								description: fields.fullName,
							},
							{
								title: 'Email',
								description: fields.email,
							},
						]}
					/>

					<Card.TextLink
						href="/reset-password/new"
						label="Change password"
					/>
				</Card.Content>
			</Card.Root>

			<Card.Root id="registration">
				<Card.Content>
					<Text
						tag="h2"
						weight="300"
						size="300"
						className={styles.cardTitle}
					>
						<Icon name="building" />
						Organisation
					</Text>

					<Card.DescriptionList
						items={[
							{
								title: 'Registered body',
								description: fields.regOrg,
							},
							{
								title: 'Registration number',
								description: fields.regNum,
							},
						]}
					/>
				</Card.Content>
			</Card.Root>

			<Card.Root id="notifications">
				<Card.Content>
					<Text
						tag="h2"
						weight="300"
						size="300"
						className={styles.cardTitle}
					>
						<Icon name="bell" />
						Notifications
					</Text>

					<Form
						title="notification settings"
						id="notification-settings"
						method="POST"
						submitButtonText="Save preferences"
					>
						<InlineCheckbox
							label="As soon as a job goes live"
							id="job-post-emails"
							name="jobPostEmails"
							value="yes"
							defaultChecked={fields.jobPost}
						/>

						<InlineCheckbox
							label="A daily summary"
							id="job-summary-emails"
							name="jobSummaryEmails"
							value="yes"
							defaultChecked={fields.jobSummary}
						/>

						<input
							type="hidden"
							name="record"
							value={fields.record}
						/>
					</Form>

					{actionData && !isSubmitting ? (
						<Text
							tag="p"
							size="200"
							weight="200"
							className={clsx(
								actionData.success
									? styles.success
									: styles.error,
								styles.submitMessage,
							)}
							aria-live="assertive"
							role="alert"
						>
							{actionData.message}
						</Text>
					) : null}
				</Card.Content>
			</Card.Root>
		</>
	);
}
