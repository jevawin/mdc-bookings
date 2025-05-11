import type { TFormFieldErrors, TFormSubmissionError } from '~/global-types.ts';

import { useEffect, useRef } from 'react';
import { pluraliseText } from '~/utils/string-utils.ts';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';
import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary.tsx';
import { PasswordInput } from '~/components/02-molecules/password-input/password-input.tsx';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';
import { Form } from '~/components/03-organisms/form/form.tsx';

import styles from './log-in-template.module.css';

export type TLogInTemplate = {
	formError?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
};

export const LogInTemplate: React.FC<TLogInTemplate> = ({
	formError,
	fieldErrors,
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
		const errorSummary = errorSummaryRef.current;

		if (errorSummary && hasFieldsErrors) {
			errorSummary.focus();
		}
	}, [fieldErrors]);

	return (
		<div className={styles.container} data-e2e-id="log-in-template">
			<div className={styles.inner}>
				<main className={styles.main}>
					<header className={styles.header}>
						<Text tag="h1" size="400" weight="300">
							Log in
						</Text>
					</header>

					<main id="main" className={styles.main}>
						{hasFieldsErrors ? (
							<ErrorSummary
								title={errorTitle}
								bodyText={bodyText}
								errorSummaryRef={errorSummaryRef}
							/>
						) : null}

						<Form
							action="/log-in"
							id="log-in"
							title="Log in"
							method="post"
							submitButtonText="Log in"
							className={styles.form}
						>
							<Fieldset id="your-details" title="Your details">
								<TextInput
									id="email"
									type="email"
									name="email"
									label="Email"
									autoComplete="email"
									inputMode="email"
									isRequired={true}
									isInvalid={Boolean(fieldErrors?.email)}
									validationMessage={
										fieldErrors?.email?.message
									}
								/>

								<PasswordInput
									id="password"
									label="Password"
									isInvalid={Boolean(fieldErrors?.password)}
									validationMessage={
										fieldErrors?.password?.message
									}
								/>
							</Fieldset>
						</Form>
					</main>

					<footer className={styles.footer}>
						<Text tag="h2" size="100" weight="200">
							Don't have an account?
						</Text>

						<TextLink
							to="/registration"
							linkText="Create an account"
						/>
					</footer>
				</main>
			</div>
		</div>
	);
};
