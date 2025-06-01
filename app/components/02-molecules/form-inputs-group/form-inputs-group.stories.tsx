import type { StoryObj, Meta } from '@storybook/react';

import { mockFormInputsGroupData } from './form-inputs-group.mock';

import { FormInputsGroup as FormInputsGroupComponent } from './form-inputs-group.tsx';

const meta: Meta<typeof FormInputsGroupComponent> = {
	title: '02-molecules/Form inputs group',
	component: FormInputsGroupComponent,
	tags: ['autodocs'],
	argTypes: {},
	parameters: {
		layout: 'padded',
	},
};

export default meta;
type Story = StoryObj<typeof FormInputsGroupComponent>;

export const FormInputsGroup: Story = {
	args: mockFormInputsGroupData,
};
