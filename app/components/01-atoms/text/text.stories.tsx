import type { StoryObj, Meta } from '@storybook/react-vite';

import { Text as TextComponent } from './text.tsx';

const meta: Meta<typeof TextComponent> = {
	title: '01-atoms/Text',
	component: TextComponent,
	tags: ['autodocs'],
	argTypes: {
		size: {
			description: 'Controls the typography style size',
			defaultValue: '100',
			options: [
				'0',
				'100',
				'200',
				'300',
				'400',
				'500',
				'600',
				'700',
				'800',
			],
			control: 'select',
			table: {
				type: {
					summary:
						'0 | 50 | 75 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800',
				},
			},
		},
		tag: {
			description: 'Controls HTML element of the component',
			control: 'text',
			table: {
				type: {
					summary: 'HTMLElement',
				},
			},
		},
		weight: {
			description: 'Controls the typography style weight',
			defaultValue: '100',
			options: ['100', '200', '300'],
			control: 'select',
			table: {
				type: {
					summary: '100 | 200 | 300',
				},
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof TextComponent>;

export const Text: Story = {
	args: {
		tag: 'span',
		children: 'Hello world',
		size: '100',
		weight: '100',
	},
};
