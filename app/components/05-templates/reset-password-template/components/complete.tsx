import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from '../reset-password-template.module.css';

export type TResetPasswordComplete = React.PropsWithChildren;

export const ResetPasswordComplete: React.FC = () => (
	<main id="main" className={styles.main}>
		<Icon name="email" size={50} className={styles.icon} />

		<Text tag="h2" size="200" weight="300">
			Check your email
		</Text>

		<Text tag="p" size="100" weight="100">
			Please check your email to find your unique password reset link.
		</Text>
	</main>
);
