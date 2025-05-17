import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';
import type { TButtonVariant } from '~/components/02-molecules/button/button.tsx';
import type { TJobCard } from '~/components/02-molecules/job-card/job-card.tsx';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { JobCard } from '~/components/02-molecules/job-card/job-card.tsx';

import styles from './jobs-page.module.css';

type TJobsPageCta = {
	variant?: TButtonVariant;
	icon: TIconName;
	text: string;
};

export type TJobsPage = {
	type: 'applied' | 'approved' | 'open';
	jobs: TJobCard[];
};

export const JobsPage: React.FC<TJobsPage> = ({ type, jobs }) => {
	const pastJobs = jobs.filter((job) => job.isPast);
	const currentJobs = jobs.filter((job) => !job.isPast);

	const isApproved = type === 'approved';
	const isOpen = type === 'open';
	const currentJobsCTA: TJobsPageCta = {
		icon: isOpen ? 'pencil' : 'cross',
		text: isOpen ? 'Apply' : 'Revoke',
		variant: isOpen ? 'apply' : 'revoke',
	};

	return (
		<>
			<Text
				size="300"
				tag="h3"
				weight="300"
				className={styles.centerAlignedText}
			>
				<Icon name="clock-rotate" size={19} />
				Upcoming jobs:
			</Text>

			{currentJobs.length > 0 ? (
				<ul className={styles.jobs}>
					{currentJobs.map((job) => (
						<li key={job.id}>
							<JobCard
								record={job.record}
								id={job.id}
								service={job.service}
								specialism={job.specialism}
								dateTime={job.dateTime}
								location={job.location}
								description={job.description}
								cta={
									!isApproved
										? currentJobsCTA
										: {
												icon: 'calendar-plus',
												text: 'Add to calendar',
												variant: 'primary',
											}
								}
							/>
						</li>
					))}
				</ul>
			) : (
				<Text size="200" weight="200" tag="p">
					No upcoming jobs.
				</Text>
			)}

			{isApproved && pastJobs.length > 0 ? (
				<>
					<Text
						size="300"
						tag="h3"
						weight="300"
						className={styles.centerAlignedText}
					>
						<Icon name="calendar-check" size={19} />
						Past jobs:
					</Text>

					<ul className={styles.jobs}>
						{pastJobs.map((job) => (
							<li key={job.id}>
								<JobCard
									record={job.record}
									id={job.id}
									service={job.service}
									specialism={job.specialism}
									dateTime={job.dateTime}
									location={job.location}
									description={job.description}
									cta={{
										icon: 'calendar-plus',
										text: 'Add to calendar',
										variant: 'inactive',
									}}
								/>
							</li>
						))}
					</ul>
				</>
			) : isApproved && pastJobs.length === 0 ? (
				<>
					<Text
						size="300"
						tag="h3"
						weight="300"
						className={styles.centerAlignedText}
					>
						<Icon name="calendar-check" size={19} />
						Past jobs:
					</Text>

					<Text size="200" weight="200" tag="p">
						No past jobs.
					</Text>
				</>
			) : null}
		</>
	);
};
