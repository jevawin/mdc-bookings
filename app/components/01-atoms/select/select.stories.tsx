import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockSelectData } from './select.mock.ts';

import { Select as SelectComponent } from './select.tsx';

const meta: Meta<typeof SelectComponent> = {
	title: '01-atoms/Select',
	component: SelectComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SelectComponent>;

export const Select: Story = {
	args: mockSelectData,
};
