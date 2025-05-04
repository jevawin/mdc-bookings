import type { Route } from './+types/log-in';
import type { TFormError, TValidateFormData } from '~/global-types.ts';

import { redirect, useActionData } from 'react-router';
import { LogInTemplate } from '~/components/05-templates/log-in-template/log-in-template.tsx';
import {
	buildFormFieldErrors,
	convertFormDataToObject,
} from '~/utils/form-utils';
import { logInFormSchema } from '~/schemas/log-in-form-schema';

const defaultFormError = {
	fieldErrors: {},
	status: 400,
	error: {
		title: "We're having a bit of trouble processing your request.",
		bodyText:
			"Don't worry, your information is still here. Please click 'Register your interest' again in a moment.",
	},
};

type TFormDataResult = {
	email: string;
	password: string;
};

type TValidateLogInForm = {
	data?: TFormDataResult;
} & TValidateFormData;

const validateFormData = async (
	request: Request,
): Promise<TValidateLogInForm> => {
	try {
		const formData = await request.formData();
		const formObject = convertFormDataToObject(formData);
		const result = logInFormSchema.safeParse(formObject);
		const isSuccess = result.success;

		if (isSuccess) {
			return {
				status: 200,
				data: result.data,
			};
		}

		return buildFormFieldErrors(result.error.errors);
	} catch (error) {
		console.error('Error validating log in form data:', error);

		return defaultFormError;
	}
};

export const action = async ({ request }: Route.ActionArgs): TLogInAction => {
	if (request.method !== 'POST') return defaultFormError;

	try {
		const formData = await validateFormData(request);

		if (formData.status !== 200 || !formData.data) {
			return formData;
		}

		return redirect('/job-listings');
	} catch (error) {
		console.error('Error in log in action:', error);

		return defaultFormError;
	}
};

type TLogInAction = Promise<Response | TFormError>;

export default function LogIn() {
	const actionData = useActionData<typeof action>();
	const fieldErrors = actionData?.fieldErrors;
	const formError = actionData?.error;

	return <LogInTemplate formError={formError} fieldErrors={fieldErrors} />;
}
