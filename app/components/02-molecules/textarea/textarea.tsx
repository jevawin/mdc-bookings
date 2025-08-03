import { clsx } from 'clsx';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Callout } from '../callout/callout.tsx';

import styles from './textarea.module.css';

export type TTextarea = {
	id: string;
	label: string;
	hint?: string;
	name?: string;
	isDataShared?: boolean;
	isInvalid?: boolean;
	isRequired?: boolean;
	showRequired?: boolean;
	validationMessage?: string;
	className?: string;
};

export const Textarea: React.FC<TTextarea> = ({
	id,
	label,
	name,
	hint,
	isDataShared = false,
	isInvalid = false,
	isRequired = true,
	showRequired = false,
	validationMessage,
	className,
}) => {
	const reqOpt = isRequired ? '(Required)' : '(Optional)';
	const showInvalid = isInvalid && validationMessage;
	const dataSharedId = isDataShared ? `${id}-data-shared` : null;
	const hintId = hint ? `${id}-hint` : null;
	const invalidId = showInvalid ? `${id}-error` : null;

	const describedByIds = [hintId, dataSharedId, invalidId]
		.filter(Boolean)
		.join(' ');
	const isEmptyDescribedByIds = describedByIds === '';

	return (
		<div className={clsx(styles.field, className)} data-e2e-id="textarea">
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

			<textarea
				id={id}
				name={name ?? id}
				rows={8}
				aria-required={isRequired ? 'true' : undefined}
				aria-invalid={isInvalid ? 'true' : undefined}
				aria-describedby={
					!isEmptyDescribedByIds ? describedByIds : undefined
				}
				className={styles.textarea}
			/>
		</div>
	);
};
