import type { Route } from './+types/registration';

import { useEffect, useRef } from 'react';
import { Form, useActionData } from 'react-router';
import { registrationFormSchema } from 'schemas/registration-form-schema.ts';
import { convertFormDataToObject } from 'utils/convert-form-data-to-object.ts';
import { pluraliseText } from '~/utils/pluralise-text.ts';

import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';
import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary.tsx';
import {
	Button,
	ButtonContent,
} from '~/components/02-molecules/button/button.tsx';

type TFormSubmissionError = {
	title: string;
	bodyText: string;
};

type TFormFieldErrors = {
	name?: string;
	email?: string;
	password?: string;
	registrationNumber?: string;
	registrationOrganisation?: string;
};

type TFormActionError = Promise<{
	error?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
}>;

const getErrorReturn = () => ({
	fieldErrors: {},
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
		const fieldErrors: Record<string, string | undefined> = {};
		const result = registrationFormSchema.safeParse(formObject);

		if (!result.success) {
			for (const error of result.error.errors) {
				fieldErrors[error.path[0]] = error.message;
			}

			return {
				fieldErrors,
			};
		}

		return {
			fieldErrors: {},
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
	const formError = actionData?.error;

	const fieldErrorsCount = Object.keys(fieldErrors ?? {}).length;
	const hasFieldsErrors = fieldErrorsCount >= 1;
	const hasMultipleErrors = fieldErrorsCount > 1;
	const pluralCount = pluraliseText(fieldErrorsCount, 'field');
	const verb = hasMultipleErrors ? 'are' : 'is';

	const altErrorTitle =
		'We need some more information to complete your registration.';
	const altErrorBodyText = `Failed to submit because ${pluralCount} ${verb} invalid.`;

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
						validationMessage={fieldErrors?.name}
					/>

					<TextInput
						id="email"
						name="email"
						label="Email"
						autoComplete="email"
						inputMode="email"
						isRequired={true}
						isInvalid={Boolean(fieldErrors?.email)}
						validationMessage={fieldErrors?.email}
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
							fieldErrors?.registrationOrganisation
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
						validationMessage={fieldErrors?.registrationNumber}
					/>
				</fieldset>

				<fieldset>
					<legend>Password</legend>

					<TextInput
						id="password"
						name="password"
						label="Create a great password"
						autoComplete="password"
						inputMode="text"
						isRequired={true}
						isInvalid={Boolean(fieldErrors?.password)}
						validationMessage={fieldErrors?.password}
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
