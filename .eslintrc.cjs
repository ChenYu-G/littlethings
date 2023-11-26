module.exports = {
	root: true,
	env: { browser: true, es2021: true },
	extends: [
		'standard',
		'plugin:react/recommended',
		'plugin:tailwindcss/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
}
