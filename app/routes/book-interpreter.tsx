import { bookingFormSchema } from '../.server/schemas/booking-form-schema.ts';
import {
	createAirtableRecord,
	type TAirtableJobFields,
} from '../.server/services/airtable.ts';
import type { Env, TFormError, TValidateFormData } from '../global-types.ts';
import {
	buildFormFieldErrors,
	convertFormDataToObject,
} from '../utils/form-utils.ts';
import type { Route } from './+types/book-interpreter.tsx';

import { BookInterpreterTemplate } from '~/components/05-templates/book-interpreter-template/book-interpreter-template.tsx';

type TBookeInterpreterData = {
	message: string;
};

type TBookingAction = Promise<Response | TFormError>;

type TFormDataResult = {
	appointmentService: string;
	appointmentSpecialism: string;
	appointmentOrganisation: 'GEN' | 'SIU' | 'SFT';
	accessToWork: 'Yes' | 'No';
	appointmentDetails?: string;
	interpreterGender: string;
	appointmentDate: string;
	hours: string;
	minutes: string;
	appointmentAddress1: string;
	appointmentAddress2?: string;
	appointmentCity: string;
	appointmentPostcode: string;
	contactName: string;
	contactNumber: string;
	clientName: string;
	bookerName: string;
	bookerNumber: string;
	bookerEmail: string;
	companyName?: string;
	financeAddress1?: string;
	financeAddress2?: string;
	financeCity?: string;
	financePostcode?: string;
	financeEmail?: string;
};

type TValidateBookingForm = {
	data?: TFormDataResult;
} & TValidateFormData;

const defaultFormError = {
	fieldErrors: {},
	status: 400,
	error: {
		title: "We're having a bit of trouble processing your request.",
		bodyText:
			"Don't worry, your information is still here. Please click 'Submit' again in a moment.",
	},
};

const validateFormData = async (
	request: Request,
): Promise<TValidateBookingForm> => {
	try {
		const formData = await request.formData();
		const formObject = convertFormDataToObject(formData);
		const result = bookingFormSchema.safeParse(formObject);
		const isSuccess = result.success;

		if (isSuccess) {
			return {
				status: 200,
				data: result.data,
			};
		}

		return buildFormFieldErrors(result.error.issues);
	} catch (error) {
		console.error('Error validating sign up form data:', error);

		return defaultFormError;
	}
};

const sendBookingToAirtable = async (
	formData: TFormDataResult,
	env: Env,
): Promise<TFormError> => {
	try {
		const payload: TAirtableJobFields = {
			'Status': 'Booking posted',
			'Booker: name': formData.bookerName,
			'Appointment: service': formData.appointmentService,
			'Appointment: specialism': formData.appointmentSpecialism,
			'Appointment: organisation': formData.appointmentOrganisation,
			'Appointment: details': formData.appointmentDetails,
			'Appointment: client name': formData.clientName,
			'Appointment: contact name': formData.contactName,
			'Appointment: contact number': formData.contactNumber,
			'Appointment: access to work': formData.accessToWork,
			'Appointment: interpreter gender': formData.interpreterGender,
			'Appointment: date': formData.appointmentDate,
			'Appointment: duration': `${formData.hours}h${formData.minutes}m`,
			'Appointment: address 1': formData.appointmentAddress1,
			'Appointment: address 2': formData.appointmentAddress2,
			'Appointment: city': formData.appointmentCity,
			'Appointment: post code': formData.appointmentPostcode,
			'Booker: number': formData.bookerNumber,
			'Booker: email': formData.bookerEmail,
			'Finance: company name': formData.companyName,
			'Finance: address 1': formData.financeAddress1,
			'Finance: address 2': formData.financeAddress2,
			'Finance: city': formData.financeCity,
			'Finance: post code': formData.financeCity,
			'Finance: email': formData.financeEmail,
		};

		const response = await createAirtableRecord(payload, 'Jobs', env);

		return {
			status: response.success ? 200 : 400,
		};
	} catch (error) {
		console.error('Error sending user to Airtable:', error);

		return defaultFormError;
	}
};

export const action = async ({
	request,
	context,
}: Route.ActionArgs): TBookingAction => {
	if (request.method !== 'POST') return defaultFormError;

	const env = context.cloudflare.env;

	try {
		const formData = await validateFormData(request);

		if (formData.status !== 200 || !formData.data) {
			return formData;
		}

		const bookingData = await sendBookingToAirtable(formData.data, env);

		if (bookingData.status !== 200) {
			return defaultFormError;
		}
	} catch (error) {
		console.error('Error in registration action:', error);
	}
	return defaultFormError;
};

export default function BookInterpreter({
	actionData,
}: Route.ComponentProps): React.ReactNode {
	const fieldErrors = actionData?.fieldErrors;
	const formError = actionData?.error;

	console.log(fieldErrors, formError);

	return (
		<>
			<title>Book an interpreter</title>
			<meta
				name="description"
				content="Book a Manchester Deaf Centre interpreter here."
			/>

			<BookInterpreterTemplate />
		</>
	);
}
