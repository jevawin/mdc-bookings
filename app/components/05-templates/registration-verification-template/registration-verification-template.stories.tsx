import type { StoryObj, Meta } from '@storybook/react';

import { MemoryRouter, Route, Routes } from 'react-router';
import { RegistrationVerificationTemplate as RegistrationVerificationTemplateComponent } from './registration-verification-template.tsx';

import { mockRegistrationVerificationTemplateData } from './registration-verification-template.mock';

const meta: Meta<typeof RegistrationVerificationTemplateComponent> = {
	title: '05-templates/Registration verification',
	component: RegistrationVerificationTemplateComponent,
	tags: ['autodocs'],
	argTypes: {},
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<Story />} />
				</Routes>
			</MemoryRouter>
		),
	],
};

export default meta;
type Story = StoryObj<typeof RegistrationVerificationTemplateComponent>;

export const RegistrationVerification: Story = {
	args: mockRegistrationVerificationTemplateData,
	render: (args) => (
		<div className="registrationForm">
			<RegistrationVerificationTemplateComponent {...args} />
		</div>
	),
};
