import type { StoryObj, Meta } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { Form as FormComponent } from './form.tsx';
import { mockFormData } from './form.mock.ts';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';

const meta: Meta<typeof FormComponent> = {
	title: '03-organisms/Form',
	component: FormComponent,
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
						path: '/sign-up',
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
type Story = StoryObj<typeof FormComponent>;

export const Form: Story = {
	args: mockFormData,
	render: (args) => (
		<FormComponent {...args} action="/sign-up" className="form">
			<Fieldset
				id="sign-up-details"
				title="Sign up details"
				bodyText="Create a new account"
			>
				<TextInput
					id="email"
					type="email"
					label="Email address"
					autoComplete="email"
					inputMode="email"
					isRequired={true}
				/>

				<TextInput
					id="password"
					type="password"
					label="Password"
					autoComplete="new-password"
					isRequired={true}
				/>
			</Fieldset>
		</FormComponent>
	),
};
