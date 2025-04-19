import type { StoryObj, Meta } from '@storybook/react';

import { mockTextInputData } from './text-input.mock';

import { TextInput as TextInputComponent } from './text-input.tsx';

const meta: Meta<typeof TextInputComponent> = {
	title: '01-atoms/Text input',
	component: TextInputComponent,
	tags: ['autodocs'],
	argTypes: {
		type: {
			description: 'Controls the input type',
			defaultValue: 'text',
			options: ['text', 'email', 'search', 'url'],
			control: 'inline-radio',
		},
	},
};

export default meta;
type Story = StoryObj<typeof TextInputComponent>;

export const TextInput: Story = {
	args: mockTextInputData,
	render: (args) => <TextInputComponent className="field" {...args} />,
};
