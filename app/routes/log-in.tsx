import type { Route } from './+types/log-in';
import type { TFormError, TValidateFormData } from '~/global-types.ts';

import { redirect } from 'react-router';
import { logInFormSchema } from '~/schemas/log-in-form-schema.ts';
import { getUser, logInWithEmailPassword } from '~/services/supabase.ts';
import { commitSession, getSession } from '~/sessions.server';
import {
	buildFormFieldErrors,
	convertFormDataToObject,
} from '~/utils/form-utils.ts';

import { LogInTemplate } from '~/components/05-templates/log-in-template/log-in-template.tsx';

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

const validateFormData = (formData: FormData): TValidateLogInForm => {
	try {
		const formObject = convertFormDataToObject(formData);
		const result = logInFormSchema.safeParse(formObject);

		if (result.success) {
			return { status: 200, data: result.data };
		}

		return buildFormFieldErrors(result.error.errors);
	} catch (error) {
		console.error('Error validating log in form data:', error);

		return defaultFormError;
	}
};

const buildFormError = (error?: { msg?: string }): TFormError => {
	return {
		...defaultFormError,
		error: {
			title: error?.msg
				? 'Oops! There was an error'
				: defaultFormError.error.title,
			bodyText: error?.msg ? error.msg : defaultFormError.error.bodyText,
		},
	};
};

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Log in' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

type TLogInAction = Promise<Response | TFormError>;

export const action = async ({
	request,
	context,
}: Route.ActionArgs): TLogInAction => {
	const env = context.cloudflare.env;

	try {
		const form = await request.formData();
		const formValidation = validateFormData(form);

		if (formValidation.status !== 200 || !formValidation.data) {
			return formValidation;
		}

		const loginResult = await logInWithEmailPassword(
			formValidation.data,
			env,
		);

		if (!loginResult.success) {
			return buildFormError(loginResult.error);
		}

		const session = await getSession();

		const access_token = loginResult.data.access_token;
		const refresh_token = loginResult.data.refresh_token;
		const expires_at = loginResult.data.expires_at;

		session.set('access_token', access_token);
		session.set('refresh_token', refresh_token);
		session.set('expires_at', expires_at);

		return redirect('/jobs/open', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	} catch (error) {
		console.error('Error in login form data:', error);

		return defaultFormError;
	}
};

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	const env = context.cloudflare.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const token = session.get('access_token');
	const expiresAt = session.get('expires_at');
	const now = Math.floor(Date.now() / 1000);

	if ((!token || !expiresAt) && now > expiresAt) {
		return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
	}

	const user = await getUser(env, token);

	if (user.success) return redirect('/jobs/open');

	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
};

export default function LogIn({ actionData }: Route.ComponentProps) {
	return (
		<LogInTemplate
			formError={actionData?.error}
			fieldErrors={actionData?.fieldErrors}
		/>
	);
}
