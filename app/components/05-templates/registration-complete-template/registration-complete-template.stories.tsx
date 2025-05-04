import type { StoryObj, Meta } from '@storybook/react';

import { mockRegistrationCompleteTemplateData } from './registration-complete-template.mock';

import { RegistrationCompleteTemplate as RegistrationCompleteTemplateComponent } from './registration-complete-template.tsx';

const meta: Meta<typeof RegistrationCompleteTemplateComponent> = {
	title: '05-templates/Registration complete template',
	component: RegistrationCompleteTemplateComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RegistrationCompleteTemplateComponent>;

export const RegistrationCompleteTemplate: Story = {
	args: mockRegistrationCompleteTemplateData,
};
