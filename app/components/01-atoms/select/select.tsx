import clsx from 'clsx';
import styles from './select.module.css';
import { Text } from '../text/text.tsx';

type TSelectOption = {
	description: string;
	value: string | number;
};

export type TSelect = {
	options: Array<TSelectOption>;
	className?: string;
	label: string;
	labelPosition?: 'top' | 'right' | 'bottom' | 'left';
};

export const Select: React.FC<TSelect> = ({
	options,
	className,
	label,
	labelPosition = 'right',
	...rest
}) => {
	const lowerLabel = label.toLowerCase();
	const id = lowerLabel.replace(/[^a-z0-9-]/, '-');
	return (
		<div className={clsx(styles.wrapper, styles[labelPosition])}>
			<select
				className={clsx(styles.base, className)}
				data-e2e-id="select"
				id={id}
				{...rest}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.description}
					</option>
				))}
			</select>
			<label>
				<Text>{label}</Text>
			</label>
		</div>
	);
};
