import { clsx } from 'clsx';

import styles from './text.module.css';

export type TTextSizes =
	| '0'
	| '100'
	| '150'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800';

export type TTextColors =
	| 'background'
	| 'brand'
	| 'foreground'
	| 'neutral'
	| 'inactive'
	| 'negative'
	| 'positive';

export type TTextWeights = '100' | '200' | '300';

export type TText = {
	size?: TTextSizes;
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend' | 'p' | 'span';
	weight?: TTextWeights;
	color?: TTextColors;
} & Pick<React.HtmlHTMLAttributes<Element>, 'children' | 'className'>;

type TTextAttributes = Omit<
	React.HtmlHTMLAttributes<Element>,
	'children' | 'className'
>;

type TTextProps = TText & TTextAttributes;

/** Generic text component with built-in typography styles from the alias set of design tokens.
 *
 * Props such as `tier`, `size` and `weight` are made optional should there be components that require component specific typography styles.
 *
 * Component specific typography styles can be applied by passing a `className`.
 */
export const Text: React.FC<TTextProps> = ({
	color,
	tag: Tag = 'span',
	size = 100,
	weight = 100,
	className,
	children,
	...rest
}) => (
	<Tag
		className={clsx(
			styles.text,
			size ? styles[`size${size}`] : undefined,
			weight ? styles[`weight${weight}`] : undefined,
			color ? styles[`color${color}`] : undefined,
			className,
		)}
		{...rest}
	>
		{children}
	</Tag>
);
