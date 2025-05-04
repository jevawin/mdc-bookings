import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';

import styles from './registration-verification-template.module.css';

export type TRegistrationVerificationTemplate = {
	success: boolean;
};

export const RegistrationVerificationTemplate: React.FC<
	TRegistrationVerificationTemplate
> = ({ success }) => {
	const successTitle = success ? 'succesful' : 'unsuccesful';
	const successText = success
		? 'You have successfully verified your email. You can now log in.'
		: 'There was an error trying to verify your email.';

	return (
		<>
			<header className={styles.header}>
				<Text tag="h1" size="400" weight="300">
					{`Email verification ${successTitle}`}
				</Text>
			</header>

			<main className={styles.main}>
				<Icon
					name={success ? 'check-circle' : 'warning'}
					size={50}
					className={styles.icon}
				/>

				<Text tag="p" size="100" weight="100">
					{successText}
				</Text>

				{success ? <TextLink to="/log-in" linkText="Log in" /> : null}
			</main>
		</>
	);
};
