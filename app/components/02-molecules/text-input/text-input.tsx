import { useState } from 'react';
import { clsx } from 'clsx';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './text-input.module.css';

type InputType = React.HTMLInputTypeAttribute;

export type TTextInput = {
	className?: string;
	description?: string;
	id: string;
	isInvalid?: boolean;
	isRequired?: boolean;
	label: string;
	ref?: React.Ref<HTMLDivElement>;
	type?: Extract<InputType, 'email' | 'password' | 'search' | 'text' | 'url'>;
	showRequired?: boolean;
	validationMessage?: string;
} & Pick<
	React.ComponentProps<'input'>,
	'autoComplete' | 'name' | 'inputMode' | 'hidden'
>;

export const TextInput: React.FC<TTextInput> = ({
	autoComplete,
	className,
	description,
	hidden,
	id,
	inputMode,
	isInvalid = false,
	isRequired = true,
	label,
	name,
	ref,
	showRequired = false,
	type = 'text',
	validationMessage,
}) => {
	const [showPassword, setshowPassword] = useState(false);

	const isPassword = type === 'password';
	const validationMessageId = `${id.replace(' ', '-')}-message`;
	const showValidationMessage = isInvalid && validationMessage;

	const togglePasswordReveal = (): void => {
		setshowPassword(!showPassword);
	};

	const reqOpt = isRequired ? '(Required)' : '(Optional)';

	return (
		<div
			className={clsx(styles.field, className)}
			hidden={hidden}
			ref={ref}
			data-e2e-id="text-input"
		>
			<label className={styles.label} htmlFor={id}>
				<Text size="100" weight="200" role="presentation">
					{label}{' '}
					{showRequired ? (
						<Text weight="200" color="brand">
							{reqOpt}
						</Text>
					) : null}
				</Text>
			</label>

			{description !== null ? <Text tag="p">{description}</Text> : null}

			<div className={styles.inputWrapper}>
				<input
					type={isPassword && showPassword ? 'text' : type}
					id={id}
					name={name ?? id}
					autoComplete={autoComplete}
					inputMode={inputMode}
					aria-required={isRequired ? 'true' : undefined}
					aria-invalid={isInvalid ? 'true' : undefined}
					aria-describedby={
						showValidationMessage ? validationMessageId : undefined
					}
					className={styles.input}
				/>

				{isPassword ? (
					<button
						type="button"
						aria-label={
							showPassword ? 'Hide password' : 'Show password'
						}
						className={styles.showPassword}
						onClick={togglePasswordReveal}
					>
						<Icon
							name={showPassword ? 'eye-closed' : 'eye-open'}
							size={22}
						/>
					</button>
				) : null}
			</div>

			{showValidationMessage ? (
				<Text
					size="100"
					weight="100"
					id={validationMessageId}
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
