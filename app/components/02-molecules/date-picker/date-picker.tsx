import { useRef } from 'react';
import { clsx } from 'clsx';

import { Icon } from '../../01-atoms/icon/icon.tsx';
import { Text } from '../../01-atoms/text/text.tsx';

import styles from './date-picker.module.css';

export type TDatePicker = {
	id: string;
	label: string;
	name?: string;
	hint?: string;
	minDate?: string;
	isInvalid?: boolean;
	isRequired?: boolean;
	validationMessage?: string;
	className?: string;
};

export const DatePicker: React.FC<TDatePicker> = ({
	id,
	minDate,
	label,
	name,
	hint,
	isInvalid = false,
	isRequired = false,
	validationMessage,
	className,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const reqOpt = isRequired ? '(Required)' : '(Optional)';
	const showInvalid = isInvalid && validationMessage;
	const hintId = hint ? `${id}-hint` : null;
	const invalidId = showInvalid ? `${id}-error` : null;

	const describedByIds = [hintId, invalidId].filter(Boolean).join(' ');
	const isEmptyDescribedByIds = describedByIds === '';

	const handleFocus = (): void => {
		inputRef.current?.showPicker?.();
	};

	return (
		<div
			className={clsx(styles.field, className)}
			data-e2e-id="date-picker"
		>
			<label htmlFor={id}>
				<Text className={styles.label} weight="200" role="presentation">
					{label}{' '}
					<Text weight="200" color="brand" role="presentation">
						{reqOpt}
					</Text>
				</Text>
			</label>

			{hint ? (
				<Text tag="p" className={styles.hint}>
					{hint}
				</Text>
			) : null}

			{showInvalid ? (
				<Text
					size="100"
					weight="300"
					id={invalidId ?? undefined}
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

			<input
				id={id}
				type="datetime-local"
				min={minDate}
				name={name}
				ref={inputRef}
				onFocus={handleFocus}
				aria-required={isRequired || undefined}
				aria-invalid={isInvalid || undefined}
				aria-describedby={
					!isEmptyDescribedByIds ? describedByIds : undefined
				}
				className={styles.input}
			/>
		</div>
	);
};
