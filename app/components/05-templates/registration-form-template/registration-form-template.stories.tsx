import type { StoryObj, Meta } from '@storybook/react';

import { fn } from '@storybook/test';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RegistrationFormTemplate as RegistrationFormTemplateComponent } from './registration-form-template.tsx';

import { mockRegistrationFormTemplateData } from './registration-form-template.mock';

const meta: Meta<typeof RegistrationFormTemplateComponent> = {
	title: '05-templates/Registration form',
	component: RegistrationFormTemplateComponent,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
	decorators: [
		(Story) => {
			const router = createMemoryRouter(
				[
					{
						path: '/',
						element: <Story />,
						action: fn(),
					},
					{
						path: '/registration',
						element: <Story />,
						action: fn(),
					},
				],
				{
					initialEntries: ['/'],
				},
			);

			return <RouterProvider router={router} />;
		},
	],
};

export default meta;
type Story = StoryObj<typeof RegistrationFormTemplateComponent>;

export const RegistrationForm: Story = {
	args: mockRegistrationFormTemplateData,
	render: (args) => (
		<div className="registrationForm">
			<RegistrationFormTemplateComponent {...args} />
		</div>
	),
};
