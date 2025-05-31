import { Text, type TTextSizes } from '~/components/01-atoms/text/text';
import styles from './callout.module.css';
import clsx from 'clsx';

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
};

export const Callout: React.FC<TCallout> = ({
	size = '200',
	children,
	color,
	...rest
}) => {
	return (
		<Text
			tag="p"
			size={size}
			role="note"
			className={clsx(styles.base, color && styles[color])}
			data-e2e-id="callout"
			{...rest}
		>
			{children}
		</Text>
	);
};
