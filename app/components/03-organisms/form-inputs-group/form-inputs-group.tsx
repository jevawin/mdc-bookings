import type { TCopyDetails } from '~/components/02-molecules/copy-details/copy-details.tsx';
import type { TRadio } from '~/components/02-molecules/radio/radio.tsx';
import type { TSelect } from '~/components/02-molecules/select/select.tsx';
import type { TTextInput } from '~/components/02-molecules/text-input/text-input.tsx';

import { clsx } from 'clsx';

import { CopyDetails } from '~/components/02-molecules/copy-details/copy-details.tsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import { Callout } from '~/components/02-molecules/callout/callout.tsx';
import { Radio } from '~/components/02-molecules/radio/radio.tsx';
import { Select } from '~/components/02-molecules/select/select.tsx';
import { TextInput } from '~/components/02-molecules/text-input/text-input.tsx';

import styles from './form-inputs-group.module.css';

export type TFormInputsGroup = TInputProps | TSelectProps | TRadioProps;

type Input = {
	type: 'input';
	items: TTextInput[];
};

type Select = {
	type: 'select';
	items: TSelect[];
};

type Radio = {
	type: 'radio';
	items: TRadio[];
};

type TInputProps = Input & TFormsInputsGroupContent;
type TSelectProps = Select & TFormsInputsGroupContent;
type TRadioProps = Radio & TFormsInputsGroupContent;

type TFormInputsGroupRoot = {
	id: string;
	hint?: string;
	isDataShared?: boolean;
	isInvalid?: boolean;
	validationMessage?: string;
	children?: React.ReactNode;
};

const FormInputsGroupRoot: React.FC<TFormInputsGroupRoot> = ({
	id,
	hint,
	isDataShared,
	isInvalid,
	validationMessage,
	children,
}) => {
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
			{children}
		</fieldset>
	);
};

type TFormsInputsGroupContent = {
	id: string;
	title?: string;
	hint?: string;
	isDataShared?: boolean;
	isInvalid?: boolean;
	isRequired?: boolean;
	validationMessage?: string;
};

const FormsInputsGroupContent: React.FC<TFormsInputsGroupContent> = ({
	id,
	title,
	hint,
	isDataShared,
	validationMessage,
	isInvalid,
	isRequired,
}) => {
	const reqOpt = isRequired ? '(Required)' : '(Optional)';
	const showInvalid = isInvalid && validationMessage;

	const dataSharedId = isDataShared ? `${id}-data-shared` : null;
	const hintId = hint ? `${id}-hint` : null;
	const invalidId = showInvalid ? `${id}-error` : null;

	if (!title && !hint && !isDataShared) {
		return null;
	}

	return (
		<>
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
		</>
	);
};

type TFormInputsGroupFields = Input | Select | Radio;

const FormInputsGroupFields: React.FC<TFormInputsGroupFields> = ({
	type,
	items,
}) => {
	const isInputGroup = type === 'input';
	const isSelectGroup = type === 'select';
	const isRadioGroup = type === 'radio';

	return (
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
	);
};

type TFormsInputsGroupCopyDetails = {
	className?: string;
} & TCopyDetails;

const FormInputsGroupCopyDetails: React.FC<TFormsInputsGroupCopyDetails> = ({
	id,
	label,
	className,
	onCopy,
}): React.ReactNode => (
	<CopyDetails id={id} label={label} className={className} onCopy={onCopy} />
);

export const FormInputsGroup = {
	Root: FormInputsGroupRoot,
	Content: FormsInputsGroupContent,
	Fields: FormInputsGroupFields,
	CopyDetails: FormInputsGroupCopyDetails,
};
