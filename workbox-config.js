module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{css,html,png,jpg,webp,js,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};