---
to: "app/components/<%= type %>/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.mock.ts"
---
import type { T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %> } from './<%= h.changeCase.paramCase(name) %>.tsx';

export const mock<%= h.changeCase.pascalCase(name) %>Data: T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %> = {};
