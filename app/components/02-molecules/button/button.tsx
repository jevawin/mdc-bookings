import type { TIcon } from '~/components/01-atoms/icon/icon.tsx';

import clsx from 'clsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './button.module.css';

export type TButtonVariant = 'primary' | 'apply' | 'revoke';

export type TButton = {
	children: React.ReactNode;
	variant?: TButtonVariant;
};

type TButtonProps = TButton & React.ComponentProps<'button'>;

export const Button: React.FC<TButtonProps> = ({
	children,
	type = 'button',
	variant = 'primary',
	...rest
}) => (
	<button
		type={type}
		className={clsx(styles.base, styles[variant])}
		data-e2e-id="button"
		{...rest}
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
		className={clsx(styles.text, className)}
	>
		{children}
	</Text>
);

export const ButtonContent = {
	Icon: ButtonIcon,
	Text: ButtonText,
};
