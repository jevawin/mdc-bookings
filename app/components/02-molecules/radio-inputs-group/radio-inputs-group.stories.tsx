import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockRadioInputsGroupData } from './radio-inputs-group.mock.ts';

import { RadioInputsGroup as RadioInputsGroupComponent } from './radio-inputs-group.tsx';

const meta: Meta<typeof RadioInputsGroupComponent> = {
	title: '02-molecules/Radio inputs group',
	component: RadioInputsGroupComponent,
	tags: ['autodocs'],
	argTypes: {},
	parameters: {
		layout: 'padded',
	},
};

export default meta;
type Story = StoryObj<typeof RadioInputsGroupComponent>;

export const RadioInputsGroup: Story = {
	args: mockRadioInputsGroupData,
};
