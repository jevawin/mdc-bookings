import type { StoryObj, Meta } from '@storybook/react';

import { mockButtonData } from './button.mock';

import { Button as ButtonComponent } from './button.tsx';

const meta: Meta<typeof ButtonComponent> = {
	title: '01-atoms/Button',
	component: ButtonComponent,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			description: 'Controls the colour of the cta',
			options: ['apply', 'revoke'],
			control: 'select',
			table: {
				type: {
					summary: 'string',
				},
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

export const Button: Story = {
	args: mockButtonData,
};
