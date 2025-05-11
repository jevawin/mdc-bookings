import type { StoryObj, Meta } from '@storybook/react';

import { mockLoaderData } from './loader.mock';

import { Loader as LoaderComponent } from './loader.tsx';

const meta: Meta<typeof LoaderComponent> = {
	title: '01-atoms/Loader',
	component: LoaderComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LoaderComponent>;

export const Loader: Story = {
	args: mockLoaderData,
	render: (args) => <LoaderComponent className="loader" {...args} />,
};
