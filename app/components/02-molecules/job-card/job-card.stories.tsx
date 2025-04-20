import type { StoryObj, Meta } from '@storybook/react';

import { mockJobCardData } from './job-card.mock';

import { JobCard as JobCardComponent } from './job-card.tsx';

const meta: Meta<typeof JobCardComponent> = {
	title: '02-molecules/Job card',
	component: JobCardComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof JobCardComponent>;

export const JobCard: Story = {
	args: mockJobCardData,
};
