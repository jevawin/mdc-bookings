import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button as ButtonComponent, ButtonContent } from './button.tsx';

const meta: Meta<typeof ButtonComponent> = {
	title: '02-molecules/Button',
	component: ButtonComponent,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			description: 'Controls the colour of the cta',
			options: ['primary', 'secondary', 'apply', 'revoke'],
			control: 'select',
			table: {
				type: {
					summary: 'string',
				},
			},
		},
		size: {
			description: 'Controls the size of the cta',
			options: ['small', 'medium', 'large'],
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

export const Primary: Story = {
	args: {
		variant: 'primary',
	},
	render: (args) => (
		<ButtonComponent {...args}>
			<ButtonContent.Text>Primary button</ButtonContent.Text>
		</ButtonComponent>
	),
};

export const LargePrimary: Story = {
	args: {
		variant: 'primary',
		size: 'large',
	},
	render: (args) => (
		<ButtonComponent {...args}>
			<ButtonContent.Text>Large primary button</ButtonContent.Text>
		</ButtonComponent>
	),
};

export const SmallSecondaryWithIcon: Story = {
	args: {
		variant: 'secondary',
		size: 'small',
	},
	render: (args) => (
		<ButtonComponent {...args}>
			<ButtonContent.Icon name="refresh" size={14} />
			<ButtonContent.Text>Small secondary button</ButtonContent.Text>
		</ButtonComponent>
	),
};

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
