import type { StoryObj, Meta } from '@storybook/react-vite';
import type { THero } from './hero.tsx';

import { mockHeroData } from './hero.mock.tsx';

import { Hero as HeroComponent } from './hero.tsx';

const meta: Meta<THero> = {
	title: '03-organisms/Hero',
	component: HeroComponent.Root,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
};

export default meta;
type Story = StoryObj<THero>;

export const Hero: Story = {
	args: mockHeroData,
	render: (args) => (
		<HeroComponent.Root id={args.id} title={args.title}>
			<HeroComponent.Content>
				<HeroComponent.BodyText>{args.bodyText}</HeroComponent.BodyText>

				<HeroComponent.Callout {...args.callout} />
			</HeroComponent.Content>
		</HeroComponent.Root>
	),
};
