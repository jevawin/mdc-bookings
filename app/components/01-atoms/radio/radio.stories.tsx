import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockRadioData } from './radio.mock.ts';

import { Radio as RadioComponent } from './radio.tsx';
import { iconNames } from '../icon/icon.mock.ts';

const meta: Meta<typeof RadioComponent> = {
	title: '01-atoms/Radio',
	component: RadioComponent,
	tags: ['autodocs'],
	argTypes: {
		icon: {
			description: 'Sets the icon',
			options: iconNames,
			control: 'select',
		},
		title: {
			description: 'Optional title, changes to vertical layout',
			control: 'text',
		},
	},
};

export default meta;
type Story = StoryObj<typeof RadioComponent>;

export const Radio: Story = {
	args: mockRadioData,
};
