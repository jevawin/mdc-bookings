import type { StoryObj, Meta } from '@storybook/react-vite';

import { iconNames } from '~/components/01-atoms/icon/icon.mock.ts';
import { mockRadioData } from './radio.mock.ts';

import { Radio as RadioComponent } from './radio.tsx';

const meta: Meta<typeof RadioComponent> = {
	title: '02-molecules/Radio',
	component: RadioComponent,
	tags: ['autodocs'],
	argTypes: {
		icon: {
			description: 'Sets the icon',
			options: iconNames,
			control: 'select',
		},
		hint: {
			description: 'Optional hint for extra context',
			control: 'text',
		},
	},
};

export default meta;
type Story = StoryObj<typeof RadioComponent>;

export const Radio: Story = {
	args: mockRadioData,
};
