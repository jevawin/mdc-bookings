import type { Route } from './+types/new.ts';
import type { TFormError, TValidateFormData } from '~/global-types.ts';
import type { TGetUser } from '~/services/supabase.ts';

import { redirect } from 'react-router';
import { newPasswordFormSchema } from '~/schemas/new-password-schema.ts';
import { getUser, updateUser } from '~/services/supabase.ts';
import { getSession } from '~/sessions.server.ts';
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
	password: string;
};

type TValidateResetPasswordForm = {
	data?: TFormDataResult;
} & TValidateFormData;

const validateFormData = (formData: FormData): TValidateResetPasswordForm => {
	try {
		const formObject = convertFormDataToObject(formData);
		const result = newPasswordFormSchema.safeParse(formObject);

		if (result.success) {
			return { status: 200, data: result.data };
		}

		return buildFormFieldErrors(result.error.issues);
	} catch (error) {
		console.error('Error validating log in form data:', error);

		return defaultFormError;
	}
};

type TNewPasswordAction = Promise<Response | TFormError>;

export const action = async ({
	request,
	context,
}: Route.ActionArgs): TNewPasswordAction => {
	try {
		const env = context.cloudflare.env;
		const cookieHeader = request.headers.get('Cookie');
		const form = await request.formData();
		const formValidation = validateFormData(form);

		if (formValidation.status !== 200 || !formValidation.data) {
			return formValidation;
		}

		const session = await getSession(cookieHeader);
		const token = session.get('access_token');
		const password = formValidation.data.password;
		const payload = { password };

		const updatePassword = await updateUser(env, token, payload);

		if (!updatePassword.success) {
			return defaultFormError;
		}

		return redirect('/account');
	} catch (error) {
		console.error('Error in reset password form data:', error);

		return defaultFormError;
	}
};

export const loader = async ({
	request,
	context,
}: Route.LoaderArgs): Promise<Response | TGetUser> => {
	const env = context.cloudflare.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);

	const access_token = session.get('access_token');
	const expires_at = session.get('expires_at');
	const refresh_token = session.get('refresh_token');
	const now = Math.floor(Date.now() / 1000);
	const isExpired = !expires_at || now > expires_at;

	if (!access_token || !refresh_token || isExpired) {
		return redirect('/log-in');
	}

	const user = await getUser(env, access_token);

	if (!user.success) {
		return redirect('/log-in');
	}

	return user;
};

export default function New({
	actionData,
}: Route.ComponentProps): React.ReactNode {
	const fieldErrors = actionData?.fieldErrors;
	const formError = actionData?.error;

	return (
		<>
			<title>Create new password</title>
			<meta name="description" content="DESCRIPTION OF YOUR ROUTE." />

			<Authentication.Header title="Change password" />

			<ResetPasswordTemplate.NewPassword
				formError={formError}
				fieldErrors={fieldErrors}
			/>
		</>
	);
}
