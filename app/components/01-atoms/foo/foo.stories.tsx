import type { StoryObj, Meta } from '@storybook/react';

import { Foo as FooComponent } from './foo.tsx';
import { mockFooData } from './foo.mock.ts';

const meta: Meta<typeof FooComponent> = {
	title: '01-atoms/Foo',
	component: FooComponent,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FooComponent>;

export const Foo: Story = {
	args: mockFooData,
};
