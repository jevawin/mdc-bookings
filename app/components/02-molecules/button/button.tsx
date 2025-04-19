import styles from './button.module.css';
import clsx from 'clsx';

export type TButton = {
	content: string;
	variant?: 'apply' | 'revoke';
};

export const Button: React.FC<TButton> = ({ content, variant = 'apply' }) => {
	return (
		<button
			type="button"
			className={clsx(styles.base, styles[variant])}
			data-e2e-id="button"
			
		>
			{content}
		</button>
	)
}
