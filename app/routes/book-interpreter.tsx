import { Icon } from '~/components/01-atoms/icon/icon';
import { MdcLogo } from '~/components/01-atoms/mdc-logo/mdc-logo';
import { TextLink } from '~/components/01-atoms/text-link/text-link';
import { Text } from '~/components/01-atoms/text/text';
import { Callout } from '~/components/02-molecules/callout/callout';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset';
import { FormInputsGroup } from '~/components/02-molecules/form-inputs-group/form-inputs-group';
import { Form } from '~/components/03-organisms/form/form';
import { List } from '~/components/03-organisms/list/list';
import { Segment } from '~/components/04-layouts/segment/segment';
import type { Route } from './+types/book-interpreter';

export const loader = async (data: Route.LoaderArgs) => {
	return data;
};

export default function BookInterpreter(data: Route.ComponentProps) {
	return (
		<>
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
							We'll share this with your interpreter.
						</Text>
					</Callout>
					<Form
						title="interpreter booking"
						id="interpreter-booking-form"
						method="POST"
						submitButtonText="Request booking →"
					>
						<Fieldset
							id="appointment-type"
							title="Appointment type"
						>
							{/* SERVICE */}
							<FormInputsGroup
								label="Which service do you require?"
								isRequired={true}
								items={[
									{
										name: 'service',
										value: 'bsl-to-english-interpreters',
										icon: 'bsl-hands',
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
							<FormInputsGroup
								label="What type of appointment is it?"
								isRequired={true}
								items={[
									{
										title: 'General',
										name: 'appointment-type',
										value: 'general',
										icon: 'bsl-hands',
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
						</Fieldset>

						{/* SIU / SFT */}
						<FormInputsGroup
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
						<FormInputsGroup
							label={`Is this an "Access to Work" booking?`}
							description={`Choose "No" if you're unsure.`}
							isRequired={true}
							items={[
								{
									name: 'access-to-work',
									value: 'no',
									description: 'No',
								},
								{
									name: 'access-to-work',
									value: 'yes',
									description: 'Yes',
								},
							]}
						/>
					</Form>
				</Segment.Container>
			</Segment.Root>
		</>
	);
}
