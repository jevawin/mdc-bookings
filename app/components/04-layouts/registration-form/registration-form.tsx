import type { TFormFieldErrors } from '~/routes/registration.tsx';

import { useRef } from 'react';
import {
	Button,
	ButtonContent,
} from '~/components/02-molecules/button/button.tsx';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset.tsx';
import { InlineCheckbox } from '~/components/02-molecules/inline-checkbox/inline-checkbox.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';

import styles from './registration-form.module.css';

export type TRegistrationForm = {
	fieldErrors?: TFormFieldErrors;
};

export const RegistrationForm: React.FC<TRegistrationForm> = ({
	fieldErrors,
}) => {
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

	return (
		<div className={styles.container}>
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
					isInvalid={Boolean(fieldErrors?.registrationOrganisation)}
					ref={registrationOrganisationRef}
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
					validationMessage={fieldErrors?.registrationNumber?.message}
				/>
			</Fieldset>

			<Fieldset id="password-details" title="Password">
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

			<Button type="submit" variant="primary">
				<ButtonContent.Text>Register</ButtonContent.Text>
			</Button>
		</div>
	);
};
