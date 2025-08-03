import { Outlet } from 'react-router';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import { Header } from '~/components/02-molecules/header/header.tsx';

import { Hero } from '~/components/03-organisms/hero/hero.tsx';
import { List } from '~/components/03-organisms/list/list.tsx';

import { Segment } from '../segment/segment.tsx';

import styles from './book-interpreter.module.css';

export type TBookInterpreter = React.PropsWithChildren;

export default function BookInterpreterLayout(): React.ReactNode {
	return (
		<>
			<Header showNav={false} />

			<main id="main">
				<Hero.Root
					id="interpreter-booking-hero"
					title="Interpreter booking"
				>
					<Hero.Content>
						<Hero.BodyText>
							<Text tag="p" size="200" weight="200">
								All MDC interpreters are BSL level 6 qualified;
								adhere to the NRCPD code of conduct; are DBS
								checked; and, have professional indemnity
								insurance. Specialists are further qualified in
								their specialisms.
							</Text>

							<Text tag="p" size="200" weight="200">
								If you'd like to discuss your booking, please
								contact our bookings officer:
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
						</Hero.BodyText>

						<Hero.Callout color="brand">
							<Icon
								name="user-circle-star"
								color="brand"
								size={30}
							/>
							<Text size="100" weight="200" role="presentation">
								This indicates personal data that we will share
								with your interpreter/s.
							</Text>
						</Hero.Callout>
					</Hero.Content>
				</Hero.Root>

				<Outlet />

				<Segment.Root id="terms-conditions" className={styles.terms}>
					<Segment.Container>
						<div className={styles.content}>
							<Text
								tag="h2"
								color="brand"
								size="300"
								weight="300"
								id="terms-conditions-title"
							>
								Manchester Deaf Centre interpreter booking terms
								and conditions
							</Text>

							<List.Root>
								<List.Item>
									<Text role="presentation">
										This contract is with Manchester Deaf
										Centre Ltd. If the Customer is
										reclaiming the cost of the interpreter
										from another organisation (for example
										Access to Work or a student's local
										authority) although Manchester Deaf
										Centre will support the Customer to
										reclaim the cost, the Customer is
										responsible for paying Manchester Deaf
										Centre in full within 30 days.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
										The Interpreter is bound by professional
										confidentiality and is required to
										adhere to the NRCPD Code of Conduct.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
										All Interpreters placed by Manchester
										Deaf Centre Ltd have Professional
										Indemnity Insurance and a current DBS.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
										The Interpreter will interpret to the
										best of their ability, knowledge and
										belief. However, no guarantee can be
										given as to the absolute accuracy of any
										interpretation. Manchester Deaf Centre
										Ltd will only place interpreters with
										the relevant skills and experience to
										competently undertake the work.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
										We may advise that more than 1 BSL
										interpreter needs to be booked for
										certain assignments for co-working
										support and quality assurance. This will
										be at our discretion and Manchester Deaf
										Centre Ltd will always discuss this with
										the booker before booking additional
										interpreters.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
										Manchester Deaf Centre will only book
										NRCPD registered Trainee Interpreters
										with relevant skills and experience to
										undertake assignments.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
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
									<Text role="presentation">
										Assignments outside core hours of Monday
										to Friday 9am - 6pm will be charged at
										normal fees plus 50%.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
										The customer agrees to remittance terms
										and conditions i.e. to pay Manchester
										Deaf Centre Ltd invoices in full within
										30 days of receipts.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
										Once a booking has been confirmed,
										either verbally or in writing, it is
										binding. Should it become necessary to
										cancel the booking, the following
										charges will be made:
									</Text>
								</List.Item>
							</List.Root>

							<Text
								tag="h3"
								id="cancellation-charges"
								color="brand"
								size="200"
								weight="300"
							>
								Cancellation charges
							</Text>

							<List.Root>
								<List.Item>
									<Text role="presentation">
										15 days' notice or more before the
										booking date:{' '}
										<Text weight="300">
											no cancellation fee
										</Text>
										.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
										8-14 days' notice before the booking
										date:{' '}
										<Text weight="300">
											50% cancellation fee
										</Text>
										.
									</Text>
								</List.Item>

								<List.Item>
									<Text role="presentation">
										1-7 days' notice before the booking
										date:{' '}
										<Text weight="300">
											full charge applies
										</Text>
										.
									</Text>
								</List.Item>
							</List.Root>
						</div>
					</Segment.Container>
				</Segment.Root>
			</main>
		</>
	);
}
