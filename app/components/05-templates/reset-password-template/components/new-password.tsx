import type { TFormFieldErrors, TFormSubmissionError } from '~/global-types.ts';

import { useEffect, useRef } from 'react';
import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary.tsx';
import { PasswordInput } from '~/components/02-molecules/password-input/password-input.tsx';
import { Form } from '~/components/03-organisms/form/form.tsx';

import styles from '../reset-password-template.module.css';

export type TResetPasswordNew = {
	formError?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
};

export const ResetPasswordNew: React.FC<TResetPasswordNew> = ({
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				action="/reset-password/new"
				id="new-password"
				title="New password"
				method="post"
				noValidate
				className={styles.form}
			>
				<PasswordInput
					id="password"
					name="password"
					label="New password"
					isRequired={true}
					isInvalid={Boolean(fieldErrors?.password)}
					validationMessage={fieldErrors?.password?.message}
				/>
			</Form>
		</main>
	);
};
