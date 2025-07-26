import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginImport from 'eslint-plugin-import';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
	{
		ignores: [
			'node_modules/*',
			'.husky/*',
			'.react-router/*',
			'generators/*',
			'**/build',
			'**/public',
			'!**/.prettierrc.js',
			'app/stories/**/*',
			'**/workers/**/*',
			'**/coverage/**/*',
		],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
	},
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},

	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginImport.flatConfigs.recommended,
	...tseslint.configs.recommended,

	...compat.extends(
		'plugin:jsx-a11y/recommended',
		'plugin:react-hooks/recommended',
		'plugin:storybook/recommended',
	),

	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},

			ecmaVersion: 8,
			sourceType: 'module',
		},

		settings: {
			'react': {
				version: 'detect',
			},
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
			},
		},

		rules: {
			'react/no-unescaped-entities': 0,
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'jsx-a11y/no-onchange': 'off',
			'jsx-a11y/alt-text': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/explicit-function-return-type': [
				'warn',
				{
					allowExpressions: true,
					allowConciseArrowFunctionExpressionsStartingWithVoid: true,
				},
			],

			'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
			'eqeqeq': ['error', 'always'],
			'import/extensions': [
				'error',
				'ignorePackages',
				{
					ts: 'always',
					tsx: 'always',
					checkTypeImports: true,
				},
			],
		},
	},
];

export default config;
