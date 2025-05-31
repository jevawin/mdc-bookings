import type { TFormFieldErrors, TFormSubmissionError } from '~/global-types.ts';

import { useEffect, useRef } from 'react';
import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset';
import { TextInput } from '~/components/02-molecules/text-input/text-input';
import { Form } from '~/components/03-organisms/form/form';
import { Authentication } from '~/components/04-layouts/authentication/authentication';

import styles from './reset-password-template.module.css';

export type TResetPasswordTemplate = {
	formError?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
};

export const ResetPasswordTemplate: React.FC<TResetPasswordTemplate> = ({
	formError,
	fieldErrors,
}) => {
	const errorSummaryRef = useRef<HTMLDivElement>(null);

	const errorTitle = formError?.title;
	const errorBodyText = formError?.bodyText;

	useEffect(() => {
		const errorSummary = errorSummaryRef.current;

		if (errorSummary && formError) {
			errorSummary.focus();
		}
	}, [fieldErrors]);

	return (
		<>
			<Authentication.Header title="Reset password" />

			<main id="main" className={styles.main}>
				{errorTitle && errorBodyText ? (
					<ErrorSummary
						title={errorTitle}
						bodyText={errorBodyText}
						errorSummaryRef={errorSummaryRef}
					/>
				) : null}

				<Form
					action="/password-reset"
					id="reset-password"
					title="Reset password"
					method="post"
					noValidate
					className={styles.form}
				>
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
				</Form>
			</main>
		</>
	);
};
