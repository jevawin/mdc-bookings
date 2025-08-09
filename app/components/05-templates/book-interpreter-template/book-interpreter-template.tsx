import type {
	TFieldError,
	TFormFieldErrors,
	TFormSubmissionError,
} from '~/global-types.ts';

import { useEffect, useRef } from 'react';

import { TermsConditionsCheckbox } from '~/components/01-atoms/terms-conditions-checkbox/terms-conditions-checkbox.tsx';

import { DatePicker } from '~/components/02-molecules/date-picker/date-picker.tsx';
import { ErrorSummary } from '~/components/02-molecules/error-summary/error-summary.tsx';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';
import { Textarea } from '~/components/02-molecules/textarea/textarea.tsx';
import { FormInputsGroup } from '~/components/03-organisms/form-inputs-group/form-inputs-group.tsx';

import { Form } from '~/components/03-organisms/form/form.tsx';

import { Container } from '~/components/04-layouts/container/container.tsx';

import styles from './book-interpreter-template.module.css';

export type TBookInterpreterTemplate = {
	formError?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
};

export const BookInterpreterTemplate: React.FC<TBookInterpreterTemplate> = ({
	formError,
	fieldErrors,
}) => {
	const errorSummaryRef = useRef<HTMLDivElement>(null);

	// Hours and minutes error
	const appointmentDurationError = (
		hours: TFieldError | undefined,
		minutes: TFieldError | undefined,
	): string => {
		const and = hours && minutes ? 'and' : '';
		const hoursMessage = hours?.message ?? '';
		const minutesMessage = minutes?.message ?? '';

		if (hours || minutes) {
			return `Please set ${hoursMessage} ${and} ${minutesMessage} (can be 0)`;
		}

		return '';
	};

	useEffect(() => {
		const errorSummary = errorSummaryRef.current;

		if (errorSummary && formError) {
			errorSummary.focus();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fieldErrors]);

	return (
		<Container className={styles.container}>
			<div className={styles.inner}>
				{formError?.title && formError?.bodyText ? (
					<ErrorSummary
						title={formError.title}
						bodyText={formError.bodyText}
						errorSummaryRef={errorSummaryRef}
					/>
				) : null}

				<Form
					title="interpreter booking"
					id="interpreter-booking-form"
					method="POST"
					action="/book-interpreter"
					submitButtonText="Request booking →"
					className={styles.form}
				>
					{/* APPOINTMENT OVERVIEW */}
					<Fieldset
						id="appointment-overview"
						title="Appointment overview"
					>
						{/* SERVICE */}
						<FormInputsGroup
							id="service"
							type="radio"
							title="Which service do you require?"
							isRequired={true}
							isInvalid={Boolean(fieldErrors?.appointmentService)}
							validationMessage={
								fieldErrors?.appointmentService?.message
							}
							items={[
								{
									id: 'bsl-to-english-interpreter',
									label: 'BSL to English interpreter',
									name: 'appointmentService',
									value: 'BSL to English interpreter',
									icon: 'check-circle',
								},
								{
									id: 'lipspeaker',
									label: 'Lipspeaker',
									name: 'appointmentService',
									value: 'Lipspeaker',
									icon: 'lips',
								},
								{
									id: 'deaf-intermediary-interpreter',
									label: 'Deaf intermediary interpreter',
									name: 'appointmentService',
									value: 'Deaf intermediary interpreter',
									icon: 'hearing-loop',
								},
								{
									id: 'deafblind-interpreter',
									label: 'Deafblind interpreter',
									name: 'appointmentService',
									value: 'Deafblind interpreters',
									icon: 'blind-person',
								},
								{
									id: 'speech-to-text-reporter',
									label: 'Speech to text reporter',
									name: 'appointmentService',
									value: 'Speech to text reporter',
									icon: 'speech-bubble',
								},
								{
									id: 'note-taker',
									label: 'Note taker',
									name: 'appointmentService',
									value: 'Note taker',
									icon: 'pencil',
								},
							]}
						/>

						{/* APPOINTMENT TYPE */}
						<FormInputsGroup
							id="appointment-type"
							type="radio"
							title="What type of appointment is it?"
							isRequired={true}
							isInvalid={Boolean(
								fieldErrors?.appointmentSpecialism,
							)}
							validationMessage={
								fieldErrors?.appointmentSpecialism?.message
							}
							items={[
								{
									id: 'appointment-general',
									label: 'General',
									name: 'appointmentSpecialism',
									value: 'General',
									hint: 'Work meetings, home visits (non-medical), events, job interviews, etc',
									icon: 'bsl-hands',
								},
								{
									id: 'appointment-medical',
									label: 'Medical',
									name: 'appointmentSpecialism',
									value: 'Medical',
									hint: "Hospital or GP appointments, health visits, opticians' appointments.",
									icon: 'check-circle',
								},
								{
									id: 'appointment-specialist',
									label: 'Specialist',
									name: 'appointmentSpecialism',
									value: 'Specialist',
									hint: 'Legal, mental health, child protection, or assistance with the police.',
									icon: 'check-circle',
								},
							]}
						/>

						{/* SIU / SFT */}
						<FormInputsGroup
							id="siu-sft"
							type="radio"
							title="Are you booking from either SIU or SFT?"
							hint={'Choose "No" if you\'re unsure.'}
							isRequired={true}
							isInvalid={Boolean(
								fieldErrors?.appointmentOrganisation,
							)}
							validationMessage={
								fieldErrors?.appointmentOrganisation?.message
							}
							items={[
								{
									id: 'siu-sft-none',
									label: 'No',
									name: 'appointmentOrganisation',
									value: 'GEN',
								},
								{
									id: 'siu',
									label: 'Stockport Interpreting Unit (SIU)',
									name: 'appointmentOrganisation',
									value: 'SIU',
								},
								{
									id: 'sft',
									label: 'Stockport NHS Foundation Trust (SFT)',
									name: 'appointmentOrganisation',
									value: 'SFT',
								},
							]}
						/>

						{/* ACCESS TO WORK */}
						<FormInputsGroup
							id="access-to-work-booking"
							type="radio"
							title='Is this an "Access to Work" booking?'
							hint={'Choose "No" if you\'re unsure.'}
							isRequired={true}
							isInvalid={Boolean(fieldErrors?.accessToWork)}
							validationMessage={
								fieldErrors?.accessToWork?.message
							}
							items={[
								{
									id: 'access-to-work-yes',
									label: 'Yes',
									name: 'accessToWork',
									value: 'Yes',
								},
								{
									id: 'access-to-work-no',
									label: 'No',
									name: 'accessToWork',
									value: 'No',
								},
							]}
						/>

						{/* APPOINTMENT DESCRIPTION */}
						<Textarea
							id="appointment-description"
							label="What else can you tell us about the appointment?"
							name="appointmentDescription"
							hint="For example, tell us if your client has any access needs, if you have a preferred interpreter, if you'll send preparation notes, or if the appointment will be recorded or live-streamed."
						/>
					</Fieldset>

					{/* INTERPRETER PREFERENCE */}
					<Fieldset
						id="interpreter-preference"
						title="Interpreter preference"
					>
						{/* INTERPRETER GENDER/S */}
						<FormInputsGroup
							id="interpreter-gender"
							type="radio"
							title="What gender interpreter/s do you need?"
							isRequired={true}
							isInvalid={Boolean(fieldErrors?.interpreterGender)}
							validationMessage={
								fieldErrors?.interpreterGender?.message
							}
							items={[
								{
									id: 'interpreter-gender-male',
									label: 'Male',
									name: 'interpreterGender',
									value: 'Male',
								},
								{
									id: 'interpreter-gender-female',
									label: 'Female',
									name: 'interpreterGender',
									value: 'Female',
								},
								{
									id: 'interpreter-gender-either',
									label: "Don't mind",
									name: 'interpreterGender',
									value: 'Any',
								},
							]}
						/>
					</Fieldset>

					{/* APPOINTMENT DETAILS */}
					<Fieldset
						id="appointment-details"
						title="Appointment details"
					>
						<DatePicker
							id="appointment-date"
							label="When is the appointment?"
							name="appointmentDate"
							hint="If you need an appointment within 24 hours, please call 0161 273 3415"
							isRequired={true}
							isInvalid={Boolean(fieldErrors?.appointmentDate)}
							validationMessage={
								fieldErrors?.appointmentDate?.message
							}
							minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)
								.toISOString()
								.substring(0, 16)}
						/>

						{/* APPOINTMENT DURATION */}
						<FormInputsGroup
							id="appointment-duration"
							type="select"
							title="How long is the appointment?"
							isRequired={true}
							isInvalid={Boolean(
								fieldErrors?.hours || fieldErrors?.minutes,
							)}
							validationMessage={appointmentDurationError(
								fieldErrors?.hours,
								fieldErrors?.minutes,
							)}
							items={[
								{
									id: 'appointment-duration-hours',
									label: 'Hours',
									name: 'hours',
									options: [
										{
											description: '',
											value: '',
										},
										{
											description: '0',
											value: 0,
										},
										{
											description: '1',
											value: 1,
										},
										{
											description: '2',
											value: 2,
										},
										{
											description: '3',
											value: 3,
										},
										{
											description: '4',
											value: 4,
										},
										{
											description: '5',
											value: 5,
										},
										{
											description: '6',
											value: 6,
										},
										{
											description: '7',
											value: 7,
										},
										{
											description: '8',
											value: 8,
										},
										{
											description: '9',
											value: 9,
										},
										{
											description: '10',
											value: 10,
										},
									],
								},
								{
									id: 'appointment-duration-minutes',
									label: 'Minutes',
									name: 'minutes',
									options: [
										{
											description: '',
											value: '',
										},
										{
											description: '0',
											value: 0,
										},
										{
											description: '15',
											value: 15,
										},
										{
											description: '30',
											value: 30,
										},
										{
											description: '45',
											value: 45,
										},
									],
								},
							]}
						/>

						{/* APPOINTMENT LOCATION */}
						<FormInputsGroup
							id="appointment-location"
							type="input"
							title="Where is the appointment?"
							isRequired={true}
							items={[
								{
									id: 'appointment-department',
									label: 'Department',
									name: 'appointmentDepartment',
									isRequired: false,
									showRequired: true,
								},
								{
									id: 'appointment-address-1',
									label: 'Address line 1',
									name: 'appointmentAddress1',
									autoComplete: 'address-line1',
									isInvalid: Boolean(
										fieldErrors?.appointmentAddress1,
									),
									validationMessage:
										fieldErrors?.appointmentAddress1
											?.message,
								},
								{
									id: 'appointment-address-2',
									label: 'Address line 2',
									name: 'appointmentAddress2',
									autoComplete: 'address-line2',
									isRequired: false,
									showRequired: true,
								},
								{
									id: 'appointment-city',
									label: 'Town or city',
									name: 'appointmentCity',
									autoComplete: 'address-level2',
									isInvalid: Boolean(
										fieldErrors?.appointmentCity,
									),
									validationMessage:
										fieldErrors?.appointmentCity?.message,
								},
								{
									id: 'appointment-postcode',
									label: 'Postcode',
									name: 'appointmentPostcode',
									autoComplete: 'postal-code',
									isInvalid: Boolean(
										fieldErrors?.appointmentPostcode,
									),
									validationMessage:
										fieldErrors?.appointmentPostcode
											?.message,
								},
							]}
						/>

						{/* CONTACT NAME */}
						<TextInput
							id="contact-name"
							label="Who should our interpreter/s contact?"
							hint="Forename and surname"
							name="contactName"
							autoComplete="name"
							isInvalid={Boolean(fieldErrors?.contactName)}
							validationMessage={
								fieldErrors?.contactName?.message
							}
						/>

						{/* CONTACT NUMBER */}
						<TextInput
							id="phone-number"
							label="What's their phone number?"
							hint="In case we need to call, for example to gain access to a building."
							name="contactNumber"
							autoComplete="tel"
							inputMode="tel"
							isDataShared={true}
							isInvalid={Boolean(fieldErrors?.contactNumber)}
							validationMessage={
								fieldErrors?.contactNumber?.message
							}
						/>

						{/* CLIENT NAME */}
						<TextInput
							id="client-name"
							label="What is the client's name?"
							hint="The D/deaf or hard of hearing person we'll be interpreting for."
							name="clientName"
							isDataShared={true}
							isInvalid={Boolean(fieldErrors?.clientName)}
							validationMessage={fieldErrors?.clientName?.message}
						/>
					</Fieldset>

					{/* YOUR DETAILS */}
					<Fieldset id="your-details" title="Your details">
						<FormInputsGroup
							id="your-details-info"
							type="input"
							isRequired={true}
							items={[
								{
									id: 'your-name',
									label: "What's your name?",
									hint: 'Forename and surname',
									name: 'bookerName',
									autoComplete: 'name',
									showRequired: true,
									isInvalid: Boolean(fieldErrors?.bookerName),
									validationMessage:
										fieldErrors?.bookerName?.message,
								},
								{
									id: 'your-number',
									label: "What's your phone number?",
									hint: "We'll only use this to contact you about this booking.",
									name: 'bookerNumber',
									autoComplete: 'tel',
									inputMode: 'tel',
									showRequired: true,
									isInvalid: Boolean(
										fieldErrors?.bookerNumber,
									),
									validationMessage:
										fieldErrors?.bookerNumber?.message,
								},
								{
									id: 'your-email',
									label: "What's your email address?",
									hint: "We'll only use this to contact you about this booking.",
									name: 'bookerEmail',
									autoComplete: 'email',
									inputMode: 'email',
									showRequired: true,
									isInvalid: Boolean(
										fieldErrors?.bookerEmail,
									),
									validationMessage:
										fieldErrors?.bookerEmail?.message,
								},
							]}
						/>
					</Fieldset>

					{/* FINANCE INFORMATION */}
					<Fieldset
						id="finance-information"
						title="Finance information"
					>
						{/* COMPANY NAME */}
						<TextInput
							id="company-name"
							label="What's your company's name?"
							name="companyName"
							autoComplete="organization"
							isRequired={false}
							showRequired={true}
						/>

						{/* COMPANY ADDRESS */}
						<FormInputsGroup
							id="company-address"
							type="input"
							title="What's your company's address?"
							hint="We'll use this address on your invoice."
							isRequired={true}
							items={[
								{
									id: 'company-address-1',
									label: 'Address line 1',
									name: 'financeAddress1',
									autoComplete: 'billing address-line1',
									isInvalid: Boolean(
										fieldErrors?.financeAddress1,
									),
									validationMessage:
										fieldErrors?.financeAddress1?.message,
								},
								{
									id: 'company-address-2',
									label: 'Address line 2',
									name: 'financeAddress2',
									autoComplete: 'billing address-line2',
									isRequired: false,
									showRequired: true,
								},
								{
									id: 'company-address-city',
									label: 'Town or city',
									name: 'financeCity',
									autoComplete: 'billing address-level2',
									isInvalid: Boolean(
										fieldErrors?.financeCity,
									),
									validationMessage:
										fieldErrors?.financeCity?.message,
								},
								{
									id: 'company-address-postcode',
									label: 'Postcode',
									name: 'financePostcode',
									autoComplete: 'billing postal-code',
									isInvalid: Boolean(
										fieldErrors?.financePostcode,
									),
									validationMessage:
										fieldErrors?.financePostcode?.message,
								},
							]}
						/>

						{/* FINANCE EMAIL */}
						<TextInput
							id="finance-email"
							label="What's your finance email address?"
							name="financeEmail"
							autoComplete="work email"
							hint="We'll send invoices to this email address."
							isRequired={false}
							showRequired={true}
							isInvalid={Boolean(fieldErrors?.financeEmail)}
							validationMessage={
								fieldErrors?.financeEmail?.message
							}
						/>

						{/* FINANCE PO */}
						<TextInput
							id="finance-po"
							label="What's your PO or cost centre code?"
							name="financePO"
							hint="You can provide this later if you don't have it to hand."
							isRequired={false}
							showRequired={true}
							isInvalid={Boolean(fieldErrors?.financePO)}
							validationMessage={fieldErrors?.financePO?.message}
						/>
					</Fieldset>

					{/* TERMS CHECK BOX */}
					<TermsConditionsCheckbox
						cancellationLink="#cancellation-charges"
						termsLink="#terms-conditions"
						name="termsConditions"
						isInvalid={Boolean(fieldErrors?.termsConditions)}
					/>
				</Form>
			</div>
		</Container>
	);
};
