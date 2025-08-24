import type { Route } from './+types/home.ts';
import type { TFormError, TValidateFormData } from '~/global-types.ts';

import { redirect } from 'react-router';
import { resetPasswordFormSchema } from '~/.server/schemas/reset-password-schema.ts';
import { forgottenPassword } from '~/.server/services/supabase.ts';
import { getSession } from '~/.server/sessions.ts';
import {
	buildFormFieldErrors,
	convertFormDataToObject,
} from '~/utils/form-utils.ts';

import { Authentication } from '~/components/04-layouts/authentication/authentication.tsx';
import { ResetPasswordTemplate } from '~/components/05-templates/reset-password-template/reset-password-template.tsx';

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
		const result = resetPasswordFormSchema.safeParse(formObject);

		if (result.success) {
			return { status: 200, data: result.data };
		}

		return buildFormFieldErrors(result.error.issues);
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
		const env = context.cloudflare.env;
		const form = await request.formData();
		const formValidation = validateFormData(form);

		if (formValidation.status !== 200 || !formValidation.data) {
			return formValidation;
		}

		const email = formValidation.data.email;
		const sendForgotPassword = await forgottenPassword(env, email);

		if (!sendForgotPassword.success) {
			return defaultFormError;
		}

		return redirect('/reset-password/confirmation');
	} catch (error) {
		console.error('Error in reset password form data:', error);

		return defaultFormError;
	}
};

export const loader = async ({
	request,
}: Route.LoaderArgs): Promise<Response | undefined> => {
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');

	if (token) {
		return redirect('/jobs/open');
	}
};

export default function ResetPassword({
	actionData,
}: Route.ComponentProps): React.ReactNode {
	const fieldErrors = actionData?.fieldErrors;
	const formError = actionData?.error;

	return (
		<>
			<title>
				Reset your password | Manchester Deaf Centre booking system
			</title>
			<meta
				name="description"
				content="Send a password reset link to your email."
			/>

			<Authentication.Header title="Reset password" />

			<ResetPasswordTemplate.Form
				formError={formError}
				fieldErrors={fieldErrors}
			/>
		</>
	);
}
