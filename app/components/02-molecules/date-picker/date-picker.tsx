import { clsx } from 'clsx';
import { Text } from '../../01-atoms/text/text.tsx';
import styles from './date-picker.module.css';
import { Icon } from '../../01-atoms/icon/icon.tsx';
import { useRef } from 'react';

export type TDatePicker = {
	minDate?: string;
	label: string;
	name: string;
	type?: string;
	isRequired?: boolean;
	isInvalid?: boolean;
	validationMessage?: string;
	className?: string;
	description?: string;
};

export const DatePicker: React.FC<TDatePicker> = ({
	minDate,
	label,
	name,
	type = 'datetime-local',
	isRequired = false,
	isInvalid = false,
	validationMessage,
	className,
	description,
}) => {
	const showValidationMessage = isInvalid && validationMessage;
	const validationMessageID = `${name.replace(' ', '-')}-message`;
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFocus = (): void => {
		inputRef.current?.showPicker?.();
	};

	return (
		<div className={clsx(styles.base, className)} data-e2e-id="date-picker">
			<label>
				<Text className={styles.label} weight="200">
					{label}
				</Text>

				{isRequired ? (
					<Text weight="200" color="brand">
						&nbsp;(Required)
					</Text>
				) : null}
				{description ? (
					<Text tag="p" className={styles.description}>
						{description}
					</Text>
				) : null}
				<input
					className={styles.datePicker}
					type={type}
					min={minDate}
					name={name}
					aria-required={isRequired || undefined}
					aria-invalid={isInvalid || undefined}
					aria-describedby={
						showValidationMessage ? validationMessageID : undefined
					}
					ref={inputRef}
					onFocus={handleFocus}
				/>
			</label>
			{showValidationMessage ? (
				<Text
					size="100"
					weight="100"
					id={validationMessageID}
					className={styles.validationMessage}
					color="negative"
				>
					<Icon name="warning" size={22} color="negative" />

					<span className="srOnly" role="presentation">
						Error:{' '}
					</span>

					{validationMessage}
				</Text>
			) : null}
		</div>
	);
};
