import type { StoryObj, Meta } from '@storybook/react';

import { mockRegistrationCompleteTemplateData } from './registration-complete-template.mock';

import { RegistrationCompleteTemplate as RegistrationCompleteTemplateComponent } from './registration-complete-template.tsx';

const meta: Meta<typeof RegistrationCompleteTemplateComponent> = {
	title: '05-templates/Registration complete',
	component: RegistrationCompleteTemplateComponent,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RegistrationCompleteTemplateComponent>;

export const RegistrationComplete: Story = {
	args: mockRegistrationCompleteTemplateData,
	render: (args) => (
		<div className="registrationForm">
			<RegistrationCompleteTemplateComponent {...args} />
		</div>
	),
};
