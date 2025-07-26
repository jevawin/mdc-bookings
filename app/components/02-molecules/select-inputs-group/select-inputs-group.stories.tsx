import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockSelectInputsGroupData } from './select-inputs-group.mock.ts';

import { SelectInputsGroup as SelectInputsGroupComponent } from './select-inputs-group.tsx';

const meta: Meta<typeof SelectInputsGroupComponent> = {
	title: '02-molecules/Select inputs group',
	component: SelectInputsGroupComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SelectInputsGroupComponent>;

export const SelectInputsGroup: Story = {
	args: mockSelectInputsGroupData,
};
