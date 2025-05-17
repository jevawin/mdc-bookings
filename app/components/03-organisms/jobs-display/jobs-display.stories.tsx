import type { StoryObj, Meta } from '@storybook/react';

import { mockJobsDisplayData } from './jobs-display.mock';

import { JobsDisplay as JobsDisplayComponent } from './jobs-display.tsx';

const meta: Meta<typeof JobsDisplayComponent> = {
	title: '03-organisms/Jobs display',
	component: JobsDisplayComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof JobsDisplayComponent>;

export const JobsDisplay: Story = {
	args: mockJobsDisplayData,
};
