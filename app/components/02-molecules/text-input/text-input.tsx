import clsx from 'clsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './text-input.module.css';

type InputType = React.HTMLInputTypeAttribute;

export type TTextInput = {
	id: string;
	label: string;
	type?: Extract<InputType, 'email' | 'password' | 'search' | 'text' | 'url'>;
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
				<Text size="200" weight="200" role="presentation">
					{labelText}
				</Text>
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
