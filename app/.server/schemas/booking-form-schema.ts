import { z } from 'zod';

export const bookingFormSchema = z.object({
	appointmentService: z.string().min(1, { error: 'Please choose a service' }),
	appointmentSpecialism: z
		.string()
		.min(1, { error: 'Please choose an appointment type' }),
	appointmentOrganisation: z.enum(['no', 'siu', 'sft']),
	accessToWork: z.enum(['yes', 'no']),
	appointmentDescription: z.string().optional(),
	interpreterGender: z.string().min(1, { error: 'Please choose a gender' }),
	appointmentDate: z.string().min(1, { error: 'Please set a date' }),
	hours: z.string().min(1, { error: 'Please set hours (can be 0)' }),
	minutes: z.string().min(1, { error: 'Please set minutes (can be 0)' }),
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
		.min(1, { error: 'Please provide a n email address' }),
	companyName: z.string().optional(),
	financeAddress1: z.string().optional(),
	financeAddress2: z.string().optional(),
	financeCity: z.string().optional(),
	financePostcode: z.string().optional(),
	financeEmail: z.string().optional(),
});
