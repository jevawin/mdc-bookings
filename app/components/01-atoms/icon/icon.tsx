export type TIconName =
	| 'apple'
	| 'google'
	| 'ms-office'
	| 'outlook'
	| 'calendar-plus'
	| 'check-circle'
	| 'chevron-down'
	| 'clipboard-check'
	| 'cross'
	| 'email-in'
	| 'eye-closed'
	| 'eye-open'
	| 'pencil'
	| 'list'
	| 'refresh'
	| 'warning'
	| 'clock-rotate'
	| 'calendar-check'
	| 'user'
	| 'wave'
	| 'building'
	| 'bell';

export type TIcon = {
	name: TIconName;
	size?: number | string;
	title?: string;
	className?: string;
};

/** Set of icons to be used sitewide */
export const Icon: React.FC<TIcon> = ({
	title,
	name,
	className,
	size = 24,
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden={!title ? 'true' : undefined}
		focusable="false"
		pointerEvents="none"
		width={size}
		height={size}
		className={className}
	>
		{title ? <title>{title}</title> : null}

		<use xlinkHref={`/assets/icons/icons-sprite.svg#${name}`}></use>
	</svg>
);
