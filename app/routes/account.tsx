import type { Route } from './+types/account';

import { useOutletContext } from 'react-router';
import { Icon } from '~/components/01-atoms/icon/icon';
import { Text } from '~/components/01-atoms/text/text';
import { Card } from '~/components/02-molecules/card/card';
import { InlineCheckbox } from '~/components/02-molecules/inline-checkbox/inline-checkbox';
import { Form } from '~/components/03-organisms/form/form';
import type { TAccountLoaderData } from '~/components/04-layouts/account/account';
import styles from '../components/04-layouts/account/account.module.css';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'My account' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Account(data: Route.ComponentProps) {
	const loaderData = useOutletContext<TAccountLoaderData>();

	if (loaderData.fields)
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
									description: loaderData.fields.name,
								},
								{
									title: 'Email',
									description: loaderData.fields.email,
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
									description: loaderData.fields.regOrg,
								},
								{
									title: 'Registration number',
									description: loaderData.fields.regNum,
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
						>
							<InlineCheckbox
								label="As soon as a job goes live"
								id="job-post-emails"
								value="yes"
								defaultChecked={loaderData.fields.jobPost}
							/>
							<InlineCheckbox
								label="A daily summary"
								id="job-summary-emails"
								value="yes"
								defaultChecked={loaderData.fields.jobSummary}
							/>
						</Form>
					</Card.Content>
				</Card.Root>
			</>
		);
}
