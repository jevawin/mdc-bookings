import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';

import styles from '../registration-template.module.css';

export type TRegistrationVerification = {
	isSuccess: boolean;
};

export const RegistrationVerification: React.FC<TRegistrationVerification> = ({
	isSuccess,
}) => {
	const successText = isSuccess
		? 'You have successfully verified your email. You can now log in.'
		: 'There was an error trying to verify your email.';

	return (
		<>
			<Icon
				name={isSuccess ? 'check-circle' : 'warning'}
				size={50}
				className={styles.icon}
			/>

			<Text tag="p" size="100" weight="100">
				{successText}
			</Text>

			{isSuccess ? <TextLink to="/log-in" linkText="Log in" /> : null}
		</>
	);
};
