import type { Route } from './+types/home';
import type { ZodIssue } from 'zod';
import type { Env } from '~/global-types.ts';

import { redirect, useFetcher } from 'react-router';
import { registrationFormSchema } from '~/schemas/registration-form-schema';
import { createAirtableRecord } from '~/services/airtable.ts';
import { createNewUser } from '~/services/supabase.ts';
import { camelToKebabCase } from '~/utils/camel-to-kebab-case.ts';
import { convertFormDataToObject } from '~/utils/convert-form-data-to-object';

import { RegistrationForm } from '~/components/04-layouts/registration-form/registration-form';
import { RegistrationFormTemplate } from '~/components/05-templates/registration-form-template/registration-form-template';

export type TFormSubmissionError = {
	title: string;
	bodyText: string;
};

export type TFieldError = {
	name: string;
	id: string;
	message: string;
};

export type TFormFieldErrors = Record<string, TFieldError>;

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

type TFormError = {
	success?: boolean;
	error?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
	fieldErrorsList?: TFieldError[];
};

type TRegistrationAction = Promise<Response | TFormError>;

type TValidateFormData = {
	result?: TFormDataResult;
} & TFormError;

type TRegisterUserData = {
	userId?: string;
} & TFormError;

type TSendUserToAirtable = {
	success: boolean;
} & TFormError;

const defaultFormError = {
	fieldErrors: {},
	fieldErrorsList: [],
	success: false,
	error: {
		title: "We're having a bit of trouble processing your request.",
		bodyText:
			"Don't worry, your information is still here. Please click 'Register your interest' again in a moment.",
	},
};

const buildFieldErrors = (errors: ZodIssue[]): TValidateFormData => {
	const fieldErrors: TFormFieldErrors = {};
	const fieldErrorsList: TFieldError[] = [];

	for (const error of errors) {
		const name = String(error.path[0]);
		const errorObj = {
			name,
			id: camelToKebabCase(name),
			message: error.message,
		};

		fieldErrors[name] = errorObj;
		fieldErrorsList.push(errorObj);
	}

	return {
		fieldErrors,
		fieldErrorsList,
		success: false,
	};
};

const validateFormData = async (
	request: Request<unknown, CfProperties<unknown>>,
): Promise<TValidateFormData> => {
	try {
		const formData = await request.formData();
		const formObject = convertFormDataToObject(formData);
		const result = registrationFormSchema.safeParse(formObject);
		const isSuccess = result.success;

		if (isSuccess) {
			return {
				result: result.data,
			};
		}

		return buildFieldErrors(result.error.errors);
	} catch (error) {
		console.error('Error validating form data:', error);

		return defaultFormError;
	}
};

const registerUser = async (
	result: TFormDataResult,
	env: Env,
): Promise<TRegisterUserData> => {
	try {
		const payload = {
			email: result.email,
			password: result.password,
		};

		const response = await createNewUser(payload, env);

		return {
			userId: response.userId,
		};
	} catch (error) {
		console.error('Error creating user:', error);

		return defaultFormError;
	}
};

const sendUserToAirtable = async (
	userId: string,
	formData: TFormDataResult,
	env: Env,
): Promise<TSendUserToAirtable> => {
	try {
		const regOrg = formData.registrationOrganisation;
		const isJobPostEmails = formData.jobPostEmails === 'yes';
		const isJobSummaryEmails = formData.jobSummaryEmails === 'yes';
		const isRegOrgEmpty = regOrg === '' || !regOrg;

		const payload = {
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
			success: response.success,
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

		if (!formData.result) return formData;

		const userData = await registerUser(formData.result, env);

		if (!userData.userId) return defaultFormError;

		const airtableData = await sendUserToAirtable(
			userData.userId,
			formData.result,
			env,
		);

		if (!airtableData.success) return defaultFormError;

		return redirect('/registration/confirmation');
	} catch (error) {
		console.error('Error in registration action:', error);

		return defaultFormError;
	}
};

export default function Registration() {
	const fetcher = useFetcher<typeof action>();
	const fieldErrors = fetcher.data?.fieldErrors;
	const fieldErrorsList = fetcher.data?.fieldErrorsList;
	const formError = fetcher.data?.error;
	const isSubmitting = fetcher.state === 'submitting';

	return (
		<RegistrationFormTemplate
			formError={formError}
			fieldErrors={fieldErrors}
			fieldErrorsList={fieldErrorsList}
		>
			<fetcher.Form name="registration" method="POST">
				<RegistrationForm
					fieldErrors={fieldErrors}
					isSubmitting={isSubmitting}
				/>
			</fetcher.Form>
		</RegistrationFormTemplate>
	);
}
