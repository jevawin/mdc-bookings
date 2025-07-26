import type { TTextSizes } from '~/components/01-atoms/text/text.tsx';

import clsx from 'clsx';

import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './callout.module.css';

export type TCallout = {
	children?: React.ReactNode;
	color?:
		| 'background'
		| 'brand'
		| 'neutral'
		| 'inactive'
		| 'negative'
		| 'positive';
	size?: TTextSizes;
	className?: string;
};

export const Callout: React.FC<TCallout> = ({
	size = '200',
	children,
	color,
	className,
	...rest
}) => {
	return (
		<Text
			tag="p"
			size={size}
			role="note"
			className={clsx(className, styles.base, color && styles[color])}
			data-e2e-id="callout"
			{...rest}
		>
			{children}
		</Text>
	);
};
