import type { StoryObj, Meta } from '@storybook/react-vite';

import { Container as ContainerComponent } from './container.tsx';

const meta: Meta<typeof ContainerComponent> = {
	title: '04-layouts/Container',
	component: ContainerComponent,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		containerSize: {
			description: 'Controls the maximum width of the container',
			options: ['max', 'min'],
			control: 'inline-radio',
			table: {
				defaultValue: {
					summary: 'max',
				},
			},
		},
		tag: {
			description: 'Controls the HTML element of the component',
			control: 'text',
		},
	},
};

export default meta;
type Story = StoryObj<typeof ContainerComponent>;

export const Container: Story = {
	args: {
		containerSize: 'max',
		tag: 'div',
	},
	render: (args) => (
		<ContainerComponent className="container" {...args}>
			<div className="containerInner">Hello world</div>
		</ContainerComponent>
	),
};
