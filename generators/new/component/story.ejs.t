---
to: "app/components/<%= type %>/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.stories.tsx"
---
import type { StoryObj, Meta } from '@storybook/react';

import { mock<%= h.changeCase.pascalCase(name) %>Data } from './<%= h.changeCase.paramCase(name) %>.mock';

import { <%= h.inflection.camelize(h.changeCase.camelCase(name)) %> as <%= h.inflection.camelize(h.changeCase.camelCase(name)) %>Component } from './<%= h.changeCase.paramCase(name) %>.tsx';

const meta: Meta<typeof <%= h.inflection.camelize(h.changeCase.camelCase(name)) %>Component> = {
	title: '<%= type %>/<%= h.changeCase.sentenceCase(name) %>',
	component: <%= h.inflection.camelize(h.changeCase.camelCase(name)) %>Component,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof <%= h.inflection.camelize(h.changeCase.camelCase(name)) %>Component>;

export const <%= h.inflection.camelize(h.changeCase.camelCase(name)) %>: Story = {
	args: mock<%= h.changeCase.pascalCase(name) %>Data,
};
