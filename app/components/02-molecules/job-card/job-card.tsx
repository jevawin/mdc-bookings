import styles from './job-card.module.css';
import { Button, ButtonContent, type TButtonVariant } from '../button/button';
import { JobFieldGroup } from './components/job-field-group';
import clsx from 'clsx';
import { Text } from '~/components/01-atoms/text/text';
import { Icon, type TIconName } from '~/components/01-atoms/icon/icon';

type TJobCardCta = {
	variant?: TButtonVariant;
	icon: TIconName;
	text: string;
};

export type TJobCard = {
	id: string;
	service: string;
	specialism: string;
	dateTime: string;
	location: string;
	description: string;
	cta?: TJobCardCta;
	className?: string;
	isPast?: boolean;
};

export const JobCard: React.FC<TJobCard> = ({
	id,
	service,
	specialism,
	dateTime,
	location,
	description,
	cta,
	className,
}) => {
	// date time sent as ISO string
	const dateTimeD = new Date(dateTime);

	// convert to local date
	const date = dateTimeD.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	// convert to local time
	const time = dateTimeD.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<article
			className={clsx(styles.base, className)}
			data-e2e-id="jobs-table"
		>
			<JobFieldGroup header="Job #" content={id} />

			{cta ? (
				<Button variant={cta?.variant}>
					<ButtonContent.Icon name={cta.icon} />
					<ButtonContent.Text>{cta.text}</ButtonContent.Text>
				</Button>
			) : null}

			<JobFieldGroup header="Service" content={service} />
			<JobFieldGroup header="Specialism" content={specialism} />
			<JobFieldGroup header="Date" content={date} />
			<JobFieldGroup header="Time" content={time} />

			<details className={styles.dataFullWidthSection}>
				<summary>
					<Text
						size="100"
						weight="300"
						tag="h2"
						className={styles.moreDetailsTitle}
					>
						More details
					</Text>
					<Icon
						name="chevron-down"
						className={styles.chevron}
						size={28}
					/>
				</summary>

				<div className={styles.detailsContent}>
					<JobFieldGroup header="Location" content={location} />
					<JobFieldGroup header="Description" content={description} />
				</div>
			</details>
		</article>
	);
};
