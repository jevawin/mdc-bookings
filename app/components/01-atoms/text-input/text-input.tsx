import clsx from 'clsx';
import { Icon } from '../icon/icon.tsx';

import styles from './text-input.module.css';

type InputType = React.HTMLInputTypeAttribute;

export type TTextInput = {
	id: string;
	label: string;
	type?: Extract<InputType, 'email' | 'search' | 'text' | 'url'>;
	isRequired?: boolean;
	isInvalid?: boolean;
	validationMessage?: string;
	className?: string;
} & Pick<React.ComponentProps<'input'>, 'autoComplete' | 'name' | 'inputMode'>;

export const TextInput: React.FC<TTextInput> = ({
	id,
	label,
	name,
	type = 'text',
	autoComplete,
	inputMode,
	isRequired = true,
	isInvalid = false,
	validationMessage,
	className,
}) => {
	const labelText = !isRequired ? `${label} (optional)` : label;
	const validationMessageId = `${id.replace(' ', '-')}-message`;
	const showValidationMessage = isInvalid && validationMessage;

	return (
		<div className={clsx(styles.field, className)} data-e2e-id="text-input">
			<label className={styles.label} htmlFor={id}>
				{labelText}
			</label>

			<div className={styles.inputWrapper}>
				<input
					type={type}
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
			</div>

			{showValidationMessage ? (
				<span
					id={validationMessageId}
					className={styles.validationMessage}
				>
					<Icon name="warning" />

					<span className="srOnly" role="presentation">
						Error:{' '}
					</span>

					{validationMessage}
				</span>
			) : null}
		</div>
	);
};
