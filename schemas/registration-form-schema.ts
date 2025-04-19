import { z } from 'zod';

export const registrationFormSchema = z
	.object({
		name: z.string().min(1, { message: 'Enter your full name' }),
		email: z.string().email({ message: 'Enter a valid email address' }),
		nonNrcpd: z.union([z.undefined(), z.literal('yes')], {
			errorMap: () => ({
				message: 'Invalid value',
			}),
		}),
		registrationOrganisation: z.string().nullish(),
		registrationNumber: z
			.string()
			.min(1, { message: 'Enter your registration number' }),
		password: z.string().min(1, { message: 'Enter a password' }),
		jobPostEmails: z.union([z.undefined(), z.literal('yes')], {
			errorMap: () => ({
				message: 'Invalid value',
			}),
		}),
		jobSummaryEmails: z.union([z.undefined(), z.literal('yes')], {
			errorMap: () => ({
				message: 'Invalid value',
			}),
		}),
	})
	.superRefine((data, ctx) => {
		const nonNrcpd = data.nonNrcpd;
		const regOrg = data.registrationOrganisation;

		if (nonNrcpd === 'yes' && (!regOrg || regOrg.trim() === '')) {
			ctx.addIssue({
				path: ['registrationOrganisation'],
				code: z.ZodIssueCode.custom,
				message: 'Enter your registration organisation',
			});

			return z.NEVER;
		}
	});
