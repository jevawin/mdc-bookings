import type { StoryObj, Meta } from '@storybook/react';

import { List as ListComponent } from './list.tsx';

const meta: Meta<typeof ListComponent> = {
	title: '03-organisms/List',
	component: ListComponent.Root,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ListComponent>;

export const List: Story = {
	args: {},
};
