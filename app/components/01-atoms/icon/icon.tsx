import { clsx } from 'clsx';
import styles from './icon.module.css';

export type TIconName =
	| 'apple'
	| 'bell'
	| 'blind-person'
	| 'bsl-hands'
	| 'building'
	| 'calendar-down'
	| 'calendar-plus'
	| 'calendar-tick'
	| 'certificate'
	| 'check-circle'
	| 'cross'
	| 'circle-cross'
	| 'down-arrow'
	| 'email'
	| 'eye-closed'
	| 'eye-open'
	| 'google'
	| 'hearing-loop'
	| 'lips'
	| 'ms-office'
	| 'outlook'
	| 'pencil'
	| 'refresh'
	| 'question-circle'
	| 'speech-bubble'
	| 'user'
	| 'user-circle-star'
	| 'warning'
	| 'wave';

export type TIcon = {
	name: TIconName;
	size?: number | string;
	title?: string;
	className?: string;
	color?:
		| 'background'
		| 'brand'
		| 'neutral'
		| 'inactive'
		| 'negative'
		| 'positive';
};

/** Set of icons to be used sitewide */
export const Icon: React.FC<TIcon> = ({
	title,
	name,
	className,
	size = 24,
	color,
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden={!title ? 'true' : undefined}
		focusable="false"
		pointerEvents="none"
		width={size}
		height={size}
		className={clsx(styles.base, color && styles[color], className)}
	>
		{title ? <title>{title}</title> : null}

		<use xlinkHref={`/assets/icons/icons-sprite.svg#${name}`}></use>
	</svg>
);
