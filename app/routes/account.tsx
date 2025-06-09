import type { Route } from './+types/account.ts';
import type { TGetUser } from '~/services/supabase.ts';
import type { TAccountLoaderData } from '~/components/04-layouts/account/account.tsx';

import { clsx } from 'clsx';
import { redirect, useNavigation, useOutletContext } from 'react-router';
import { updateAirtableRecords } from '~/services/airtable.ts';
import { getSession } from '~/sessions.server.ts';
import { getUser } from '~/services/supabase.ts';

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
	context,
}: Route.ActionArgs): Promise<TAccountAction> => {
	const env = context.cloudflare.env;
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
		await updateAirtableRecords('Interpreters', env, airtableData);

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
	context,
}: Route.LoaderArgs): Promise<TGetUser | Response> => {
	const env = context.cloudflare.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);

	const access_token = session.get('access_token');
	const expires_at = session.get('expires_at');
	const refresh_token = session.get('refresh_token');
	const now = Math.floor(Date.now() / 1000);
	const isExpired = !expires_at || now > expires_at;

	if (!access_token || !refresh_token || isExpired) {
		return redirect('/log-in');
	}

	const user = await getUser(env, access_token);

	if (!user.success) {
		return redirect('/log-in');
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
			<title>My account</title>
			<meta name="description" content="DESCRIPTION OF YOUR ROUTE." />

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
