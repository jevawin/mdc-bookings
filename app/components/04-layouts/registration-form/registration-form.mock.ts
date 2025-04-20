import type { TRegistrationForm } from './registration-form.tsx';

export const mockRegistrationFormData: TRegistrationForm = {
	fieldErrors: {
		name: {
			name: 'name',
			id: 'name',
			message: 'Enter your full name',
		},
		email: {
			name: 'email',
			id: 'email',
			message: 'Enter a valid email address',
		},
		registrationNumber: {
			name: 'registrationNumber',
			id: 'registration-number',
			message: 'Enter your registration number',
		},
		password: {
			name: 'password',
			id: 'password',
			message: 'Enter a password',
		},
	},
};
