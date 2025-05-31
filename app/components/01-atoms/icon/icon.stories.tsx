import type { StoryObj, Meta } from '@storybook/react-vite';

import { iconNames, mockIconData } from './icon.mock';

import { Icon as IconComponent } from './icon.tsx';

const meta: Meta<typeof IconComponent> = {
	title: '01-atoms/Icon',
	component: IconComponent,
	tags: ['autodocs'],
	argTypes: {
		name: {
			description: 'Name of the icon to display',
			control: {
				type: 'select',
			},
			options: iconNames,
		},
	},
};

export default meta;
type Story = StoryObj<typeof IconComponent>;

export const Icon: Story = {
	args: mockIconData,
};
