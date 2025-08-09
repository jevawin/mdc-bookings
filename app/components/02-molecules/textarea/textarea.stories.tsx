import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockTextareaData } from './textarea.mock.ts';

import { Textarea as TextareaComponent } from './textarea.tsx';

const meta: Meta<typeof TextareaComponent> = {
	title: '02-molecules/Textarea',
	component: TextareaComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TextareaComponent>;

export const Textarea: Story = {
	args: mockTextareaData,
	render: (args) => <TextareaComponent {...args} />,
};
