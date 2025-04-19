import type { StoryObj, Meta } from '@storybook/react';

import { mockIconData } from './icon.mock';

import { Icon as IconComponent } from './icon.tsx';

const meta: Meta<typeof IconComponent> = {
	title: '01-atoms/Icon',
	component: IconComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof IconComponent>;

export const Icon: Story = {
	args: mockIconData,
};
