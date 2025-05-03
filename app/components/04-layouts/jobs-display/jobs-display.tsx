import { Menu, type TMenu } from '~/components/02-molecules/menu/menu';
import styles from './jobs-display.module.css';
import {
	JobGrid,
	type TJobGrid,
} from '~/components/03-organisms/job-grid/job-grid';
import clsx from 'clsx';
import { Text } from '~/components/01-atoms/text/text';
import { Button, ButtonContent } from '~/components/02-molecules/button/button';

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
			<div className={styles.lastUpdated}>
				<Button
					size="small"
					variant="secondary"
					onClick={() => location.reload()}
				>
					<ButtonContent.Icon name="refresh" size={14} />
					<ButtonContent.Text>Refresh</ButtonContent.Text>
				</Button>
				<Text
					size="100"
					weight="100"
					tag="p"
					className={styles.updatedTime}
				>
					Last updated: {lastUpdated}.&nbsp;
				</Text>
			</div>
			<JobGrid data={jobs.data} />
		</div>
	);
};
