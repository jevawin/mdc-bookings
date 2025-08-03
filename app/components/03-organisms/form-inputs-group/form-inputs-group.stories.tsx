import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockFormInputsGroupData } from './form-inputs-group.mock.ts';

import { FormInputsGroup as FormInputsGroupComponent } from './form-inputs-group.tsx';

const meta: Meta<typeof FormInputsGroupComponent> = {
	title: '03-organisms/Form inputs group',
	component: FormInputsGroupComponent,
	tags: ['autodocs'],
	argTypes: {
		type: {
			description: 'Set which form inputs to use',
			options: ['input', 'radio', 'select'],
			control: 'select',
		},
	},
};

export default meta;
type Story = StoryObj<typeof FormInputsGroupComponent>;

export const FormInputsGroup: Story = {
	args: mockFormInputsGroupData,
};
