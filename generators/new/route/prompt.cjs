module.exports = [
	{
		type: 'input',
		name: 'name',
		message: 'Filename (without .tsx):',
		validate(value) {
			if (!value.length) {
				return 'Routes must have a filename.';
			}
			return true;
		},
	},
];
