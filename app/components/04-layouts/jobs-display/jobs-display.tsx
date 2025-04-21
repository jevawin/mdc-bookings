import { Menu, type TMenu } from '~/components/02-molecules/menu/menu';
import styles from './jobs-display.module.css';
import {
	JobGrid,
	type TJobGrid,
} from '~/components/03-organisms/job-grid/job-grid';
import clsx from 'clsx';
import { Text } from '~/components/01-atoms/text/text';
import { LinkButton } from '~/components/02-molecules/link-button/link-button';

export type TJobsDisplay = {
	menu: TMenu;
	jobs: TJobGrid;
	className?: string;
	lastUpdated: string;
};

export const JobsDisplay: React.FC<TJobsDisplay> = ({
	menu,
	jobs,
	className,
	lastUpdated,
}) => {
	return (
		<div
			className={clsx(styles.base, className)}
			data-e2e-id="jobs-display"
		>
			<Menu items={menu.items} />
			<Text
				size="100"
				weight="100"
				tag="p"
				className={styles.updatedTime}
			>
				Last updated: {lastUpdated}.&nbsp;
				<LinkButton
					onClick={() => location.reload()}
					text="Refresh now"
					icon="refresh"
				/>
			</Text>
			<JobGrid data={jobs.data} />
		</div>
	);
};
