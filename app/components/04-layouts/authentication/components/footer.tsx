import type { TTextLink } from '~/components/01-atoms/text-link/text-link.tsx';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';

import styles from '../authentication.module.css';

type TAuthenticationFooter = {
	title: string;
	cta: Pick<TTextLink, 'to' | 'linkText'>;
};

export const AuthenticationFooter: React.FC<TAuthenticationFooter> = ({
	title,
	cta,
}) => (
	<footer className={styles.footer}>
		<Text tag="h2" size="100">
			{title}
		</Text>
		<TextLink to={cta.to} linkText={cta.linkText} />
	</footer>
);
