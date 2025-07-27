import { DatePicker } from '~/components/02-molecules/date-picker/date-picker.tsx';
import type { Route } from './+types/book-interpreter.tsx';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { MdcLogo } from '~/components/01-atoms/mdc-logo/mdc-logo.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Callout } from '~/components/02-molecules/callout/callout.tsx';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset.tsx';
import { RadioInputsGroup } from '~/components/02-molecules/radio-inputs-group/radio-inputs-group.tsx';
import { Form } from '~/components/03-organisms/form/form.tsx';
import { List } from '~/components/03-organisms/list/list.tsx';
import { Segment } from '~/components/04-layouts/segment/segment.tsx';
import { SelectInputsGroup } from '~/components/02-molecules/select-inputs-group/select-inputs-group.tsx';
import { TextInputsGroup } from '../components/02-molecules/text-inputs-group/text-inputs-group.tsx';
import { TermsConditionsCheckbox } from '../components/01-atoms/terms-conditions-checkbox/terms-conditions-checkbox.tsx';

type TBookeInterpreterData = {
	message: string;
};

export const loader = async ({
	context,
}: Route.LoaderArgs): Promise<TBookeInterpreterData> => {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
};

export default function BookInterpreter({
	actionData,
	loaderData,
}: Route.ComponentProps): React.ReactNode {
	console.log(actionData, 'actionData');
	console.log(loaderData, 'loaderData');

	return (
		<>
			<title>Book an interpreter</title>
			<meta name="description" content="DESCRIPTION OF YOUR ROUTE." />

			<Segment.Root id="interpreter-booking">
				<Segment.Container>
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
						All MDC interpreters are BSL level 6 qualified; adhere
						to the NRCPD code of conduct; are DBS checked; and, have
						professional indemnity insurance. Specialists are
						further qualified in their specialisms. If you'd like to
						discuss your booking, please contact our bookings
						officer: 0161 273 6699 bookings@manchesterdeafcentre.com
					</Text>
					<Text tag="p" size="200">
						If you'd like to discuss your booking, please contact
						our bookings officer:
					</Text>
					<List.Root>
						<List.Item>
							<Icon name="check-circle" color="brand" />
							<Text size="300" weight="200">
								0161 273 6699
							</Text>
						</List.Item>
						<List.Item>
							<Icon name="check-circle" color="brand" />
							<Text size="300" weight="200">
								<TextLink
									to="mailto:bookings@manchesterdeafcentre.com"
									linkText="bookings@manchesterdeafcentre.com"
									size="300"
								/>
							</Text>
						</List.Item>
					</List.Root>
					<Callout color="brand">
						<Icon name="user-circle-star" color="brand" size={30} />
						<Text size="200" weight="200">
							We'll share this with your interpreter/s.
						</Text>
					</Callout>
					<Form
						title="interpreter booking"
						id="interpreter-booking-form"
						method="POST"
						submitButtonText="Request booking →"
					>
						{/* SERVICE */}
						<Fieldset
							id="appointment-type"
							title="Appointment type"
						>
							<RadioInputsGroup
								label="Which service do you require?"
								isRequired={true}
								items={[
									{
										name: 'service',
										value: 'bsl-to-english-interpreters',
										icon: 'check-circle',
										description:
											'BSL to English interpreters',
									},
									{
										name: 'service',
										value: 'lipspeaker',
										icon: 'lips',
										description: 'Lipspeaker',
									},
									{
										name: 'service',
										value: 'deaf-intermediary-interpreters',
										icon: 'hearing-loop',
										description:
											'Deaf intermediary interpreters',
									},
									{
										name: 'service',
										value: 'deafblind-interpreters',
										icon: 'blind-person',
										description: 'Deafblind interpreters',
									},
									{
										name: 'service',
										value: 'speech-to-text-reporters',
										icon: 'speech-bubble',
										description: 'Speech to text reporters',
									},
									{
										name: 'service',
										value: 'note-takers',
										icon: 'pencil',
										description: 'Note takers',
									},
								]}
							/>

							{/* APPOINTMENT TYPE */}
							<RadioInputsGroup
								label="What type of appointment is it?"
								isRequired={true}
								items={[
									{
										title: 'General',
										name: 'appointment-type',
										value: 'general',
										icon: 'check-circle',
										description:
											'Work meetings, home visits (non-medical), events, job interviews, etc.',
									},
									{
										title: 'Medical',
										name: 'appointment-type',
										value: 'medical',
										icon: 'cross',
										description:
											"Hospital or GP appointments, health visits, opticians' appointments.",
									},
									{
										title: 'Specialist',
										name: 'appointment-type',
										value: 'specialist',
										icon: 'certificate',
										description:
											'Legal, mental health, child protection, or assistance with the police.',
									},
								]}
							/>

							{/* SIU / SFT */}
							<RadioInputsGroup
								label="Are you booking from either SIU or SFT?"
								isRequired={true}
								description={`Choose "No" if you're unsure.`}
								items={[
									{
										name: 'siu-sft',
										value: 'no',
										description: 'No',
									},
									{
										name: 'siu-sft',
										value: 'siu',
										description:
											'Stockport Interpreting Unit (SIU)',
									},
									{
										name: 'siu-sft',
										value: 'sft',
										description:
											'Stockport NHS Foundation Trust (SFT)',
									},
								]}
							/>

							{/* ACCESS TO WORK */}
							<RadioInputsGroup
								label={`Is this an "Access to Work" booking?`}
								description={`Choose "No" if you're unsure.`}
								isRequired={true}
								items={[
									{
										name: 'access-to-work',
										value: 'yes',
										description: 'Yes',
									},
									{
										name: 'access-to-work',
										value: 'no',
										description: 'No',
									},
								]}
							/>

							{/* APPOINTMENT INFORMATION */}
							<Text weight="200" tag="p">
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
									Will preparation notes be provided before
									the appointment?
								</List.Item>
								<List.Item>
									<Icon name="question-circle" size={18} />
									Will the appointment be
									recorded/live-streamed?
								</List.Item>
								<List.Item>
									<Icon name="question-circle" size={18} />
									Anything else you think we should know.
								</List.Item>
							</List.Root>
							<textarea
								name="appointment-description"
								placeholder="Describe the appointment in as much detail as possible"
								maxLength={5000}
							></textarea>
						</Fieldset>

						{/* INTERPRETER PREFERENCE */}
						<Fieldset
							id="interpreter-preference"
							title="Interpreter preference"
						>
							<RadioInputsGroup
								label={`What gender interpreter/s do you need?`}
								isRequired={true}
								items={[
									{
										name: 'interpreter-gender',
										value: 'male',
										description: 'Male',
									},
									{
										name: 'interpreter-gender',
										value: 'female',
										description: 'Female',
									},
									{
										name: 'interpreter-gender',
										value: 'either',
										description: "Don't mind",
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
								minDate={new Date(
									Date.now() + 24 * 60 * 60 * 1000,
								)
									.toISOString()
									.substring(0, 16)}
							></DatePicker>

							{/* APPOINTMENT DURATION */}
							<SelectInputsGroup
								isRequired={true}
								label="How long is the appointment?"
								items={[
									{
										label: 'Hours',
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
										label: 'Minutes',
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
							<TextInputsGroup
								dataSharing={true}
								label="Where is the appointment?"
								isRequired={true}
								items={[
									{
										id: 'address_1',
										label: 'Address line 1',
									},
									{
										id: 'address_2',
										label: 'Address line 2',
										isRequired: false,
										showRequired: true,
									},
									{ id: 'city', label: 'Town or city' },
									{ id: 'postcode', label: 'Post code' },
								]}
							/>

							{/* CONTACT NAME */}
							<TextInputsGroup
								dataSharing={true}
								label="Who should our interpreter/s contact?"
								isRequired={true}
								items={[
									{
										id: 'name',
										label: 'Forename and surname',
									},
								]}
							/>

							{/* CONTACT NUMBER */}
							<TextInputsGroup
								dataSharing={true}
								label="What's their phone number?"
								description="In case we need to call, for example to gain access to a building."
								isRequired={true}
								items={[
									{
										id: 'name',
										label: 'Forename and surname',
									},
								]}
							/>

							{/* CONTACT NUMBER */}
							<TextInputsGroup
								dataSharing={true}
								label="What is the client's name?"
								description="The D/deaf or hard of hearing person we'll be interpreting for."
								isRequired={true}
								items={[
									{
										id: 'name',
										label: 'Forename and surname',
									},
								]}
							/>
						</Fieldset>

						{/* YOUR DETAILS */}
						<Fieldset id="your-details" title="Your details">
							{' '}
							{/* CONTACT DETAILS */}
							<TextInputsGroup
								items={[
									{
										id: 'your-name',
										isRequired: true,
										label: "What's your name?",
										description: 'Forename and surname',
										showRequired: true,
									},
									{
										id: 'your-number',
										isRequired: true,
										label: "What's your phone number?",
										description:
											"We'll only use this to contact you about this booking.",
										showRequired: true,
									},
									{
										id: 'your-email',
										isRequired: true,
										label: "What's your email address?",
										description:
											"We'll only use this to contact you about this booking.",
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
							{' '}
							{/* COMPANY NAME */}
							<TextInputsGroup
								items={[
									{
										id: 'company-name',
										isRequired: false,
										label: "What's your company's name?",
										showRequired: true,
									},
								]}
							/>
							{/* COMPANY ADDRESS */}
							<TextInputsGroup
								label="What's your company's address?"
								description="We\ll use this address on your invoice."
								isRequired={true}
								items={[
									{
										id: 'address_1',
										label: 'Address line 1',
									},
									{
										id: 'address_2',
										label: 'Address line 2',
										isRequired: false,
										showRequired: true,
									},
									{ id: 'city', label: 'Town or city' },
									{ id: 'postcode', label: 'Post code' },
								]}
							/>
							{/* FINANCE EMAIL */}
							<TextInputsGroup
								items={[
									{
										id: 'finance-email',
										isRequired: false,
										label: "What's your finance email address?",
										description:
											"We'll send invoices to this email address.",
										showRequired: true,
									},
								]}
							/>
						</Fieldset>

						{/* TERMS CHECK BOX */}
						<TermsConditionsCheckbox
							cancellationLink="#null"
							termsLink="#null"
						/>
					</Form>
				</Segment.Container>
			</Segment.Root>
		</>
	);
}
