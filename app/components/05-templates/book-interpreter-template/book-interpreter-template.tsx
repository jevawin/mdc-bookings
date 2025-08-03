import type {
	TFieldError,
	TFormFieldErrors,
	TFormSubmissionError,
} from '../../../global-types.ts';

import { useEffect, useRef } from 'react';

import { TermsConditionsCheckbox } from '~/components/01-atoms/terms-conditions-checkbox/terms-conditions-checkbox.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';

import { DatePicker } from '~/components/02-molecules/date-picker/date-picker.tsx';
import { ErrorSummary } from '../../02-molecules/error-summary/error-summary.tsx';
import { FormInputsGroup } from '~/components/02-molecules/form-inputs-group/form-inputs-group.tsx';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';

import { Form } from '~/components/03-organisms/form/form.tsx';
import { List } from '~/components/03-organisms/list/list.tsx';

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
		<>
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
						isInvalid={Boolean(fieldErrors?.appointmentSpecialism)}
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
						validationMessage={fieldErrors?.accessToWork?.message}
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

					{/* APPOINTMENT INFORMATION */}
					{/* TODO: Textarea component goes here, name: appointmentDetails */}

					{/* <Text weight="200" tag="p">
							What else can you tell us about the appointment?
						</Text>
						<Text weight="100" tag="p">
							Things that are useful for us to know:
						</Text>
						<List.Root>
							<List.Item>
								<Icon name="question-circle" size={18} />
								Does your client have special requirements?
							</List.Item>
							<List.Item>
								<Icon name="question-circle" size={18} />
								Would you prefer a particular interpreter?
							</List.Item>
							<List.Item>
								<Icon name="question-circle" size={18} />
								Will preparation notes be provided before the
								appointment?
							</List.Item>
							<List.Item>
								<Icon name="question-circle" size={18} />
								Will the appointment be recorded/live-streamed?
							</List.Item>
							<List.Item>
								<Icon name="question-circle" size={18} />
								Anything else you think we should know.
							</List.Item>
						</List.Root> */}
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
				<Fieldset id="appointment-details" title="Appointment details">
					<DatePicker
						description="If you need an appointment within 24 hours, please call 0161 273 3415"
						name="appointmentDate"
						isInvalid={Boolean(fieldErrors?.appointmentDate)}
						validationMessage={
							fieldErrors?.appointmentDate?.message
						}
						label="When is the appointment?"
						isRequired={true}
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
								id: 'appointment-address-1',
								label: 'Address line 1',
								name: 'appointmentAddress1',
								isInvalid: Boolean(
									fieldErrors?.appointmentAddress1,
								),
								validationMessage:
									fieldErrors?.appointmentAddress1?.message,
							},
							{
								id: 'appointment-address-2',
								label: 'Address line 2',
								name: 'appointmentAddress2',
								isRequired: false,
								showRequired: true,
							},
							{
								id: 'appointment-city',
								label: 'Town or city',
								name: 'appointmentCity',
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
								isInvalid: Boolean(
									fieldErrors?.appointmentPostcode,
								),
								validationMessage:
									fieldErrors?.appointmentPostcode?.message,
							},
						]}
					/>

					{/* CONTACT NAME */}
					<TextInput
						id="contact-name"
						label="Who should our interpreter/s contact?"
						hint="Forename and surname"
						name="contactName"
						isInvalid={Boolean(fieldErrors?.contactName)}
						validationMessage={fieldErrors?.contactName?.message}
					/>

					{/* CONTACT NUMBER */}
					<TextInput
						id="phone-number"
						label="What's their phone number?"
						hint="In case we need to call, for example to gain access to a building."
						name="contactNumber"
						inputMode="tel"
						isDataShared={true}
						isInvalid={Boolean(fieldErrors?.contactNumber)}
						validationMessage={fieldErrors?.contactNumber?.message}
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
								isInvalid: Boolean(fieldErrors?.bookerNumber),
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
								isInvalid: Boolean(fieldErrors?.bookerEmail),
								validationMessage:
									fieldErrors?.bookerEmail?.message,
							},
						]}
					/>
				</Fieldset>

				{/* FINANCE INFORMATION */}
				<Fieldset id="finance-information" title="Finance information">
					{/* COMPANY NAME */}
					<TextInput
						id="company-name"
						label="What's your company's name?"
						name="companyName"
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
							},
							{
								id: 'company-address-2',
								label: 'Address line 2',
								name: 'financeAddress2',
								isRequired: false,
								showRequired: true,
							},
							{
								id: 'company-address-city',
								label: 'Town or city',
								name: 'financeCity',
							},
							{
								id: 'company-address-postcode',
								label: 'Postcode',
								name: 'financePostcode',
							},
						]}
					/>

					{/* FINANCE EMAIL */}
					<TextInput
						id="finance-email"
						label="What's your finance email address?"
						name="financeEmail"
						hint="We'll send invoices to this email address."
						isRequired={false}
						showRequired={true}
					/>
				</Fieldset>

				{/* TERMS CHECK BOX */}
				<TermsConditionsCheckbox
					cancellationLink="#cancellation-charges"
					termsLink="#terms-conditions"
				/>
			</Form>

			<div className="terms-conditions-wrapper">
				<Text
					color="brand"
					size="300"
					weight="300"
					id="terms-conditions"
				>
					Manchester Deaf Centre interpreter booking terms and
					conditions:
				</Text>
				<List.Root>
					<List.Item>
						<Text>
							This contract is with Manchester Deaf Centre Ltd. If
							the Customer is reclaiming the cost of the
							interpreter from another organisation (for example
							Access to Work or a student's local authority)
							although Manchester Deaf Centre will support the
							Customer to reclaim the cost, the Customer is
							responsible for paying Manchester Deaf Centre in
							full within 30 days.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							The Interpreter is bound by professional
							confidentiality and is required to adhere to the
							NRCPD Code of Conduct.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							All Interpreters placed by Manchester Deaf Centre
							Ltd have Professional Indemnity Insurance and a
							current DBS.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							The Interpreter will interpret to the best of their
							ability, knowledge and belief. However, no guarantee
							can be given as to the absolute accuracy of any
							interpretation. Manchester Deaf Centre Ltd will only
							place interpreters with the relevant skills and
							experience to competently undertake the work.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							We may advise that more than 1 BSL interpreter needs
							to be booked for certain assignments for co-working
							support and quality assurance. This will be at our
							discretion and Manchester Deaf Centre Ltd will
							always discuss this with the booker before booking
							additional interpreters.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							Manchester Deaf Centre will only book NRCPD
							registered Trainee Interpreters with relevant skills
							and experience to undertake assignments.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							Please contact{' '}
							<TextLink
								to="mailto:bookings@manchesterdeafcentre.com"
								linkText="bookings@manchesterdeafcentre.com"
								color="brand"
							/>{' '}
							for information related to fees.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							Assignments outside core hours of Monday to Friday
							9am - 6pm will be charged at normal fees plus 50%.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							The customer agrees to remittance terms and
							conditions i.e. to pay Manchester Deaf Centre Ltd
							invoices in full within 30 days of receipts.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							Once a booking has been confirmed, either verbally
							or in writing, it is binding. Should it become
							necessary to cancel the booking, the following
							charges will be made:
						</Text>
					</List.Item>
				</List.Root>
				<Text color="brand" weight="300" id="cancellation-charges">
					Cancellation charges
				</Text>
				<List.Root>
					<List.Item>
						<Text>
							15 days' notice or more before the booking date:{' '}
							<Text weight="300">no cancellation fee</Text>.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							8-14 days' notice before the booking date:{' '}
							<Text weight="300">50% cancellation fee</Text>.
						</Text>
					</List.Item>
					<List.Item>
						<Text>
							1-7 days' notice before the booking date:{' '}
							<Text weight="300">full charge applies</Text>.
						</Text>
					</List.Item>
				</List.Root>
			</div>
		</>
	);
};
