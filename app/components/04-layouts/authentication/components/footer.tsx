import type { TTextLink } from '~/components/01-atoms/text-link/text-link.tsx';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';

import styles from '../authentication.module.css';

type TAuthenticationFooterItem = {
	title: string;
	cta: Pick<TTextLink, 'to' | 'linkText'>;
};

type TAuthenticationFooter = {
	items: TAuthenticationFooterItem[];
};

export const AuthenticationFooter: React.FC<TAuthenticationFooter> = ({
	items,
}) => (
	<footer className={styles.footer}>
		{items.map((item) => (
			<div key={item.title} className={styles.item}>
				<Text tag="h2" size="150" weight="200">
					{item.title}
				</Text>

				<TextLink to={item.cta.to} linkText={item.cta.linkText} />
			</div>
		))}
	</footer>
);
