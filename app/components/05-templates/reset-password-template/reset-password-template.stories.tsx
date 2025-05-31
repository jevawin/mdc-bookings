import type { StoryObj, Meta } from '@storybook/react';

import { mockResetPasswordTemplateData } from './reset-password-template.mock';

import { ResetPasswordTemplate as ResetPasswordTemplateComponent } from './reset-password-template.tsx';

const meta: Meta<typeof ResetPasswordTemplateComponent> = {
	title: '05-templates/Reset password template',
	component: ResetPasswordTemplateComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ResetPasswordTemplateComponent>;

export const ResetPasswordTemplate: Story = {
	args: mockResetPasswordTemplateData,
};
