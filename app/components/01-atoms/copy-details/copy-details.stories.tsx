import type { StoryObj, Meta } from '@storybook/react-vite';
import type { TCopyDetails } from './copy-details.tsx';
import type { TMockCopyDetails } from './copy-details.mock.ts';

import { mockCopyDetailsData } from './copy-details.mock.ts';

import { CopyDetails as CopyDetailsComponent } from './copy-details.tsx';

const meta: Meta<TCopyDetails<TMockCopyDetails>> = {
	title: '01-atoms/Copy details',
	component: CopyDetailsComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<TCopyDetails<TMockCopyDetails>>;

export const CopyDetails: Story = {
	args: mockCopyDetailsData,
};
