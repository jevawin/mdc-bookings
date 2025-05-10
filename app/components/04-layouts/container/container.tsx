import { clsx } from 'clsx';

import styles from './container.module.css';

type TContainerAttributes = Omit<React.HtmlHTMLAttributes<Element>, 'id'>;

export type TContainerElements = keyof Pick<
	React.JSX.IntrinsicElements,
	'aside' | 'div' | 'footer' | 'header' | 'nav' | 'section'
>;

export type TContainerSize = 'min' | 'max';

export type TContainer = {
	id?: string;
	tag?: TContainerElements;
	containerSize?: TContainerSize;
	children?: React.ReactNode;
};

type TContainerProps = TContainer & TContainerAttributes;

export const Container: React.FC<TContainerProps> = ({
	id,
	tag: Tag = 'div',
	children,
	className,
	containerSize = 'max',
	...rest
}) => (
	<Tag
		id={id}
		className={clsx(
			styles.container,
			containerSize ? styles[`${containerSize}Container`] : undefined,
			className,
		)}
		{...rest}
	>
		{children}
	</Tag>
);
