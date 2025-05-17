import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from '../registration-template.module.css';

export type TRegistrationComplete = React.PropsWithChildren;

export const RegistrationComplete: React.FC = () => (
	<main id="main" className={styles.main}>
		<Icon name="email-in" size={50} className={styles.icon} />

		<Text tag="h2" size="200" weight="300">
			Verification required
		</Text>

		<Text tag="p" size="100" weight="100">
			Account verification required. Please check your email to find your
			unique verification link.
		</Text>
	</main>
);
