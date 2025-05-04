import { mockJobsDisplayData } from '~/components/04-layouts/jobs-display/jobs-display.mock.ts';
import type { TJobsPage } from './jobs-page.tsx';
import { mockMenuData } from '~/components/02-molecules/menu/menu.mock.ts';

export const mockJobsPageData: TJobsPage = {
	userName: 'John Doe',
	jobs: mockJobsDisplayData.jobs,
	lastUpdated: mockJobsDisplayData.lastUpdated,
	menu: mockMenuData,
};
