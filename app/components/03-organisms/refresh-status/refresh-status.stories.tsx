import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockRefreshStatusData } from './refresh-status.mock';

import { RefreshStatus as RefreshStatusComponent } from './refresh-status.tsx';

const meta: Meta<typeof RefreshStatusComponent> = {
	title: '03-organisms/Refresh status',
	component: RefreshStatusComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RefreshStatusComponent>;

export const RefreshStatus: Story = {
	args: mockRefreshStatusData,
};
