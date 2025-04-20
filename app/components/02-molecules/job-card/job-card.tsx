import { Text } from '~/components/01-atoms/text/text';
import styles from './job-card.module.css';
import { Button, ButtonContent, type TButtonVariant } from '../button/button';
import { TextLink } from '~/components/01-atoms/text-link/text-link';

export type TJobCard = {
	id: string;
	service: string;
	specialism: string;
	dateTime: string;
	location: string;
	description: string;
	buttonVariant: TButtonVariant;
};

export const JobCard: React.FC<TJobCard> = ({
	id,
	service,
	specialism,
	dateTime,
	location,
	description,
	buttonVariant = 'apply',
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
		<div className={styles.base} data-e2e-id="jobs-table">
			<div data-id="id" className={styles.dataFieldGroup}>
				<Text size="100" weight="300" tag="h2" className={styles.data}>
					Job #:
				</Text>
				<Text size="100" weight="100" tag="p" className={styles.data}>
					{id}
				</Text>
			</div>
			<div data-id="button" className={styles.dataFieldGroup}>
				<Button variant={buttonVariant}>
					<ButtonContent.Icon name="pencil" />
					<ButtonContent.Text>Apply</ButtonContent.Text>
				</Button>
			</div>
			<div data-id="service" className={styles.dataFieldGroup}>
				<Text size="100" weight="300" tag="h2" className={styles.data}>
					Service:
				</Text>
				<Text size="100" weight="100" tag="p" className={styles.data}>
					{service}
				</Text>
			</div>
			<div data-id="specialism" className={styles.dataFieldGroup}>
				<Text size="100" weight="300" tag="h2" className={styles.data}>
					Specialism:
				</Text>
				<Text size="100" weight="100" tag="p" className={styles.data}>
					{specialism}
				</Text>
			</div>
			<div data-id="date" className={styles.dataFieldGroup}>
				<Text size="100" weight="300" tag="h2" className={styles.data}>
					Date:
				</Text>
				<Text size="100" weight="100" tag="p" className={styles.data}>
					{date}
				</Text>
			</div>{' '}
			<div data-id="time" className={styles.dataFieldGroup}>
				<Text size="100" weight="300" tag="h2" className={styles.data}>
					Time:
				</Text>
				<Text size="100" weight="100" tag="p" className={styles.data}>
					{time}
				</Text>
			</div>
			<div data-id="more-details" className={styles.dataFullWidthSection}>
				<Text size="100" weight="300" tag="h2" className={styles.data}>
					More details V
				</Text>
				<div data-id="location" className={styles.dataFieldGroup}>
					<Text
						size="100"
						weight="300"
						tag="h2"
						className={styles.data}
					>
						Location:
					</Text>
					<Text
						size="100"
						weight="100"
						tag="p"
						className={styles.data}
					>
						{location}
					</Text>
				</div>
				<div data-id="description" className={styles.dataFieldGroup}>
					<Text
						size="100"
						weight="300"
						tag="h2"
						className={styles.data}
					>
						Description:
					</Text>
					<Text
						size="100"
						weight="100"
						tag="p"
						className={styles.data}
					>
						{description}
					</Text>
				</div>
			</div>
		</div>
	);
};
