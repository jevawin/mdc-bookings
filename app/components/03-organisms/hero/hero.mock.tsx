import type { THero } from './hero.tsx';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { List } from '../list/list.tsx';

export const mockHeroData: THero = {
	id: 'hero',
	title: 'Interpreter booking',
	bodyText: (
		<>
			<Text tag="p" size="200" weight="200">
				All MDC interpreters are BSL level 6 qualified; adhere to the
				NRCPD code of conduct; are DBS checked; and, have professional
				indemnity insurance. Specialists are further qualified in their
				specialisms.
			</Text>

			<Text tag="p" size="200" weight="200">
				If you'd like to discuss your booking, please contact our
				bookings officer:
			</Text>

			<List.Root>
				<List.Item>
					<Icon name="check-circle" size={24} color="brand" />

					<Text tag="p" size="200" weight="200">
						0161 273 6699
					</Text>
				</List.Item>

				<List.Item>
					<Icon name="check-circle" size={24} color="brand" />
					<Text tag="p" size="200" weight="200" color="foreground">
						<a href="mailto:bookings@manchesterdeafcentre.com">
							bookings@manchesterdeafcentre.com
						</a>
					</Text>
				</List.Item>
			</List.Root>
		</>
	),
	callout: {
		color: 'brand',
		children: (
			<>
				<Icon name="user-circle-star" color="brand" size={30} />
				<Text size="100" weight="200" role="presentation">
					This indicates personal data that we will share with your
					interpreter/s.
				</Text>
			</>
		),
	},
};
