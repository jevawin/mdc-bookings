import type { StoryObj, Meta } from '@storybook/react';

import { mockRegistrationFormTemplateData } from './registration-form-template.mock';

import { RegistrationFormTemplate as RegistrationFormTemplateComponent } from './registration-form-template.tsx';

const meta: Meta<typeof RegistrationFormTemplateComponent> = {
	title: '05-templates/Registration form template',
	component: RegistrationFormTemplateComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RegistrationFormTemplateComponent>;

export const RegistrationFormTemplate: Story = {
	args: mockRegistrationFormTemplateData,
};
