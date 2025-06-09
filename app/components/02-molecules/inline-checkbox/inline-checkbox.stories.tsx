import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockInlineCheckboxData } from './inline-checkbox.mock.ts';

import { InlineCheckbox as InlineCheckboxComponent } from './inline-checkbox.tsx';

const meta: Meta<typeof InlineCheckboxComponent> = {
	title: '02-molecules/Inline checkbox',
	component: InlineCheckboxComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InlineCheckboxComponent>;

export const InlineCheckbox: Story = {
	args: mockInlineCheckboxData,
};
