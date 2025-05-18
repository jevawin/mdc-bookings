import type { StoryObj, Meta } from '@storybook/react';

import { mockAccountData } from './account.mock';

import { Account as AccountComponent } from './account.tsx';

const meta: Meta<typeof AccountComponent> = {
	title: '04-layouts/Account',
	component: AccountComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AccountComponent>;

export const Account: Story = {
	args: mockAccountData,
};
