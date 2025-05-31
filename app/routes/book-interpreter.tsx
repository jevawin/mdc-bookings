import { Form } from '~/components/03-organisms/form/form';
import type { Route } from './+types/book-interpreter';
import { Fieldset } from '~/components/02-molecules/fieldset/fieldset';
import { Segment } from '~/components/04-layouts/segment/segment';
import { Text } from '~/components/01-atoms/text/text';
import { MdcLogo } from '~/components/01-atoms/mdc-logo/mdc-logo';
import { List } from '~/components/03-organisms/list/list';
import { Icon } from '~/components/01-atoms/icon/icon';
import { Link } from 'react-router';
import { TextLink } from '~/components/01-atoms/text-link/text-link';
import { Callout } from '~/components/02-molecules/callout/callout';
import { TextInput } from '~/components/02-molecules/text-input/text-input';

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
							<Icon name="check-circle-solid" color="brand" />
							<Text size="300" weight="200">
								0161 273 6699
							</Text>
						</List.Item>
						<List.Item>
							<Icon name="check-circle-solid" color="brand" />
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
						<Icon name="warning" color="brand" />
						<Text size="200" weight="100">
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
							title="Which service do you require?"
						></Fieldset>
					</Form>
				</Segment.Container>
			</Segment.Root>
		</>
	);
}
