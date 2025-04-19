import type { StoryObj, Meta } from '@storybook/react';

import { mockErrorSummaryData } from './error-summary.mock';

import { ErrorSummary as ErrorSummaryComponent } from './error-summary.tsx';

const meta: Meta<typeof ErrorSummaryComponent> = {
	title: '02-molecules/Error summary',
	component: ErrorSummaryComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ErrorSummaryComponent>;

export const ErrorSummary: Story = {
	args: mockErrorSummaryData,
	render: (args) => (
		<ErrorSummaryComponent className="errorSummary" {...args} />
	),
};
