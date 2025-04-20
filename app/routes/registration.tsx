import type { Route } from './+types/registration';

import { useEffect, useRef } from 'react';
import { Form, useActionData } from 'react-router';
import { registrationFormSchema } from '~/schemas/registration-form-schema';
import { convertFormDataToObject } from '~/utils/convert-form-data-to-object';
import { pluraliseText } from '~/utils/pluralise-text.ts';

import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';
import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary.tsx';
import {
	Button,
	ButtonContent,
} from '~/components/02-molecules/button/button.tsx';
import { camelToKebabCase } from '~/utils/camel-to-kebab-case.ts';

type TFormSubmissionError = {
	title: string;
	bodyText: string;
};

type TFieldError = {
	name: string;
	id: string;
	message: string;
};

type TFormFieldErrors = Record<string, TFieldError>;

type TFormActionError = Promise<{
	error?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
	fieldErrorsList?: TFieldError[];
}>;

const getErrorReturn = () => ({
	fieldErrors: {},
	fieldErrorsList: [],
	error: {
		title: "We're having a bit of trouble processing your request.",
		bodyText:
			"Don't worry, your information is still here. Please click 'Register your interest' again in a moment.",
	},
});

export const action = async ({
	request,
}: Route.ActionArgs): TFormActionError => {
	if (request.method !== 'POST') return getErrorReturn();

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
		return getErrorReturn();
	}
};

// export const loader = async (data: Route.LoaderArgs) => {
// 	return data;
// };

export default function Registration() {
	const actionData = useActionData<typeof action>();
	const errorSummaryRef = useRef<HTMLDivElement>(null);

	const fieldErrors = actionData?.fieldErrors;
	const fieldErrorsList = actionData?.fieldErrorsList;
	const formError = actionData?.error;

	const fieldErrorsCount = Object.keys(fieldErrors ?? {}).length;
	const hasFieldsErrors = fieldErrorsCount >= 1;
	const hasMultipleErrors = fieldErrorsCount > 1;
	const pluralCount = pluraliseText(fieldErrorsCount, 'field');
	const verb = hasMultipleErrors ? 'are' : 'is';

	const altErrorTitle =
		'We need some more information to complete your registration.';
	const altErrorBodyText = `Failed to submit because ${pluralCount} ${verb} invalid:`;

	const errorTitle = formError?.title ?? altErrorTitle;
	const bodyText = formError?.bodyText ?? altErrorBodyText;

	console.log({ fieldErrors, formError });

	useEffect(() => {
		if (errorSummaryRef.current && hasFieldsErrors) {
			errorSummaryRef.current.focus();
		}
	}, [fieldErrors]);

	return (
		<>
			<h1>Become an interpreter</h1>

			{hasFieldsErrors ? (
				<ErrorSummary
					title={errorTitle}
					bodyText={bodyText}
					fieldErrors={fieldErrorsList}
					errorSummaryRef={errorSummaryRef}
				/>
			) : null}

			<Form name="registration" method="POST">
				<fieldset>
					<legend>Your details</legend>

					<TextInput
						id="name"
						name="name"
						label="Full name"
						autoComplete="name"
						inputMode="text"
						isRequired={true}
						isInvalid={Boolean(fieldErrors?.name)}
						validationMessage={fieldErrors?.name?.message}
					/>

					<TextInput
						id="email"
						type="email"
						name="email"
						label="Email"
						autoComplete="email"
						inputMode="email"
						isRequired={true}
						isInvalid={Boolean(fieldErrors?.email)}
						validationMessage={fieldErrors?.email?.message}
					/>
				</fieldset>

				<fieldset>
					<legend>NRCPD details</legend>

					<div>
						<p>
							If you're NRCPD-registered, please provide your
							registration number here.
						</p>

						<p>
							If not, please choose "Non-NRCPD", tell us who
							you're registered with, and provide a registration
							number..
						</p>
					</div>

					<div>
						<input
							id="non-nrcpd"
							type="checkbox"
							name="nonNrcpd"
							value="yes"
						/>
						<label htmlFor="non-nrcpd">Non-NRCPD</label>
					</div>

					<TextInput
						id="registration-organisation"
						name="registrationOrganisation"
						label="Registration organisation"
						autoComplete="text"
						inputMode="text"
						isRequired={true}
						isInvalid={Boolean(
							fieldErrors?.registrationOrganisation
						)}
						validationMessage={
							fieldErrors?.registrationOrganisation?.message
						}
					/>

					<TextInput
						id="registration-number"
						name="registrationNumber"
						label="Registration number"
						autoComplete="text"
						inputMode="text"
						isRequired={true}
						isInvalid={Boolean(fieldErrors?.registrationNumber)}
						validationMessage={
							fieldErrors?.registrationNumber?.message
						}
					/>
				</fieldset>

				<fieldset>
					<legend>Password</legend>

					<TextInput
						id="password"
						type="password"
						name="password"
						label="Create a great password"
						autoComplete="password"
						inputMode="text"
						isRequired={true}
						isInvalid={Boolean(fieldErrors?.password)}
						validationMessage={fieldErrors?.password?.message}
					/>
				</fieldset>

				<fieldset>
					<legend>Notification settings</legend>

					<div>
						<p>Email me about new job listings:</p>
					</div>

					<div>
						<input
							id="job-post-emails"
							type="checkbox"
							name="jobPostEmails"
							value="yes"
						/>
						<label htmlFor="job-post-emails">
							As soon as a job goes live
						</label>
					</div>

					<div>
						<input
							id="job-summary-emails"
							type="checkbox"
							name="jobSummaryEmails"
							value="yes"
						/>
						<label htmlFor="job-summary-emails">
							A daily summary
						</label>
					</div>
				</fieldset>

				<Button type="submit" variant="primary">
					<ButtonContent.Text>Register</ButtonContent.Text>
				</Button>
			</Form>
		</>
	);
}
