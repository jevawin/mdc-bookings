import { clsx } from 'clsx';

import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './select.module.css';

type TSelectOption = {
	description: string;
	value: string | number;
};

export type TSelect = {
	id: string;
	label: string;
	options: TSelectOption[];
	name?: string;
	labelPosition?: 'top' | 'right' | 'bottom' | 'left';
	isRequired?: boolean;
	className?: string;
};

export const Select: React.FC<TSelect> = ({
	id,
	name,
	options,
	className,
	label,
	labelPosition = 'right',
	isRequired = false,
}) => (
	<div className={clsx(styles.wrapper, styles[labelPosition])}>
		<select
			id={id}
			name={name ?? id}
			aria-required={isRequired}
			className={clsx(styles.base, className)}
			data-e2e-id="select"
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.description}
				</option>
			))}
		</select>

		<label htmlFor={id}>
			<Text role="presentation">{label}</Text>
		</label>
	</div>
);
