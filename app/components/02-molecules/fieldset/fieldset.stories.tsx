import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockFieldsetData } from './fieldset.mock';

import { Fieldset as FieldsetComponent } from './fieldset.tsx';
import { TextInput } from '../text-input/text-input.tsx';

const meta: Meta<typeof FieldsetComponent> = {
	title: '02-molecules/Fieldset',
	component: FieldsetComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FieldsetComponent>;

export const Fieldset: Story = {
	args: mockFieldsetData,
	render: (args) => (
		<FieldsetComponent fieldsetClassName="fieldset" {...args}>
			<TextInput
				id="name"
				name="name"
				label="Full name"
				autoComplete="name"
				inputMode="text"
				isRequired={true}
			/>

			<TextInput
				id="email"
				type="email"
				name="email"
				label="Email"
				autoComplete="email"
				inputMode="email"
				isRequired={true}
			/>
		</FieldsetComponent>
	),
};
