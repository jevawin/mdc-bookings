import type { StoryObj, Meta } from '@storybook/react';

import { mockButtonData } from './button.mock.ts';

import { Button as ButtonComponent, ButtonContent } from './button.tsx';

const meta: Meta<typeof ButtonComponent> = {
	title: '02-molecules/Button',
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

export const Apply: Story = {
	args: {
		variant: 'apply',
	},
	render: (args) => (
		<ButtonComponent {...args}>
			<ButtonContent.Icon name="pencil" />
			<ButtonContent.Text>Apply</ButtonContent.Text>
		</ButtonComponent>
	),
};

export const Revoke: Story = {
	args: {
		variant: 'revoke',
	},
	render: (args) => (
		<ButtonComponent {...args}>
			<ButtonContent.Icon name="cross" />
			<ButtonContent.Text>Revoke</ButtonContent.Text>
		</ButtonComponent>
	),
};
