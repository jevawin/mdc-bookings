import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from '../authentication.module.css';

type TAuthenticationHeader = {
	title: string;
};

export const AuthenticationHeader: React.FC<TAuthenticationHeader> = ({
	title,
}) => (
	<header className={styles.header}>
		<Text tag="h1" size="400" weight="300">
			{title}
		</Text>
	</header>
);
