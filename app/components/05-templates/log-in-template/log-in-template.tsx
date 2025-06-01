import type { TFormFieldErrors, TFormSubmissionError } from '~/global-types.ts';

import { useEffect, useRef } from 'react';

import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary.tsx';
import { PasswordInput } from '~/components/02-molecules/password-input/password-input.tsx';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';
import { Form } from '~/components/03-organisms/form/form.tsx';
import { Authentication } from '~/components/04-layouts/authentication/authentication';

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
			<Authentication.Header title="Log in" />

			<main id="main" className={styles.main}>
				{errorTitle && errorBodyText ? (
					<ErrorSummary
						title={errorTitle}
						bodyText={errorBodyText}
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
					noValidate
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
							validationMessage={fieldErrors?.email?.message}
						/>

						<PasswordInput
							id="password"
							label="Password"
							isInvalid={Boolean(fieldErrors?.password)}
							validationMessage={fieldErrors?.password?.message}
						/>
					</Fieldset>
				</Form>
			</main>

			<Authentication.Footer
				items={[
					{
						title: 'Forgot password?',
						cta: {
							linkText: 'Reset password',
							to: '/reset-password',
						},
					},
					{
						title: "Don't have an account?",
						cta: {
							linkText: 'Create an account',
							to: '/registration',
						},
					},
				]}
			/>
		</>
	);
};
