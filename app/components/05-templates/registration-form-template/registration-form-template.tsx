import type { TFormFieldErrors, TFormSubmissionError } from '~/global-types.ts';

import { useEffect, useRef } from 'react';
import { pluraliseText } from '~/utils/string-utils.ts';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary.tsx';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset.tsx';
import { InlineCheckbox } from '~/components/02-molecules/inline-checkbox/inline-checkbox.tsx';
import { PasswordInput } from '~/components/02-molecules/password-input/password-input.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';
import { Form } from '~/components/04-layouts/form/form.tsx';

import styles from './registration-form-template.module.css';

export type TRegistrationFormTemplate = {
	formError?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
};

export const RegistrationFormTemplate: React.FC<TRegistrationFormTemplate> = ({
	formError,
	fieldErrors,
}) => {
	const errorSummaryRef = useRef<HTMLDivElement>(null);
	const registrationOrganisationRef = useRef<HTMLDivElement>(null);

	const handleNonNrcpdClick = (e: React.MouseEvent<HTMLInputElement>) => {
		const currentTarget = e.currentTarget;
		const isChecked = currentTarget.checked;
		const regOrganisation = registrationOrganisationRef.current;

		if (isChecked && regOrganisation) {
			regOrganisation.hidden = false;
		}

		if (!isChecked && regOrganisation) {
			regOrganisation.hidden = true;
		}
	};

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
		<div
			className={styles.container}
			data-e2e-id="registration-form-template"
		>
			<div className={styles.inner}>
				<header className={styles.header}>
					<Text tag="h1" size="400" weight="300">
						Become an interpreter
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
						id="registration"
						title="Registration"
						method="post"
						className={styles.form}
					>
						<Fieldset id="your-details" title="Your details">
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
						</Fieldset>

						<Fieldset
							id="nrcpd-details"
							title="NRCPD details"
							bodyText="if you're NRCPD-registered, please provide your registration number here. If not, please choose 'Non-NRCPD, tell us who you're registered with, and provide a registration number."
						>
							<InlineCheckbox
								id="non-nrcpd"
								name="nonNrcpd"
								label="Non-NRCPD"
								value="yes"
								onClick={handleNonNrcpdClick}
							/>

							<TextInput
								hidden={true}
								id="registration-organisation"
								name="registrationOrganisation"
								label="Registration organisation"
								autoComplete="text"
								inputMode="text"
								isRequired={true}
								isInvalid={Boolean(
									fieldErrors?.registrationOrganisation,
								)}
								ref={registrationOrganisationRef}
								validationMessage={
									fieldErrors?.registrationOrganisation
										?.message
								}
							/>

							<TextInput
								id="registration-number"
								name="registrationNumber"
								label="Registration number"
								autoComplete="text"
								inputMode="text"
								isRequired={true}
								isInvalid={Boolean(
									fieldErrors?.registrationNumber,
								)}
								validationMessage={
									fieldErrors?.registrationNumber?.message
								}
							/>
						</Fieldset>

						<Fieldset id="password-details" title="Password">
							<PasswordInput
								id="password"
								label="Create a great password"
								hint="Minimum of 8 characters"
								isInvalid={Boolean(fieldErrors?.password)}
								validationMessage={
									fieldErrors?.password?.message
								}
							/>
						</Fieldset>

						<Fieldset
							id="notification-settings"
							title="Notification settings"
							bodyText="Email me about new job listings:"
						>
							<InlineCheckbox
								id="job-post-emails"
								name="jobPostEmails"
								label="As soon as a job goes live"
								value="yes"
							/>

							<InlineCheckbox
								id="job-summary-emails"
								name="jobSummaryEmails"
								label="A daily summary"
								value="yes"
							/>
						</Fieldset>
					</Form>
				</main>
			</div>
		</div>
	);
};
