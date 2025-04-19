import type { TIcon } from '~/components/01-atoms/icon/icon';

import clsx from 'clsx';
import { Icon } from '~/components/01-atoms/icon/icon';
import { Text } from '~/components/01-atoms/text/text.tsx';

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
