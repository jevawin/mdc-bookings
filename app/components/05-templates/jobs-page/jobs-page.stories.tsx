import type { StoryObj, Meta } from '@storybook/react';

import { mockJobsPageData } from './jobs-page.mock';

import { JobsPage as JobsPageComponent } from './jobs-page.tsx';
import { MemoryRouter, Route, Routes } from 'react-router';

const meta: Meta<typeof JobsPageComponent> = {
	title: '05-templates/Jobs page',
	component: JobsPageComponent,
	tags: ['autodocs'],
	argTypes: {},
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={['/jobs']}>
				<Routes>
					<Route path="/jobs" element={<Story />} />
				</Routes>
			</MemoryRouter>
		),
	],
};

export default meta;
type Story = StoryObj<typeof JobsPageComponent>;

export const JobsPage: Story = {
	args: mockJobsPageData,
};
