import type { StoryObj, Meta } from '@storybook/react';

import { mockTextLinkData } from './text-link.mock';

import { TextLink as TextLinkComponent } from './text-link.tsx';
import { MemoryRouter, Route, Routes } from 'react-router';

const meta: Meta<typeof TextLinkComponent> = {
	title: '01-atoms/Text link',
	component: TextLinkComponent,
	tags: ['autodocs'],
	argTypes: {},
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<Story />} />
				</Routes>
			</MemoryRouter>
		),
	],
};

export default meta;
type Story = StoryObj<typeof TextLinkComponent>;

export const TextLink: Story = {
	args: mockTextLinkData,
};
