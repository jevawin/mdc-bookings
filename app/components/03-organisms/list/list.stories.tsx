import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { mockListData } from './list.mock.ts';
import { List as ListComponent, type TList } from './list.tsx';

const meta: Meta<TList> = {
	title: '03-organisms/List',
	component: ListComponent.Root,
	tags: ['autodocs'],
	argTypes: {
		tag: {
			description: 'Controls the tag type',
			options: ['ol', 'ul'],
			control: 'select',
		},
	},
};

export default meta;
type Story = StoryObj<TList>;

export const List: Story = {
	args: mockListData,
	render: (args) => (
		<ListComponent.Root>
			<ListComponent.Item>
				<Icon name="apple" />
				<Text size="100">Apple</Text>
			</ListComponent.Item>
			<ListComponent.Item>
				<Icon name="bell" />
				<Text size="100">Bell</Text>
			</ListComponent.Item>
			<ListComponent.Item>
				<Icon name="building" />
				<Text size="100">Building</Text>
			</ListComponent.Item>
		</ListComponent.Root>
	),
};
