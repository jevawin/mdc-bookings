import type { StoryObj, Meta } from '@storybook/react';

import { fn } from '@storybook/test';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { LogInTemplate as LogInTemplateComponent } from './log-in-template.tsx';
import { mockLogInTemplateData } from './log-in-template.mock';

const meta: Meta<typeof LogInTemplateComponent> = {
	title: '05-templates/Log in template',
	component: LogInTemplateComponent,
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
						path: '/log-in',
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
type Story = StoryObj<typeof LogInTemplateComponent>;

export const LogInTemplate: Story = {
	args: mockLogInTemplateData,
};
