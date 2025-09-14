import { z } from 'zod';

export const bookingFormSchema = z
	.object({
		appointmentService: z.enum(
			[
				'BSL to English interpreter',
				'Lipspeaker',
				'Deaf intermediary interpreter',
				'Deafblind interpreter',
				'Speech to text reporter',
				'Note taker',
			],
			{ error: 'Please tell us which service you require' },
		),
		appointmentSpecialism: z.enum(['General', 'Medical', 'Specialist'], {
			error: 'Please tell us what type of appointment this is',
		}),
		appointmentOrganisation: z.enum(['GEN', 'SIU', 'SFT'], {
			error: 'Please tell us if this is an SIU/SFT booking (choose "No" if unsure)',
		}),
		accessToWork: z.enum(['Yes', 'No'], {
			error: 'Please tell us if this is an "Access to Work" booking (choose "No" if unsure)',
		}),
		appointmentDescription: z.string().optional(),
		interpreterGender: z.enum(['Male', 'Female', 'Any'], {
			error: 'Please choose a gender',
		}),
		appointmentDate: z
			.string()
			.min(1, { error: 'Please set a date' })
			.pipe(
				z
					.string()
					.refine((val) => !isNaN(Date.parse(val)), {
						error: 'Invalid date format',
					})
					.transform((val) => new Date(val))
					.refine(
						(d) => d > new Date(Date.now() + 1 * 60 * 60 * 1000),
						{
							error: 'Date must be more than 1 hour from now - please call for urgent appointments',
						},
					)
					.transform((val) => val.toISOString()),
			),
		hours: z.enum(
			['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			{
				error: 'hours',
			},
		),
		minutes: z.enum(['0', '15', '30', '45'], { error: 'minutes' }),
		appointmentDepartment: z.string().optional(),
		appointmentAddress1: z
			.string()
			.min(1, { error: 'Please provide a first address line' }),
		appointmentAddress2: z.string().optional(),
		appointmentCity: z
			.string()
			.min(1, { error: 'Please provide a town or city' }),
		appointmentPostcode: z
			.string()
			.min(1, { error: 'Please provide a postcode' }),
		contactName: z
			.string()
			.min(1, { error: 'Please provide a contact name' }),
		contactNumber: z
			.string()
			.min(1, { error: 'Please provide a contact number' }),
		clientName: z
			.string()
			.min(1, { error: 'Please provide a client name' }),
		bookerName: z
			.string()
			.min(1, { error: 'Please provide a booker name' }),
		bookerNumber: z
			.string()
			.min(1, { error: 'Please provide a booker name' }),
		bookerEmail: z.email({ error: 'Please provide a valid email address' }),
		companyName: z.string().optional(),
		// Finance fields are structurally optional; enforced conditionally below
		financeAddress1: z.string().optional(),
		financeAddress2: z.string().optional(),
		financeCity: z.string().optional(),
		financePostcode: z.string().optional(),
		financeEmail: z.email().or(z.literal('')),
		financePO: z
			.string()
			.regex(
				/[0-9a-zA-Z-]+/,
				'Must contain only letters, numbers, or hyphens (-)',
			)
			.or(z.literal('')),
		termsConditions: z.literal('on'),
	})
	.superRefine((data, ctx) => {
		// GEN: all finance fields required
		if (data.appointmentOrganisation === 'GEN') {
			const requiredFinance: Array<[keyof typeof data, string]> = [
				['financeAddress1', 'Please provide a first address line'],
				['financeCity', 'Please provide a town or city'],
				['financePostcode', 'Please provide a postcode'],
				['financeEmail', 'Please provide a valid email address'],
				['financePO', 'Please provide a purchase order/reference'],
			];
			for (const [field, message] of requiredFinance) {
				const value = data[field];
				if (value === undefined || value === null || value === '') {
					ctx.addIssue({
						code: 'custom',
						path: [field as string],
						message,
					});
				}
			}
		}
	});
