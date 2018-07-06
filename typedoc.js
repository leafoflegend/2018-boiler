const { applicationName } = require('./boilerconfig');

module.exports = {
	out: './docs',
	readme: 'README.md',
	target: 'ES5',
	name: applicationName,
	includeDeclarations: true,
	excludeExternals: true,
	excludeNotExported: true,
	excludePrivate: true,
	exclude: [
		'**/node_modules/**/*',
	],
};
