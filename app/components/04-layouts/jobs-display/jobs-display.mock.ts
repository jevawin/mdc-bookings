import type { TJobsDisplay } from './jobs-display.tsx';
import { mockMenuData } from '~/components/02-molecules/menu/menu.mock.ts';
import { mockJobGridData } from '~/components/03-organisms/job-grid/job-grid.mock.ts';

export const mockJobsDisplayData: TJobsDisplay = {
	menu: mockMenuData,
	jobs: mockJobGridData,
	className: 'previewMode',
	lastUpdated: '21st April, 2025 at 12:43 PM',
};
