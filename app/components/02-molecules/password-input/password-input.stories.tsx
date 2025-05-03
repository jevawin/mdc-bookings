import type { StoryObj, Meta } from '@storybook/react';

import { PasswordInput as PasswordInputComponent } from './password-input.tsx';
import { mockPasswordInputData } from './password-input.mock.ts';

const meta: Meta<typeof PasswordInputComponent> = {
	title: '02-molecules/Password input',
	component: PasswordInputComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PasswordInputComponent>;

export const PasswordInput: Story = {
	args: mockPasswordInputData,
	render: (args) => <PasswordInputComponent className="field" {...args} />,
};
