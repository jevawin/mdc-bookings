import type { Route } from './+types/home';
import type { Env, TFormError, TValidateFormData } from '~/global-types.ts';
import type { TAirtableInterpreterFields } from '~/services/airtable.ts';

import { redirect } from 'react-router';
import { registrationFormSchema } from '~/schemas/registration-form-schema';
import { createAirtableRecord } from '~/services/airtable.ts';
import { createNewUser } from '~/services/supabase.ts';
import {
	buildFormFieldErrors,
	convertFormDataToObject,
} from '~/utils/form-utils.ts';

import { Authentication } from '~/components/04-layouts/authentication/authentication';
import { RegistrationTemplate } from '~/components/05-templates/registration-template/registration-template';

type TFormDataResult = {
	name: string;
	email: string;
	registrationNumber: string;
	password: string;
	nonNrcpd?: 'yes';
	registrationOrganisation?: string | null | undefined;
	jobPostEmails?: 'yes';
	jobSummaryEmails?: 'yes';
};

type TValidateRegistrationForm = {
	data?: TFormDataResult;
} & TValidateFormData;

type TRegistrationAction = Promise<Response | TFormError>;

type TRegisterUserData = {
	userId?: string;
} & TFormError;

const defaultFormError = {
	fieldErrors: {},
	status: 400,
	error: {
		title: "We're having a bit of trouble processing your request.",
		bodyText:
			"Don't worry, your information is still here. Please click 'Register your interest' again in a moment.",
	},
};

const validateFormData = async (
	request: Request,
): Promise<TValidateRegistrationForm> => {
	try {
		const formData = await request.formData();
		const formObject = convertFormDataToObject(formData);
		const result = registrationFormSchema.safeParse(formObject);
		const isSuccess = result.success;

		if (isSuccess) {
			return {
				status: 200,
				data: result.data,
			};
		}

		return buildFormFieldErrors(result.error.errors);
	} catch (error) {
		console.error('Error validating sign up form data:', error);

		return defaultFormError;
	}
};

const registerUser = async (
	data: TFormDataResult,
	env: Env,
): Promise<TRegisterUserData> => {
	try {
		const payload = {
			email: data.email,
			password: data.password,
		};

		const response = await createNewUser(payload, env);

		if (response.success && response.data) {
			return {
				userId: response.data.id,
				status: 200,
			};
		}

		return defaultFormError;
	} catch (error) {
		console.error('Error creating user:', error);

		return defaultFormError;
	}
};

const sendUserToAirtable = async (
	userId: string,
	formData: TFormDataResult,
	env: Env,
): Promise<TFormError> => {
	try {
		const regOrg = formData.registrationOrganisation;
		const isJobPostEmails = formData.jobPostEmails === 'yes';
		const isJobSummaryEmails = formData.jobSummaryEmails === 'yes';
		const isRegOrgEmpty = regOrg === '' || !regOrg;

		const payload: TAirtableInterpreterFields = {
			'User ID': userId,
			'Email': formData.email,
			'Name': formData.name,
			'Registration organisation': !isRegOrgEmpty ? regOrg : 'NRCPD',
			'Registration number': formData.registrationNumber,
			'Job post emails': isJobPostEmails,
			'Job summary emails': isJobSummaryEmails,
		};

		const response = await createAirtableRecord(
			payload,
			'Interpreters',
			env,
		);

		return {
			status: response.success ? 200 : 400,
		};
	} catch (error) {
		console.error('Error sending user to Airtable:', error);

		return defaultFormError;
	}
};

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Registration' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export const action = async ({
	request,
	context,
}: Route.ActionArgs): TRegistrationAction => {
	if (request.method !== 'POST') return defaultFormError;

	const env = context.cloudflare.env;

	try {
		const formData = await validateFormData(request);

		if (formData.status !== 200 || !formData.data) {
			return formData;
		}

		const userData = await registerUser(formData.data, env);

		if (!userData.userId) {
			return defaultFormError;
		}

		const airtableData = await sendUserToAirtable(
			userData.userId,
			formData.data,
			env,
		);

		if (airtableData.status !== 200) {
			return defaultFormError;
		}

		return redirect('/registration/confirmation');
	} catch (error) {
		console.error('Error in registration action:', error);

		return defaultFormError;
	}
};

export default function Registration({ actionData }: Route.ComponentProps) {
	const fieldErrors = actionData?.fieldErrors;
	const formError = actionData?.error;

	return (
		<>
			<Authentication.Header title="Become an interpreter" />

			<RegistrationTemplate.Form
				formError={formError}
				fieldErrors={fieldErrors}
			/>

			<Authentication.Footer
				title="Already have an account?"
				cta={{ linkText: 'Log in', to: '/log-in' }}
			/>
		</>
	);
}
