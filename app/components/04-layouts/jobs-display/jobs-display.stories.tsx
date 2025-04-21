import type { StoryObj, Meta } from '@storybook/react';

import { mockJobsDisplayData } from './jobs-display.mock';

import { JobsDisplay as JobsDisplayComponent } from './jobs-display.tsx';
import { MemoryRouter, Route, Routes } from 'react-router';

const meta: Meta<typeof JobsDisplayComponent> = {
	title: '04-layouts/Jobs display',
	component: JobsDisplayComponent,
	tags: ['autodocs'],
	argTypes: {},
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<Story />} />
				</Routes>
			</MemoryRouter>
		),
	],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof JobsDisplayComponent>;

export const JobsDisplay: Story = {
	args: mockJobsDisplayData,
};
