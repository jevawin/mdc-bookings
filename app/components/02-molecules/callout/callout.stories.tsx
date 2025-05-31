import type { StoryObj, Meta } from '@storybook/react';

import { mockCalloutData } from './callout.mock';

import { Callout as CalloutComponent } from './callout.tsx';

const meta: Meta<typeof CalloutComponent> = {
	title: '02-molecules/Callout',
	component: CalloutComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CalloutComponent>;

export const Callout: Story = {
	args: mockCalloutData,
};
