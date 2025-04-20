import type { StoryObj, Meta } from '@storybook/react';

import { mockJobGridData } from './job-grid.mock';

import { JobGrid as JobGridComponent } from './job-grid.tsx';

const meta: Meta<typeof JobGridComponent> = {
	title: '03-organisms/Job grid',
	component: JobGridComponent,
	tags: ['autodocs'],
	argTypes: {},
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof JobGridComponent>;

export const JobGrid: Story = {
	args: mockJobGridData,
};
