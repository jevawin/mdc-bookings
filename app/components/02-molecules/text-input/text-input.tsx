import { useState } from 'react';
import { clsx } from 'clsx';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './text-input.module.css';
import { Callout } from '../callout/callout.tsx';

type InputType = React.HTMLInputTypeAttribute;

export type TTextInput = {
	id: string;
	label: string;
	type?: Extract<InputType, 'email' | 'password' | 'search' | 'text' | 'url'>;
	hint?: string;
	isDataShared?: boolean;
	isInvalid?: boolean;
	isRequired?: boolean;
	showRequired?: boolean;
	validationMessage?: string;
	className?: string;
	ref?: React.Ref<HTMLDivElement>;
} & Pick<
	React.ComponentProps<'input'>,
	'autoComplete' | 'name' | 'inputMode' | 'hidden'
>;

export const TextInput: React.FC<TTextInput> = ({
	id,
	label,
	type = 'text',
	name,
	autoComplete,
	hint,
	hidden,
	inputMode,
	isDataShared = false,
	isInvalid = false,
	isRequired = true,
	showRequired = false,
	validationMessage,
	className,
	ref,
}) => {
	const [showPassword, setshowPassword] = useState(false);

	const isPassword = type === 'password';
	const reqOpt = isRequired ? '(Required)' : '(Optional)';
	const showInvalid = isInvalid && validationMessage;
	const dataSharedId = isDataShared ? `${id}-data-shared` : null;
	const hintId = hint ? `${id}-hint` : null;
	const invalidId = showInvalid ? `${id}-error` : null;

	const describedByIds = [hintId, dataSharedId, invalidId]
		.filter(Boolean)
		.join(' ');
	const isEmptyDescribedByIds = describedByIds === '';

	const togglePasswordReveal = (): void => {
		setshowPassword(!showPassword);
	};

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
						<Text weight="200" color="brand" role="presentation">
							{reqOpt}
						</Text>
					) : null}
				</Text>
			</label>

			{hint ? (
				<Text tag="p" id={hintId ?? undefined}>
					{hint}
				</Text>
			) : null}

			{isDataShared ? (
				<Callout id={dataSharedId ?? undefined} color="brand">
					<Icon name="user-circle-star" color="brand" size={30} />

					<Text size="100" weight="200" role="presentation">
						We'll share this with your interpreter/s.
					</Text>
				</Callout>
			) : null}

			{showInvalid ? (
				<Text
					size="100"
					weight="300"
					id={invalidId ?? undefined}
					className={styles.validationMessage}
				>
					<Icon name="warning" size={22} />

					<span className="srOnly" role="presentation">
						Error:{' '}
					</span>

					{validationMessage}
				</Text>
			) : null}

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
						!isEmptyDescribedByIds ? describedByIds : undefined
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
		</div>
	);
};
