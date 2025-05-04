import type { TIcon } from '~/components/01-atoms/icon/icon.tsx';

import clsx from 'clsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './button.module.css';

export type TButtonVariant = 'primary' | 'secondary' | 'apply' | 'revoke';

export type TButton = {
	children: React.ReactNode;
	variant?: TButtonVariant;
	size?: 'small' | 'medium' | 'large';
};

type TButtonProps = TButton & React.ComponentProps<'button'>;

export const Button: React.FC<TButtonProps> = ({
	children,
	variant = 'primary',
	className,
	size = 'medium',
	...rest
}) => (
	<button
		type="button"
		className={clsx(styles.base, styles[variant], styles[size], className)}
		data-e2e-id="button"
		{...rest}
	>
		{children}
	</button>
);

const ButtonIcon: React.FC<TIcon> = ({ name, className, size = 20 }) => (
	<Icon name={name} size={size} className={clsx(styles.icon, className)} />
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
		className={clsx(styles.text, className)}
	>
		{children}
	</Text>
);

export const ButtonContent = {
	Icon: ButtonIcon,
	Text: ButtonText,
};
