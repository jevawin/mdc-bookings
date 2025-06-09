import type { StoryObj, Meta } from '@storybook/react-vite';
import type { TJobsDisplay } from './jobs-display.tsx';

import { mockJobsDisplayData } from './jobs-display.mock.ts';

import { JobsDisplay as JobsDisplayComponent } from './jobs-display.tsx';

const meta: Meta<TJobsDisplay> = {
	title: '03-organisms/Jobs display',
	component: JobsDisplayComponent.Root,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<TJobsDisplay>;

export const JobsDisplay: Story = {
	args: mockJobsDisplayData,
	render: (args) => (
		<JobsDisplayComponent.Root id={args.id}>
			<JobsDisplayComponent.Title id={args.id} title={args.title} />
		</JobsDisplayComponent.Root>
	),
};
