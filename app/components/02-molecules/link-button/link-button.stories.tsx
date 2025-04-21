import type { StoryObj, Meta } from '@storybook/react';

import { mockLinkButtonData } from './link-button.mock';

import { LinkButton as LinkButtonComponent } from './link-button.tsx';

const meta: Meta<typeof LinkButtonComponent> = {
	title: '02-molecules/Link button',
	component: LinkButtonComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LinkButtonComponent>;

export const LinkButton: Story = {
	args: mockLinkButtonData,
};
