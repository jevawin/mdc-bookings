import styles from './select.module.css';

type TSelectOption = {
	description: string;
	value: string | number;
};

export type TSelect = {
	options: Array<TSelectOption>;
};

export const Select: React.FC<TSelect> = ({ options, ...rest }) => {
	return (
		<select className={styles.base} data-e2e-id="select" {...rest}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.description}
				</option>
			))}
		</select>
	);
};
