import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockBookInterpreterTemplateData } from './book-interpreter-template.mock.ts';

import { BookInterpreterTemplate as BookInterpreterTemplateComponent } from './book-interpreter-template.tsx';

const meta: Meta<typeof BookInterpreterTemplateComponent> = {
	title: '05-templates/Book interpreter template',
	component: BookInterpreterTemplateComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BookInterpreterTemplateComponent>;

export const BookInterpreterTemplate: Story = {
	args: mockBookInterpreterTemplateData,
};
