import styles from './job-grid.module.css';
import type { TJobCard } from '../../02-molecules/job-card/job-card';
import { JobCard } from '../../02-molecules/job-card/job-card';
import clsx from 'clsx';
import type { TButtonVariant } from '~/components/02-molecules/button/button';

export type TJobGrid = {
	data: TJobCard[];
	className?: string;
	buttonVariant?: TButtonVariant;
};

export const JobGrid: React.FC<TJobGrid> = ({
	data,
	className,
	buttonVariant = 'apply',
}) => {
	return (
		<div className={clsx(className, styles.base)} data-e2e-id="jobs-table">
			{data.map((job) => (
				<JobCard
					key={job.id}
					id={job.id}
					service={job.service}
					specialism={job.specialism}
					dateTime={job.dateTime}
					location={job.location}
					description={job.description}
					buttonVariant={buttonVariant}
					className={job.className}
				/>
			))}
		</div>
	);
};
