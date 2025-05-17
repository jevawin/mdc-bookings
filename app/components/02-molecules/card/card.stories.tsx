import type { StoryObj, Meta } from '@storybook/react';
import type { TCard } from './card.tsx';

import { mockCardData } from './card.mock';

import { Card as CardComponent } from './card.tsx';

const meta: Meta<TCard> = {
	title: '02-molecules/Card',
	component: CardComponent.Root,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<TCard>;

export const Card: Story = {
	args: mockCardData,
	render: (args) => (
		<CardComponent.Root id={args.id}>
			<CardComponent.Header title={args.title} bodyText={args.bodyText} />
		</CardComponent.Root>
	),
};
