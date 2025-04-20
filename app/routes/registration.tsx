import type { Route } from './+types/registration';

import { useFetcher } from 'react-router';
import { registrationFormSchema } from '~/schemas/registration-form-schema';
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

type TFormActionError = Promise<{
	error?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
	fieldErrorsList?: TFieldError[];
}>;

const defaultFormError = {
	fieldErrors: {},
	fieldErrorsList: [],
	error: {
		title: "We're having a bit of trouble processing your request.",
		bodyText:
			"Don't worry, your information is still here. Please click 'Register your interest' again in a moment.",
	},
};

export const action = async ({
	request,
}: Route.ActionArgs): TFormActionError => {
	if (request.method !== 'POST') return defaultFormError;

	try {
		const formData = await request.formData();
		const formObject = convertFormDataToObject(formData);
		const fieldErrors: TFormFieldErrors = {};
		const fieldErrorsList: TFieldError[] = [];
		const result = registrationFormSchema.safeParse(formObject);

		if (!result.success) {
			for (const error of result.error.errors) {
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
			};
		}

		return {
			fieldErrors: {},
			fieldErrorsList: [],
			error: undefined,
		};
	} catch (error) {
		return defaultFormError;
	}
};

// export const loader = async (data: Route.LoaderArgs) => {
// 	return data;
// };

export default function Registration() {
	const fetcher = useFetcher<typeof action>();
	const fieldErrors = fetcher.data?.fieldErrors;
	const fieldErrorsList = fetcher.data?.fieldErrorsList;
	const formError = fetcher.data?.error;

	return (
		<RegistrationFormTemplate
			formError={formError}
			fieldErrors={fieldErrors}
			fieldErrorsList={fieldErrorsList}
		>
			<fetcher.Form name="registration" method="POST">
				<RegistrationForm fieldErrors={fieldErrors} />
			</fetcher.Form>
		</RegistrationFormTemplate>
	);
}
