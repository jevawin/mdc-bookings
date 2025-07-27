import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockTermsConditionsCheckboxData } from './terms-conditions-checkbox.mock.ts';

import { TermsConditionsCheckbox as TermsConditionsCheckboxComponent } from './terms-conditions-checkbox.tsx';
import { MemoryRouter, Route, Routes } from 'react-router';

const meta: Meta<typeof TermsConditionsCheckboxComponent> = {
	title: '01-atoms/Terms conditions checkbox',
	component: TermsConditionsCheckboxComponent,
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
type Story = StoryObj<typeof TermsConditionsCheckboxComponent>;

export const TermsConditionsCheckbox: Story = {
	args: mockTermsConditionsCheckboxData,
};
