import { useEffect, useRef } from 'react';
import { pluraliseText } from '~/utils/pluralise-text.ts';

import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary.tsx';

import styles from './registration-form-template.module.css';
import { Text } from '~/components/01-atoms/text/text';

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

export type TRegistrationFormTemplate = React.PropsWithChildren<{
	formError?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
	fieldErrorsList?: TFieldError[];
}>;

export const RegistrationFormTemplate: React.FC<TRegistrationFormTemplate> = ({
	formError,
	fieldErrors,
	fieldErrorsList,
	children,
}) => {
	const errorSummaryRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		if (errorSummaryRef.current && hasFieldsErrors) {
			errorSummaryRef.current.focus();
		}
	}, [fieldErrors]);

	return (
		<main
			id="main"
			className={styles.main}
			data-e2e-id="registration-form-template"
		>
			<div className={styles.container}>
				<Text tag="h1" size="400" weight="300">
					Become an interpreter
				</Text>

				{hasFieldsErrors ? (
					<ErrorSummary
						title={errorTitle}
						bodyText={bodyText}
						fieldErrors={fieldErrorsList}
						errorSummaryRef={errorSummaryRef}
					/>
				) : null}

				{children}
			</div>
		</main>
	);
};
