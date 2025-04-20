import type { TIcon } from '~/components/01-atoms/icon/icon.tsx';

import clsx from 'clsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './button.module.css';

export type TButtonVariant = 'primary' | 'apply' | 'revoke';

export type TButton = {
	children: React.ReactNode;
	type?: 'button' | 'reset' | 'submit';
	variant?: TButtonVariant;
};

export const Button: React.FC<TButton> = ({
	children,
	type = 'button',
	variant = 'primary',
}) => (
	<button
		type={type}
		className={clsx(styles.base, styles[variant])}
		data-e2e-id="button"
	>
		{children}
	</button>
);

const ButtonIcon: React.FC<TIcon> = ({ name, className }) => (
	<Icon name={name} size={20} className={clsx(styles.icon, className)} />
);

type TButtonText = {
	children: React.ReactNode;
	className?: string;
};

const ButtonText: React.FC<TButtonText> = ({ children, className }) => (
	<Text
		size="100"
		weight="300"
		role="presentation"
		className={clsx(styles.content, className)}
	>
		{children}
	</Text>
);

export const ButtonContent = {
	Icon: ButtonIcon,
	Text: ButtonText,
};
