import type { Route } from './+types/account';

import clsx from 'clsx';
import { useNavigation, useOutletContext } from 'react-router';
import { Icon } from '~/components/01-atoms/icon/icon';
import { Text } from '~/components/01-atoms/text/text';
import { Card } from '~/components/02-molecules/card/card';
import { InlineCheckbox } from '~/components/02-molecules/inline-checkbox/inline-checkbox';
import { Form } from '~/components/03-organisms/form/form';
import type { TAccountLoaderData } from '~/components/04-layouts/account/account';
import { updateAirtableRecords } from '~/services/airtable';
import styles from '../components/04-layouts/account/account.module.css';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'My account' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export async function action({
	request,
	context,
}: Route.ActionArgs): Promise<{ success: boolean; message: string }> {
	const env = context.cloudflare.env;
	const formData = await request.formData();

	// Get form fields
	const isJobPostSelected = formData.get('jobPostEmails') !== null;
	const isJobSummarySelected = formData.get('jobSummaryEmails') !== null;
	const record = formData.get('record')?.toString();

	// Error if no record
	if (!record)
		return {
			success: false,
			message: 'Something went wrong, please call MDC!',
		};

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
		console.error(error);
		return {
			success: false,
			message: 'Something went wrong, please call MDC!',
		};
	}
}

export default function Account({ actionData }: Route.ComponentProps) {
	const loaderData = useOutletContext<TAccountLoaderData>();
	const fields = loaderData.fields;
	const navigation = useNavigation();
	const isSubmitting = navigation.state !== 'idle';

	if (fields)
		return (
			<>
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
