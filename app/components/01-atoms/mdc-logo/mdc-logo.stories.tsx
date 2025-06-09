import type { StoryObj, Meta } from '@storybook/react-vite';

import { mockMdcLogoData } from './mdc-logo.mock.ts';

import { MdcLogo as MdcLogoComponent } from './mdc-logo.tsx';

const meta: Meta<typeof MdcLogoComponent> = {
	title: '01-atoms/Mdc logo',
	component: MdcLogoComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MdcLogoComponent>;

export const MdcLogo: Story = {
	args: mockMdcLogoData,
};
