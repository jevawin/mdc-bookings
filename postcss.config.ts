module.exports = {
	plugins: {
		'autoprefixer': {},
		'postcss-preset-env': {
			browsers: 'last 2 versions',
			stage: 3,
			features: {
				'custom-properties': false,
				'nesting-rules': true,
			},
		},
	},
};
