import clsx from 'clsx';
import { Text } from '../text/text.tsx';
import styles from './date-picker.module.css';
import { Icon } from '../icon/icon.tsx';

export type TDatePicker = {
	minDate?: string;
	label: string;
	name: string;
	type?: string;
	isRequired?: boolean;
	isInvalid?: boolean;
	validationMessage: string;
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
	...rest
}) => {
	const showValidationMessage = isInvalid && validationMessage;
	const validationMessageID = `${name.replace(' ', '-')}-message`;

	return (
		<div className={clsx(styles.base, className)} data-e2e-id="date-picker">
			<label>
				<Text className={styles.label} tag="p" weight="200">
					{label}
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
				</Text>
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
				/>
			</label>
			{showValidationMessage ? (
				<Text
					tag="p"
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
