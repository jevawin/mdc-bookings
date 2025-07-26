import type { Route } from './+types/log-in.ts';
import type { TFormError, TValidateFormData } from '~/global-types.ts';

import { redirect } from 'react-router';
import { logInFormSchema } from '~/.server/schemas/log-in-form-schema.ts';
import {
	getUser,
	logInWithEmailPassword,
} from '~/.server/services/supabase.ts';
import { commitSession, getSession } from '~/.server/sessions.ts';
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
			"Don't worry, your information is still here. Please click 'Log in' again in a moment.",
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

		return buildFormFieldErrors(result.error.issues);
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

		const cookieHeader = request.headers.get('Cookie');
		const session = await getSession(cookieHeader);

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

export const loader = async ({
	request,
	context,
}: Route.LoaderArgs): Promise<Response | null> => {
	const env = context.cloudflare.env;
	const cookieHeader = request.headers.get('Cookie');
	const session = await getSession(cookieHeader);
	const access_token = session.get('access_token');
	const expires_at = session.get('expires_at');
	const refresh_token = session.get('refresh_token');
	const now = Math.floor(Date.now() / 1000);
	const isExpired = !expires_at || now > expires_at;

	if (access_token || refresh_token || !isExpired) {
		return redirect('/jobs/open');
	}

	const user = await getUser(env, access_token);

	if (user.success) return redirect('/jobs/open');

	return null;
};

export default function LogIn({
	actionData,
}: Route.ComponentProps): React.ReactNode {
	return (
		<>
			<title>Log in</title>
			<meta name="description" content="DESCRIPTION OF YOUR ROUTE." />

			<LogInTemplate
				formError={actionData?.error}
				fieldErrors={actionData?.fieldErrors}
			/>
		</>
	);
}
