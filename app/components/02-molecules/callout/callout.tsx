import type { TTextSizes } from '~/components/01-atoms/text/text.tsx';

import { clsx } from 'clsx';

import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './callout.module.css';

type TCalloutColor =
	| 'background'
	| 'brand'
	| 'neutral'
	| 'inactive'
	| 'negative'
	| 'positive';

export type TCallout = {
	id?: string;
	children?: React.ReactNode;
	color?: TCalloutColor;
	size?: TTextSizes;
	className?: string;
};

export const Callout: React.FC<TCallout> = ({
	id,
	size = '200',
	color,
	className,
	children,
}) => {
	return (
		<Text
			id={id}
			tag="p"
			size={size}
			role="note"
			className={clsx(className, styles.base, color && styles[color])}
			data-e2e-id="callout"
		>
			{children}
		</Text>
	);
};
