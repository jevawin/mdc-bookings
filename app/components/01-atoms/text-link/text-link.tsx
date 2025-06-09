import type { LinkProps } from 'react-router';
import type { TTextSizes, TTextWeights } from '../text/text.tsx';

import { Link } from 'react-router';
import { clsx } from 'clsx';
import { Text } from '../text/text.tsx';

import styles from './text-link.module.css';

export type TTextLink = {
	linkText: string;
	size?: TTextSizes;
	weight?: TTextWeights;
} & LinkProps;

export const TextLink: React.FC<TTextLink> = ({
	to,
	linkText,
	size = '100',
	weight = '200',
	className,
}) => {
	return (
		<Link
			className={clsx(styles.link, className)}
			data-e2e-id="text-link"
			to={to}
		>
			<Text size={size} weight={weight} role="presentation">
				{linkText}
			</Text>
		</Link>
	);
};
