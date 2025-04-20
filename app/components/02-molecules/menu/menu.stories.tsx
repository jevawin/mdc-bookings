import type { StoryObj, Meta } from '@storybook/react';

import { mockMenuData } from './menu.mock';

import { Menu as MenuComponent } from './menu.tsx';
import { MemoryRouter, Route, Routes } from 'react-router';

const meta: Meta<typeof MenuComponent> = {
	title: '02-molecules/Menu',
	component: MenuComponent,
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
type Story = StoryObj<typeof MenuComponent>;

export const Menu: Story = {
	args: mockMenuData,
};
