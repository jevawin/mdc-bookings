import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { MdcLogo } from '~/components/01-atoms/mdc-logo/mdc-logo.tsx';
import { TermsConditionsCheckbox } from '~/components/01-atoms/terms-conditions-checkbox/terms-conditions-checkbox.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';

import { Callout } from '~/components/02-molecules/callout/callout.tsx';
import { DatePicker } from '~/components/02-molecules/date-picker/date-picker.tsx';
import { FormInputsGroup } from '~/components/02-molecules/form-inputs-group/form-inputs-group.tsx';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';

import { Form } from '~/components/03-organisms/form/form.tsx';
import { List } from '~/components/03-organisms/list/list.tsx';

import { Container } from '~/components/04-layouts/container/container.tsx';

// import styles from './book-interpreter-template.module.css';

export type TBookInterpreterTemplate = React.PropsWithChildren;

export const BookInterpreterTemplate: React.FC<
	TBookInterpreterTemplate
> = () => {
	return (
		<main id="main">
			<Container>
				<MdcLogo size="200" />

				<Text
					id="interpreter-booking-title"
					tag="h1"
					size="300"
					weight="300"
				>
					Interpreter booking
				</Text>

				<Text tag="p" size="200">
					All MDC interpreters are BSL level 6 qualified; adhere to
					the NRCPD code of conduct; are DBS checked; and, have
					professional indemnity insurance. Specialists are further
					qualified in their specialisms. If you'd like to discuss
					your booking, please contact our bookings officer: 0161 273
					6699 bookings@manchesterdeafcentre.com
				</Text>

				<Text tag="p" size="200">
					If you'd like to discuss your booking, please contact our
					bookings officer:
				</Text>

				<List.Root>
					<List.Item>
						<Icon name="check-circle" color="brand" />
						<Text size="200" weight="200">
							0161 273 6699
						</Text>
					</List.Item>
					<List.Item>
						<Icon name="check-circle" color="brand" />
						<TextLink
							to="mailto:bookings@manchesterdeafcentre.com"
							linkText="bookings@manchesterdeafcentre.com"
							size="200"
						/>
					</List.Item>
				</List.Root>

				<Callout color="brand">
					<Icon name="user-circle-star" color="brand" size={30} />
					<Text size="100" weight="200">
						This indicates information we'll share with your
						interpreters
					</Text>
				</Callout>

				<Form
					title="interpreter booking"
					id="interpreter-booking-form"
					method="POST"
					submitButtonText="Request booking →"
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
							items={[
								{
									id: 'bsl-to-english-interpreters',
									label: 'BSL to English interpreters',
									name: 'service',
									value: 'BSL to English interpreters',
									icon: 'check-circle',
								},
								{
									id: 'lipspeaker',
									label: 'Lipspeaker',
									name: 'service',
									value: 'lipspeaker',
									icon: 'lips',
								},
								{
									id: 'deaf-intermediary-interpreters',
									label: 'Deaf intermediary interpreters',
									name: 'service',
									value: 'Deaf intermediary interpreters',
									icon: 'hearing-loop',
								},
								{
									id: 'deafblind-interpreters',
									label: 'Deafblind interpreters',
									name: 'service',
									value: 'Deafblind interpreters',
									icon: 'blind-person',
								},
								{
									id: 'speech-to-text-reporters',
									label: 'Speech to text reporters',
									name: 'service',
									value: 'Speech to text reporters',
									icon: 'speech-bubble',
								},
								{
									id: 'note-takers',
									label: 'Note takers',
									name: 'service',
									value: 'Note takers',
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
							items={[
								{
									id: 'appointment-general',
									label: 'General',
									name: 'appointment-type',
									value: 'General',
									hint: 'Work meetings, home visits (non-medical), events, job interviews, etc',
									icon: 'bsl-hands',
								},
								{
									id: 'appointment-medical',
									label: 'Medical',
									name: 'appointment-type',
									value: 'Medical',
									hint: "Hospital or GP appointments, health visits, opticians' appointments.",
									icon: 'check-circle',
								},
								{
									id: 'appointment-specialist',
									label: 'Specialist',
									name: 'appointment-type',
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
							items={[
								{
									id: 'siu-sft-none',
									label: 'No',
									name: 'siu-sft',
									value: 'No',
								},
								{
									id: 'siu',
									label: 'Stockport Interpreting Unit (SIU)',
									name: 'siu-sft',
									value: 'SIU',
								},
								{
									id: 'sft',
									label: 'Stockport NHS Foundation Trust (SFT)',
									name: 'siu-sft',
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
							items={[
								{
									id: 'access-to-work-yes',
									label: 'Yes',
									name: 'access-to-work',
									value: 'Yes',
								},
								{
									id: 'access-to-work-no',
									label: 'No',
									name: 'access-to-work',
									value: 'No',
								},
							]}
						/>

						{/* APPOINTMENT INFORMATION */}
						{/* TODO: Textarea component goes here */}

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
							items={[
								{
									id: 'interpreter-gender-male',
									label: 'Male',
									name: 'interpreter-gender',
									value: 'Male',
								},
								{
									id: 'interpreter-gender-female',
									label: 'Female',
									name: 'interpreter-gender',
									value: 'Female',
								},
								{
									id: 'interpreter-gender-either',
									label: "Don't mind",
									name: 'interpreter-gender',
									value: 'Either',
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
							description="If you need an appointment within 24 hours, please call 0161 273 3415"
							name="appointment-date"
							validationMessage="Please provide an appointment date, 24+ hours from now"
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
							items={[
								{
									id: 'appointment-duration-hours',
									label: 'Hours',
									name: 'appointment-duration-hours',
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
									name: 'appointment-duration-minutes',
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
									name: 'appointment-address-1',
								},
								{
									id: 'appointment-address-2',
									label: 'Address line 2',
									name: 'appointment-address-2',
									isRequired: false,
									showRequired: true,
								},
								{
									id: 'appointment-city',
									label: 'Town or city',
									name: 'appointment-city',
								},
								{
									id: 'appointment-postcode',
									label: 'Postcode',
									name: 'appointment-postcode',
								},
							]}
						/>

						{/* CONTACT NAME */}
						<TextInput
							id="contact-name"
							label="Who should our interpreter/s contact?"
							hint="Forename and surname"
							name="contact-name"
						/>

						{/* CONTACT NUMBER */}
						<TextInput
							id="phone-number"
							label="What's their phone number?"
							hint="In case we need to call, for example to gain access to a building."
							name="phone-number"
							inputMode="tel"
							isDataShared={true}
						/>

						{/* CLIENT NAME */}
						<TextInput
							id="client-name"
							label="What is the client's name?"
							hint="The D/deaf or hard of hearing person we'll be interpreting for."
							name="client-name"
							isDataShared={true}
						/>
					</Fieldset>

					{/* YOUR DETAILS */}
					<Fieldset id="your-details" title="Your details">
						{/* CONTACT DETAILS */}
						<FormInputsGroup
							id="your-details-info"
							type="input"
							isRequired={true}
							items={[
								{
									id: 'your-name',
									label: "What's your name?",
									hint: 'Forename and surname',
									name: 'your-name',
									autoComplete: 'name',
									showRequired: true,
								},
								{
									id: 'your-number',
									label: "What's your phone number?",
									hint: "We'll only use this to contact you about this booking.",
									name: 'your-number',
									autoComplete: 'tel',
									inputMode: 'tel',
									showRequired: true,
								},
								{
									id: 'your-email',
									label: "What's your email address?",
									hint: "We'll only use this to contact you about this booking.",
									name: 'your-email',
									autoComplete: 'email',
									inputMode: 'email',
									showRequired: true,
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
							name="company-name"
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
									name: 'company-address-1',
								},
								{
									id: 'company-address-2',
									label: 'Address line 2',
									name: 'company-address-2',
									isRequired: false,
									showRequired: true,
								},
								{
									id: 'company-address-city',
									label: 'Town or city',
									name: 'company-address-city',
								},
								{
									id: 'company-address-postcode',
									label: 'Postcode',
									name: 'company-address-postcode',
								},
							]}
						/>

						{/* FINANCE EMAIL */}
						<TextInput
							id="finance-email"
							label="What's your finance email address?"
							name="finance-email"
							hint="We'll send invoices to this email address."
							isRequired={false}
							showRequired={true}
						/>
					</Fieldset>

					{/* TERMS CHECK BOX */}
					<TermsConditionsCheckbox
						cancellationLink="#null"
						termsLink="#null"
					/>
				</Form>

				<div className="terms-conditions-wrapper">
					<Text color="brand" size="300" weight="300">
						Manchester Deaf Centre interpreter booking terms and
						conditions:
					</Text>
					<List.Root>
						<List.Item>
							<Text>
								This contract is with Manchester Deaf Centre
								Ltd. If the Customer is reclaiming the cost of
								the interpreter from another organisation (for
								example Access to Work or a student's local
								authority) although Manchester Deaf Centre will
								support the Customer to reclaim the cost, the
								Customer is responsible for paying Manchester
								Deaf Centre in full within 30 days.
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
								All Interpreters placed by Manchester Deaf
								Centre Ltd have Professional Indemnity Insurance
								and a current DBS.
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								The Interpreter will interpret to the best of
								their ability, knowledge and belief. However, no
								guarantee can be given as to the absolute
								accuracy of any interpretation. Manchester Deaf
								Centre Ltd will only place interpreters with the
								relevant skills and experience to competently
								undertake the work.
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								We may advise that more than 1 BSL interpreter
								needs to be booked for certain assignments for
								co-working support and quality assurance. This
								will be at our discretion and Manchester Deaf
								Centre Ltd will always discuss this with the
								booker before booking additional interpreters.
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Manchester Deaf Centre will only book NRCPD
								registered Trainee Interpreters with relevant
								skills and experience to undertake assignments.
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
								Assignments outside core hours of Monday to
								Friday 9am - 6pm will be charged at normal fees
								plus 50%.
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								The customer agrees to remittance terms and
								conditions i.e. to pay Manchester Deaf Centre
								Ltd invoices in full within 30 days of receipts.
							</Text>
						</List.Item>
						<List.Item>
							<Text>
								Once a booking has been confirmed, either
								verbally or in writing, it is binding. Should it
								become necessary to cancel the booking, the
								following charges will be made:
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
			</Container>
		</main>
	);
};
