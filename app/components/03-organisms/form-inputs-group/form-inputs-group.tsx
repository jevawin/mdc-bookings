import type { TRadio } from '~/components/02-molecules/radio/radio.tsx';
import type { TSelect } from '~/components/02-molecules/select/select.tsx';
import type { TTextInput } from '~/components/02-molecules/text-input/text-input.tsx';

import { clsx } from 'clsx';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import { Callout } from '~/components/02-molecules/callout/callout.tsx';
import { Radio } from '~/components/02-molecules/radio/radio.tsx';
import { Select } from '~/components/02-molecules/select/select.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';

import styles from './form-inputs-group.module.css';

type TFormInputsGroupShared = {
	id: string;
	title?: string;
	hint?: string;
	isDataShared?: boolean;
	isInvalid?: boolean;
	isRequired?: boolean;
	validationMessage?: string;
};

type TInputProps = {
	type: 'input';
	items: TTextInput[];
} & TFormInputsGroupShared;

type TSelectProps = {
	type: 'select';
	items: TSelect[];
} & TFormInputsGroupShared;

type TRadioProps = {
	type: 'radio';
	items: TRadio[];
} & TFormInputsGroupShared;

export type TFormInputsGroup = TInputProps | TSelectProps | TRadioProps;

export const FormInputsGroup: React.FC<TFormInputsGroup> = ({
	id,
	type,
	title,
	hint,
	items,
	isDataShared = false,
	isInvalid = false,
	isRequired = true,
	validationMessage,
}) => {
	const isRadioGroup = type === 'radio';
	const isInputGroup = type === 'input';
	const isSelectGroup = type === 'select';
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
		<fieldset
			id={id}
			className={styles.fieldset}
			data-e2e-id="checkbox-radio-group"
			aria-describedby={
				!isEmptyDescribedByIds ? describedByIds : undefined
			}
		>
			{title ? (
				<Text tag="legend" size="150" weight="200">
					{title}{' '}
					<Text
						size="150"
						weight="200"
						color="brand"
						role="presentation"
					>
						{reqOpt}
					</Text>
				</Text>
			) : null}

			{hint ? (
				<Text tag="p" id={hintId ?? undefined} role="presentation">
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
					tag="p"
					weight="300"
					id={invalidId ?? undefined}
					className={styles.validationMessage}
				>
					<Icon name="warning" />

					<span className="srOnly" role="presentation">
						Error:{' '}
					</span>
					{validationMessage}
				</Text>
			) : null}

			<div
				className={clsx(
					styles.fields,
					isInputGroup ? styles.inputFields : undefined,
					isSelectGroup ? styles.selectFields : undefined,
					isRadioGroup ? styles.radioFields : undefined,
				)}
			>
				{type === 'radio'
					? items.map((item) => <Radio key={item.id} {...item} />)
					: null}

				{type === 'input'
					? items.map((item) => <TextInput key={item.id} {...item} />)
					: null}

				{type === 'select'
					? items.map((item) => <Select key={item.id} {...item} />)
					: null}
			</div>
		</fieldset>
	);
};
