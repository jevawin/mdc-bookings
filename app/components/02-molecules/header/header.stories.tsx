import type { StoryObj, Meta } from '@storybook/react-vite';

import { MemoryRouter, Route, Routes } from 'react-router';
import { mockHeaderData } from './header.mock';

import { Header as HeaderComponent } from './header.tsx';

const meta: Meta<typeof HeaderComponent> = {
	title: '02-molecules/Header',
	component: HeaderComponent,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
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
type Story = StoryObj<typeof HeaderComponent>;

export const Header: Story = {
	args: mockHeaderData,
};
