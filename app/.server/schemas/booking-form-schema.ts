import { z } from 'zod';

export const bookingFormSchema = z.object({
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
		.min(1, { message: 'Please set a date' })
		.pipe(
			z
				.string()
				.refine((val) => !isNaN(Date.parse(val)), {
					message: 'Invalid date format',
				})
				.transform((val) => new Date(val))
				.refine((d) => d > new Date(), {
					message: 'Date must be in the future',
				})
				.transform((val) => val.toISOString()),
		),
	hours: z.enum(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], {
		error: 'hours',
	}),
	minutes: z.enum(['0', '15', '30', '45'], { error: 'minutes' }),
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
	contactName: z.string().min(1, { error: 'Please provide a contact name' }),
	contactNumber: z
		.string()
		.min(1, { error: 'Please provide a contact number' }),
	clientName: z.string().min(1, { error: 'Please provide a client name' }),
	bookerName: z.string().min(1, { error: 'Please provide a booker name' }),
	bookerNumber: z.string().min(1, { error: 'Please provide a booker name' }),
	bookerEmail: z
		.string()
		.min(1, { error: 'Please provide an email address' }),
	companyName: z.string().optional(),
	financeAddress1: z.string().optional(),
	financeAddress2: z.string().optional(),
	financeCity: z.string().optional(),
	financePostcode: z.string().optional(),
	financeEmail: z.string().optional(),
});
