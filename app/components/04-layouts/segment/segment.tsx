import type {
	TContainerElements,
	TContainerSize,
} from '../container/container.tsx';

import { clsx } from 'clsx';
import { Container } from '../container/container.tsx';

import styles from './segment.module.css';

export type TSegment = {
	id: string;
	containerSize?: TContainerSize;
	children?: React.ReactNode;
};

type TSegmentRootAttributes = React.HtmlHTMLAttributes<Element>;
type TSegmentRootProps = TSegment & TSegmentRootAttributes;

const SegmentRoot: React.FC<TSegmentRootProps> = ({
	id,
	className,
	children,
	...rest
}) => {
	const titleId = `${id}-title`;

	return (
		<section
			className={clsx(styles.segment, className)}
			id={id}
			aria-labelledby={titleId}
			{...rest}
		>
			{children}
		</section>
	);
};

type TSegmentContainer = {
	tag?: TContainerElements;
	containerSize?: 'min' | 'max';
	children?: React.ReactNode;
};
type TSegmentContainerAttributes = React.HtmlHTMLAttributes<Element>;
type TSegmentContainerProps = TSegmentContainer & TSegmentContainerAttributes;

const SegmentContainer: React.FC<TSegmentContainerProps> = ({
	tag,
	containerSize,
	className,
	children,
}) => (
	<Container
		tag={tag}
		containerSize={containerSize}
		className={clsx(styles.container, className)}
	>
		{children}
	</Container>
);

export const Segment = {
	Root: SegmentRoot,
	Container: SegmentContainer,
};
