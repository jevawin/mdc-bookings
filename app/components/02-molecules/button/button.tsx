import type { TIcon } from '~/components/01-atoms/icon/icon';

import clsx from 'clsx';
import { Icon } from '~/components/01-atoms/icon/icon';

import styles from './button.module.css';

export type TButton = {
	children: React.ReactNode;
	variant?: 'apply' | 'revoke';
};

export const Button: React.FC<TButton> = ({ children, variant = 'apply' }) => {
	return (
		<button
			type="button"
			className={clsx(styles.base, styles[variant])}
			data-e2e-id="button"
		>
			{children}
		</button>
	);
};

const CtaIcon: React.FC<TIcon> = ({ name, className }) => (
	<Icon name={name} size={20} className={clsx(styles.icon, className)} />
);

type TCtaText = {
	children: React.ReactNode;
	className?: string;
};

const CtaText: React.FC<TCtaText> = ({ children, className }) => (
	<span role="presentation" className={clsx(styles.content, className)}>
		{children}
	</span>
);

export const CtaContent = {
	Icon: CtaIcon,
	Text: CtaText,
};
