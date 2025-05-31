module.exports = [
	{
		type: 'input',
		name: 'name',
		message: 'Route path (e.g. about-us or sign-up/verify):',
		filter(value) {
			return value.replace(/^\/|\/$/g, ''); // remove leading/trailing slashes
		},
		validate(value) {
			if (!value.length) {
				return 'Routes must have a path.';
			}

			if (/[^a-zA-Z0-9\-\/]/.test(value)) {
				return 'Only letters, numbers, hyphens, and slashes are allowed.';
			}

			return true;
		},
	},
];
