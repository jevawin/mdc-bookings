import styles from './job-card.module.css';
import { Button, ButtonContent, type TButtonVariant } from '../button/button';
import { JobFieldGroup } from './components/job-field-group';
import clsx from 'clsx';
import { LinkButton } from '../link-button/link-button';

export type TJobCard = {
	id: string;
	service: string;
	specialism: string;
	dateTime: string;
	location: string;
	description: string;
	buttonVariant?: TButtonVariant;
	className?: string;
};

export const JobCard: React.FC<TJobCard> = ({
	id,
	service,
	specialism,
	dateTime,
	location,
	description,
	buttonVariant = 'apply',
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
		<div className={clsx(styles.base, className)} data-e2e-id="jobs-table">
			<JobFieldGroup header="Job #" content={id} />
			<Button variant={buttonVariant}>
				<ButtonContent.Icon name="pencil" />
				<ButtonContent.Text>Apply</ButtonContent.Text>
			</Button>
			<JobFieldGroup header="Service" content={service} />
			<JobFieldGroup header="Specialism" content={specialism} />
			<JobFieldGroup header="Date" content={date} />
			<JobFieldGroup header="Time" content={time} />
			<details className={styles.dataFullWidthSection}>
				<summary>
					<LinkButton
						text="More details"
						icon="chevron-down"
						icon_size={24}
						styleOnly={true}
					/>
				</summary>
				<div className={styles.detailsContent}>
					<JobFieldGroup header="Location" content={location} />
					<JobFieldGroup header="Description" content={description} />
				</div>
			</details>
		</div>
	);
};
