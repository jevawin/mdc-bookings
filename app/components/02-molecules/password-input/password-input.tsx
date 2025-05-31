import { clsx } from 'clsx';
import { useState } from 'react';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './password-input.module.css';

type TInput = React.ComponentProps<'input'>;
type TInputProps = 'className' | 'name' | 'hidden';
type TInputAttributes = Pick<TInput, TInputProps>;

export type TPasswordInput = {
	id: string;
	label: string;
	hint?: string;
	isRequired?: boolean;
	isInvalid?: boolean;
	validationMessage?: string;
	ref?: React.Ref<HTMLDivElement>;
};

type TPasswordInputProps = TPasswordInput & TInputAttributes;

export const PasswordInput: React.FC<TPasswordInputProps> = ({
	id,
	label,
	hint,
	name,
	isRequired = true,
	isInvalid = false,
	validationMessage,
	hidden,
	ref,
	className,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const hintId = `${id.replace(' ', '-')}-hint`;
	const errorMessageId = `${id.replace(' ', '-')}-message`;

	const labelText = !isRequired ? `${label} (optional)` : label;
	const showErrorMessage = isInvalid && validationMessage;

	const describedBy =
		[showErrorMessage && errorMessageId, hint && hintId]
			.filter(Boolean)
			.join(' ') || undefined;

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div
			className={clsx(styles.field, className)}
			hidden={hidden}
			ref={ref}
			data-e2e-id="password-input"
		>
			<div className={styles.labelWrapper}>
				<label className={styles.label} htmlFor={id}>
					<Text size="100" weight="200" role="presentation">
						{labelText}
					</Text>
				</label>

				{hint ? (
					<Text
						id={hintId}
						size="0"
						weight="100"
						className={styles.hint}
					>
						{hint}
					</Text>
				) : null}
			</div>

			<div className={styles.inputWrapper}>
				<input
					type={showPassword ? 'text' : 'password'}
					id={id}
					name={name ?? id}
					autoCapitalize="off"
					autoComplete="new-password"
					aria-required={isRequired ? 'true' : undefined}
					aria-invalid={isInvalid ? 'true' : undefined}
					aria-describedby={describedBy}
					spellCheck="false"
					className={styles.input}
				/>

				<button
					type="button"
					onClick={togglePasswordVisibility}
					className={styles.button}
				>
					<Icon
						name={showPassword ? 'eye-closed' : 'eye-open'}
						size={22}
					/>

					<span className="srOnly" role="presentation">
						{showPassword ? 'Hide password' : 'Show password'}
					</span>
				</button>
			</div>

			{showErrorMessage ? (
				<Text
					size="100"
					id={errorMessageId}
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
