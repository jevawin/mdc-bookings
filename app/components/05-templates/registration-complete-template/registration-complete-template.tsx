import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './registration-complete-template.module.css';

export type TRegistrationCompleteTemplate = React.PropsWithChildren;

export const RegistrationCompleteTemplate: React.FC<
	TRegistrationCompleteTemplate
> = () => (
	<>
		<header className={styles.header}>
			<Text tag="h1" size="400" weight="300">
				Thank you for your registration
			</Text>
		</header>

		<main className={styles.main}>
			<Icon name="email-in" size={50} className={styles.icon} />

			<Text tag="h2" size="200" weight="300">
				Verification required
			</Text>

			<Text tag="p" size="100" weight="100">
				Account verification required. Please check your email to find
				your unique verification link.
			</Text>
		</main>
	</>
);
