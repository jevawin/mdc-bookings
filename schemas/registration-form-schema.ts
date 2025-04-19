import { z, ZodObject } from 'zod';

export const registrationFormSchema = z
	.object({
		name: z.string().min(1, { message: 'Enter your full name' }),
		emailAddress: z
			.string()
			.email({ message: 'Enter a valid email address' }),
		nonNrcpd: z.union([z.undefined(), z.literal('yes')], {
			errorMap: () => ({
				message: 'Invalid value',
			}),
		}),
		registrationOrganisation: z.string().optional(),
		registrationNumber: z
			.string()
			.min(1, { message: 'Enter your registration number' }),
		password: z.string().min(1, { message: 'Enter your full name' }),
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

		console.log(nonNrcpd, 'nonNrcpd');
		console.log(regOrg, 'regOrg');

		if (nonNrcpd === 'yes' && (!regOrg || regOrg.trim() === '')) {
			ctx.addIssue({
				path: ['registrationOrganisation'],
				code: z.ZodIssueCode.custom,
				message: 'Enter your registration organisation',
			});
		}
	});
