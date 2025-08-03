import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockSelectData } from './select.mock.ts';

import { Select as SelectComponent } from './select.tsx';

const meta: Meta<typeof SelectComponent> = {
	title: '02-molecules/Select',
	component: SelectComponent,
	tags: ['autodocs'],
	argTypes: {
		labelPosition: {
			control: { type: 'select' },
			options: ['top', 'right', 'bottom', 'left'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof SelectComponent>;

export const Select: Story = {
	args: mockSelectData,
};
