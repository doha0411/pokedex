const RULES = {
	OFF: 'off',
	ERROR: 'error',
	WARN: 'warn',
}

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'standard',
		'eslint-config-prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'no-unused-vars': [
			RULES.WARN,
			{
				varsIgnorePattern: '_',
				argsIgnorePattern: '^_',
			},
		],
	},
}
