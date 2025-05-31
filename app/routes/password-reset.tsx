import type { Route } from './+types/password-reset';
import type { TFormError, TValidateFormData } from '~/global-types.ts';

import { getSession } from '~/sessions.server.ts';
import { passwordResetFormSchema } from '~/schemas/password-reset-schema.ts';
import {
	buildFormFieldErrors,
	convertFormDataToObject,
} from '~/utils/form-utils';
import { ResetPasswordTemplate } from '~/components/05-templates/reset-password-template/reset-password-template';

const defaultFormError = {
	fieldErrors: {},
	status: 400,
	error: {
		title: "We're having a bit of trouble processing your request.",
		bodyText:
			"Don't worry, your information is still here. Please click 'Log in' again in a moment.",
	},
};

type TFormDataResult = {
	email: string;
};

type TValidateResetPasswordForm = {
	data?: TFormDataResult;
} & TValidateFormData;

const validateFormData = (formData: FormData): TValidateResetPasswordForm => {
	try {
		const formObject = convertFormDataToObject(formData);
		const result = passwordResetFormSchema.safeParse(formObject);

		if (result.success) {
			return { status: 200, data: result.data };
		}

		return buildFormFieldErrors(result.error.errors);
	} catch (error) {
		console.error('Error validating log in form data:', error);

		return defaultFormError;
	}
};

type TResetPasswordAction = Promise<Response | TFormError>;

export const action = async ({
	request,
	context,
}: Route.ActionArgs): TResetPasswordAction => {
	try {
		const form = await request.formData();
		const formValidation = validateFormData(form);

		if (formValidation.status !== 200 || !formValidation.data) {
			return formValidation;
		}

		return new Response(null, {
			status: 301,
			headers: {
				Location: '/reset-password/success',
			},
		});
	} catch (error) {
		console.error('Error in login form data:', error);

		return defaultFormError;
	}
};

export const loader = async ({
	context,
	request,
}: Route.LoaderArgs): Promise<Response | undefined> => {
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');

	if (token) {
		return new Response(null, {
			status: 301,
			headers: {
				Location: '/jobs/open',
			},
		});
	}
};

export default function PasswordReset({ actionData }: Route.ComponentProps) {
	return (
		<ResetPasswordTemplate
			formError={actionData?.error}
			fieldErrors={actionData?.fieldErrors}
		/>
	);
}
