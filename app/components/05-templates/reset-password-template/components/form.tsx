import type { TFormFieldErrors, TFormSubmissionError } from '~/global-types.ts';

import { useEffect, useRef } from 'react';
import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';
import { Form } from '~/components/03-organisms/form/form.tsx';

import styles from '../reset-password-template.module.css';

export type TResetPasswordForm = {
	formError?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
};

export const ResetPasswordForm: React.FC<TResetPasswordForm> = ({
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
		<main id="main" className={styles.main}>
			{errorTitle && errorBodyText ? (
				<ErrorSummary
					title={errorTitle}
					bodyText={errorBodyText}
					errorSummaryRef={errorSummaryRef}
				/>
			) : null}

			<Form
				action="/reset-password"
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
	);
};
