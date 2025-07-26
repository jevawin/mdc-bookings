import { z } from 'zod';

export const registrationFormSchema = z
	.object({
		name: z.string().min(1, { error: 'Enter your full name' }),
		preferredName: z
			.string()
			.min(1, { error: 'Enter your preferred name' }),
		email: z.email({ error: 'Enter a valid email address' }),
		nonNrcpd: z.union([z.undefined(), z.literal('yes')], {
			error: 'Invalid value',
		}),
		registrationOrganisation: z.string().nullish(),
		registrationNumber: z
			.string()
			.min(1, { error: 'Enter your registration number' }),
		password: z.string().min(8, { error: 'Enter a strong password' }),
		jobPostEmails: z.union([z.undefined(), z.literal('yes')], {
			error: 'Invalid value',
		}),
		jobSummaryEmails: z.union([z.undefined(), z.literal('yes')], {
			error: 'Invalid value',
		}),
	})
	.check((ctx) => {
		const nonNrcpd = ctx.value.nonNrcpd;
		const regOrg = ctx.value.registrationOrganisation;

		if (nonNrcpd === 'yes' && (!regOrg || regOrg.trim() === '')) {
			ctx.issues.push({
				input: ctx.value.registrationOrganisation,
				code: 'custom',
				error: 'Enter your registration organisation',
				path: ['registrationOrganisation'],
			});
		}
	});
