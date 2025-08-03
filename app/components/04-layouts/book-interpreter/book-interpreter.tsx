import { Outlet } from 'react-router';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';

import { Header } from '~/components/02-molecules/header/header.tsx';

import { Hero } from '~/components/03-organisms/hero/hero.tsx';
import { List } from '~/components/03-organisms/list/list.tsx';

import { Container } from '../container/container.tsx';

import styles from './book-interpreter.module.css';

export type TBookInterpreter = React.PropsWithChildren;

export default function BookInterpreterLayout(): React.ReactNode {
	return (
		<>
			<Header />

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

				<Container>
					<div className={styles.content}>
						<Outlet />
					</div>
				</Container>
			</main>
		</>
	);
}
