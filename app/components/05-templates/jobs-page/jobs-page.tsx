import { Header } from '~/components/02-molecules/header/header';
import styles from './jobs-page.module.css';
import { JobsDisplay } from '~/components/04-layouts/jobs-display/jobs-display';
import type { TJobGrid } from '~/components/03-organisms/job-grid/job-grid';
import type { TMenu } from '~/components/02-molecules/menu/menu';

export type TJobsPage = {
	userName: string;
	jobs: TJobGrid;
	lastUpdated: string;
	menu: TMenu;
};

export const JobsPage: React.FC<TJobsPage> = ({
	userName,
	jobs,
	lastUpdated,
	menu,
}) => {
	return (
		<div className={styles.base} data-e2e-id="jobs-page">
			<Header userName={userName} />
			<JobsDisplay jobs={jobs} lastUpdated={lastUpdated} menu={menu} />
		</div>
	);
};
