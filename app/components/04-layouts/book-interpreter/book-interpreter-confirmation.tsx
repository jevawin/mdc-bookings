import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import { Header } from '~/components/02-molecules/header/header.tsx';

import { Hero } from '~/components/03-organisms/hero/hero.tsx';
import { List } from '~/components/03-organisms/list/list.tsx';

export type TBookInterpreter = React.PropsWithChildren;

export default function BookInterpreterLayout(): React.ReactNode {
	return (
		<>
			<Header showNav={false} />
			<main id="main">
				<Hero.Root id="interpreter-booking-hero">
					<Hero.Content>
						<Hero.BodyText>
							<Text
								tag="h2"
								color="brand"
								weight="300"
								size="500"
							>
								<Icon name="calendar-tick" size={34} /> Booking
								received
							</Text>

							<Text tag="p" size="300">
								You should{' '}
								<Text color="brand" weight="300" size="300">
									receive an email
								</Text>{' '}
								confirming your booking details within 5
								minutes. If you have not received your email
								after 5 minutes, please contact our bookings
								officer:
							</Text>

							<List.Root>
								<List.Item>
									<Icon
										name="check-circle"
										size={24}
										color="brand"
									/>

									<Text tag="p" size="200" weight="200">
										0161 273 6699
									</Text>
								</List.Item>

								<List.Item>
									<Icon
										name="check-circle"
										size={24}
										color="brand"
									/>
									<Text
										tag="p"
										size="200"
										weight="200"
										color="foreground"
									>
										<TextLink
											to="mailto:bookings@manchesterdeafcentre.com"
											linkText="bookings@manchesterdeafcentre.com"
											size="200"
										/>
									</Text>
								</List.Item>
							</List.Root>

							<Text tag="h2" size="500" weight="300">
								What happens next?
							</Text>

							<List.Root tag="ol">
								<List.Item size="200">
									<Text size="200">
										We'll check the details of your booking.
									</Text>
								</List.Item>
								<List.Item size="200">
									<Text size="200">
										If everything looks good, we'll
										calculate a cost.
									</Text>
								</List.Item>
								<List.Item size="200">
									<Text size="200">
										We'll check that cost with you.
									</Text>
								</List.Item>
								<List.Item size="200">
									<Text size="200">
										If you're happy, we'll publish to our
										approved interpreters.
									</Text>
								</List.Item>
								<List.Item size="200">
									<Text size="200">
										Once we've booked an interpreter, we'll
										email you to confirm.
									</Text>
								</List.Item>
							</List.Root>
						</Hero.BodyText>
					</Hero.Content>
				</Hero.Root>
			</main>
		</>
	);
}
