import type { StoryObj, Meta } from '@storybook/react';

import { MemoryRouter, Route, Routes } from 'react-router';
import { mockRegistrationFormData } from './registration-form.mock';

import { RegistrationForm as RegistrationFormComponent } from './registration-form.tsx';

const meta: Meta<typeof RegistrationFormComponent> = {
	title: '04-layouts/Registration form',
	component: RegistrationFormComponent,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
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
type Story = StoryObj<typeof RegistrationFormComponent>;

export const RegistrationForm: Story = {
	args: mockRegistrationFormData,
	render: (args) => (
		<form className="form" onSubmit={(e) => e.preventDefault()}>
			<RegistrationFormComponent {...args} />
		</form>
	),
};
