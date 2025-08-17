import type { StoryObj, Meta } from '@storybook/react-vite';
import type { TCopyDetails } from './copy-details.tsx';

import { mockCopyDetailsData } from './copy-details.mock.ts';

import { CopyDetails as CopyDetailsComponent } from './copy-details.tsx';

const meta: Meta<TCopyDetails> = {
	title: '02-molecules/Copy details',
	component: CopyDetailsComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<TCopyDetails>;

export const CopyDetails: Story = {
	args: mockCopyDetailsData,
};
