import type { StoryObj, Meta } from '@storybook/react';

import { mockHeaderData } from './header.mock';

import { Header as HeaderComponent } from './header.tsx';
import { MemoryRouter, Routes, Route } from 'react-router';

const meta: Meta<typeof HeaderComponent> = {
	title: '02-molecules/Header',
	component: HeaderComponent,
	tags: ['autodocs'],
	argTypes: {},
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={['/jobs']}>
				<Routes>
					<Route path="/jobs" element={<Story />} />
				</Routes>
			</MemoryRouter>
		),
	],
};

export default meta;
type Story = StoryObj<typeof HeaderComponent>;

export const Header: Story = {
	args: mockHeaderData,
};
