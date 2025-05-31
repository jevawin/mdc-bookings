import type { StoryObj, Meta } from '@storybook/react';

import { createMemoryRouter, RouterProvider } from 'react-router';
import { fn } from 'storybook/test';

import { mockResetPasswordTemplateData } from './reset-password-template.mock';

import { ResetPasswordTemplate as ResetPasswordTemplateComponent } from './reset-password-template.tsx';

const meta: Meta<typeof ResetPasswordTemplateComponent> = {
	title: '05-templates/Reset password template',
	component: ResetPasswordTemplateComponent,
	tags: ['autodocs'],
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
						path: '/password-reset',
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
type Story = StoryObj<typeof ResetPasswordTemplateComponent>;

export const ResetPasswordTemplate: Story = {
	args: mockResetPasswordTemplateData,
};
