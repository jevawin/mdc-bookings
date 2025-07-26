import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockTextInputsGroupData } from './text-inputs-group.mock.ts';

import { TextInputsGroup as TextInputsGroupComponent } from './text-inputs-group.tsx';

const meta: Meta<typeof TextInputsGroupComponent> = {
	title: '02-molecules/Text inputs group',
	component: TextInputsGroupComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TextInputsGroupComponent>;

export const TextInputsGroup: Story = {
	args: mockTextInputsGroupData,
};
