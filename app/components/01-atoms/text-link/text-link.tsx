import type { LinkProps } from 'react-router';

import { Link } from 'react-router';
import clsx from 'clsx';
import { Text } from '../text/text';

import styles from './text-link.module.css';

export type TTextLink = { linkText: string } & LinkProps;

export const TextLink: React.FC<TTextLink> = ({ to, linkText, className }) => {
	return (
		<Link className={styles.base} data-e2e-id="text-link" to={to}>
			<Text
				size="100"
				weight="200"
				role="presentation"
				className={clsx(styles.content, className)}
			>
				{linkText}
			</Text>
		</Link>
	);
};
