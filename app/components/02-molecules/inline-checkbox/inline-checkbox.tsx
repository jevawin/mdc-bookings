import clsx from 'clsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';

import styles from './inline-checkbox.module.css';

export type TInlineCheckbox = {
	id: string;
	label: string;
	value: string;
	name?: string;
	isInvalid?: boolean;
	isRequired?: boolean;
	validationMessage?: string;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export const InlineCheckbox: React.FC<TInlineCheckbox> = ({
	id,
	label,
	name,
	value,
	validationMessage,
	isInvalid = false,
	isRequired = false,
	className,
	onClick,
}) => {
	const validationMessageId = `${id.replace(' ', '-')}-message`;

	const handleInputClick = (
		e: React.MouseEvent<HTMLInputElement, MouseEvent>,
	): void => {
		if (onClick) {
			onClick(e);
		}
	};

	return (
		<div
			className={clsx(styles.field, className)}
			data-e2e-id="inline-checkbox"
		>
			<div className={styles.inputWrapper}>
				<input
					id={id}
					type="checkbox"
					name={name ?? id}
					value={value}
					aria-invalid={isInvalid ? 'true' : undefined}
					aria-required={isRequired ? 'true' : undefined}
					className={styles.input}
					aria-describedby={
						isInvalid ? validationMessageId : undefined
					}
					onClick={handleInputClick}
				/>

				<label htmlFor={id}>
					<Text size="100" weight="200" role="presentation">
						{label}
					</Text>
				</label>
			</div>

			{isInvalid && validationMessage ? (
				<Text
					id={validationMessageId}
					size="100"
					weight="100"
					className={styles.validationMessage}
				>
					<Icon name="warning" size={22} />

					<span className="srOnly" role="presentation">
						Error:{' '}
					</span>

					{validationMessage}
				</Text>
			) : null}
		</div>
	);
};
